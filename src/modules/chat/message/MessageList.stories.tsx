import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { action } from 'storybook/actions';
import { AngleDownMenuTrigger } from '../../../components/menu/ChevronMenuTrigger';
import { Menu } from '../../../components/menu/Menu';
import { ForwardIcon, ReplyIcon } from '../../../icons/components';
import chatBackground from '../assets/chat-background.png';
import { messages } from '../data/messages';
import { reactionDetails } from '../data/reactionDetails';
import { AudioReply, DefaultReply, ImageReply, TextReply, VideoReply } from '../reply/instances';
import type { ReplyProps } from '../reply/ReplyProvider';
import { buildMessageRows } from './buildMessageRows';
import { AudioMessage } from './instances/AudioMessage';
import { DefaultMessage } from './instances/DefaultMessage';
import { ImageMessage } from './instances/ImageMessage';
import { StickerMessage } from './instances/StickerMessage';
import { TextMessage } from './instances/TextMessage';
import { VideoMessage } from './instances/VideoMessage';
import { useMessage } from './MessageContext';
import { MessageGroup } from './MessageGroup';
import { MessageList } from './MessageList';
import type { MessageProps, MessageProviderProps } from './MessageProvider';
import { MessageSeparator } from './MessageSeparator';

dayjs.extend(calendar);


// Definition

const meta: Meta<typeof MessageGroup> = {
    component: MessageGroup
};

export default meta;
type Story = StoryObj<typeof MessageGroup>;

// Setup

const rows = buildMessageRows(messages);

const MessageMenu = () => {

    const { message } = useMessage();

    return (
        <Menu trigger={<AngleDownMenuTrigger />} withPlacement="bottom-end">
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

const MESSAGES: Record<string, React.ComponentType<MessageProviderProps>> = {
    text: TextMessage,
    sticker: StickerMessage,
    image: ImageMessage,
    audio: AudioMessage,
    video: VideoMessage,
    document: TextMessage,
} as const;

function Message(props: MessageProps) {
    const Renderer = MESSAGES[props.message.type] || DefaultMessage;
    return <Renderer {...props} />;
}

const REPLIES: Record<string, React.ComponentType<ReplyProps>> = {
    text: TextReply,
    sticker: ImageReply,
    image: ImageReply,
    audio: AudioReply,
    video: VideoReply,
} as const;

function Reply(props: ReplyProps) {
    const Renderer = REPLIES[props.message.type] || DefaultReply;
    return <Renderer {...props} />;
}

// Stories

export const Default: Story = {
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'responsive'
        }
    },
    render: () => (
        <div>
            <div className="relative min-w-96 h-screen bg-chat-message-list-bg">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${chatBackground})` }} />
                <div className="relative w-full h-full flex flex-col z-10">
                    <MessageList className="grow overflow-y-auto pb-24">
                        {rows.map((row) => {
                            switch (row.type) {
                                case 'separator':
                                    return (
                                        <MessageSeparator>
                                            <MessageSeparator.Pill>{dayjs(row.date).calendar()}</MessageSeparator.Pill>
                                        </MessageSeparator>
                                    );
                                case 'group':
                                    return (
                                        <MessageGroup key={row.id} group={row.group}>
                                            {row.group.messages.map(r => {
                                                return (
                                                    <Message

                                                        key={r.message.id}

                                                        menu={<MessageMenu />}
                                                        message={r.message}

                                                        renderReplyTo={Reply}

                                                        isFirst={r.meta.isFirst}
                                                        isLast={r.meta.isLast}

                                                        // onAddReaction={async (emoji) => {
                                                        //     action('addReaction')({ messageId: r.message.id, emoji });
                                                        // }}
                                                        // onRemoveReaction={async (emoji) => {
                                                        //     action('removeReaction')({ messageId: r.message.id, emoji });
                                                        // }}
                                                        // getReactions={async () => {
                                                        //     await new Promise(resolve => setTimeout(resolve, 1000));
                                                        //     return reactionDetails;
                                                        // }}

                                                    />);
                                            })}
                                        </MessageGroup>
                                    );
                            }
                        })}
                    </MessageList>
                </div>
            </div>
        </div>
    )
};
