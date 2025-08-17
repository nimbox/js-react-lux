import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-vite';
import classNames from 'classnames';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import React from 'react';
import { AngleDownMenuTrigger } from '../../../components/menu/ChevronMenuTrigger';
import { Menu } from '../../../components/menu/Menu';
import { ForwardIcon, ReplyIcon } from '../../../icons/components';
import chatBackground from '../assets/chat-background.png';
import { useChat } from '../ChatContext';
import { ChatProvider } from '../ChatProvider';
import { messages } from '../data/messages';
import { reactionDetails } from '../data/reactionDetails';
import { Message } from './Message';
import { useMessage } from './MessageContext';
import { MessageGroup } from './MessageGroup';
import { AudioMessageRenderer } from './renderers/AudioMessage';
import { ImageMessageRenderer } from './renderers/ImageMessage';
import { StickerMessageRenderer } from './renderers/StickerMessage';
import { TextMessageRenderer } from './renderers/TextMessage';
import { VideoMessageRenderer } from './renderers/VideoMessage';
import { MessageComposer } from '../composer/MessageComposer';
import { MessageList } from './MessageList';
import { MessageSeparator } from './MessageSeparator';
import { ImageReplyRenderer } from '../reply/renderers/ImageReply';
import { TextReplyRenderer } from '../reply/renderers/TextReply';
import { groupMessagesByDateAuthor } from '../utils/messageProcessing';

dayjs.extend(calendar);


// Definition

const meta: Meta<typeof MessageGroup> = {
    component: MessageGroup
};

export default meta;
type Story = StoryObj<typeof MessageGroup>;


// Setup

const grouped = groupMessagesByDateAuthor(messages);

function MessageInputWrapper() {

    const { replyTo } = useChat();

    return (
        <MessageComposer
            onSubmit={(message) => {
                action('submitMessage')({ message, replyTo });
                console.log('New message:', message, 'Reply to:', replyTo);
            }}
        />
    );

}

const MessageMenu = ({ className }: { className?: string }) => {

    const { message } = useMessage();

    return (
        <Menu trigger={<AngleDownMenuTrigger className={classNames('hidden group-hover:block', className)} />} withPlacement="bottom-end">
            <Menu.Item
                icon={<ReplyIcon />}
                label="Reply"
                onClick={() => action('reply')({ message })}
            />
            <Menu.Item
                icon={<ForwardIcon />}
                label="Forward"
                onClick={() => action('forward')({ message })}
            />
        </Menu>
    );

};


// Stories

export const Default: Story = {
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'responsive'
        }
    },
    render: () => (
        <ChatProvider
            renderMessage={{
                text: () => <TextMessageRenderer />,
                sticker: () => <StickerMessageRenderer />,
                image: () => <ImageMessageRenderer />,
                audio: () => <AudioMessageRenderer />,
                video: () => <VideoMessageRenderer />
            }}
            renderReply={{
                text: () => <TextReplyRenderer />,
                image: () => <ImageReplyRenderer />
            }}
            getReactions={async () => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                return reactionDetails;
            }}
            addReaction={async (messageId, emoji) => {
                action('addReaction')({ messageId, emoji });
            }}
            removeReaction={async (messageId, emoji) => {
                action('removeReaction')({ messageId, emoji });
            }}
        >
            <div className="relative min-w-96 h-screen bg-chat-message-list-bg">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${chatBackground})` }} />
                <div className="relative h-full flex flex-col z-10">

                    <MessageList className="flex-grow overflow-y-auto">
                        {grouped.map((dateGroup) => (
                            <React.Fragment key={dateGroup.date.getTime()}>

                                <MessageSeparator>
                                    <MessageSeparator.Pill>{dayjs(dateGroup.date).calendar()}</MessageSeparator.Pill>
                                </MessageSeparator>

                                {dateGroup.groups.map(messageGroup => (
                                    <MessageGroup key={messageGroup.id} group={{ id: messageGroup.id, direction: messageGroup.direction, author: messageGroup.author! }}>
                                        <MessageGroup.Messages>
                                            {messageGroup.messages.map(msg => (
                                                <Message key={msg.id} menu={<MessageMenu />} message={msg} />
                                            ))}
                                        </MessageGroup.Messages>
                                    </MessageGroup>
                                ))}

                            </React.Fragment>
                        ))}
                    </MessageList>

                    <MessageInputWrapper />

                </div>
            </div>
        </ChatProvider>
    )
};
