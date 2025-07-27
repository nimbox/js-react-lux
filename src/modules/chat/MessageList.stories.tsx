import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import backgroundImage from './assets/chat-background.png';
import { ChatProvider } from './ChatProvider';
import { reactionDetails } from './data/reactionDetails';
import { messages } from './data/messages';
import { Message } from './message/Message';
import { MessageGroup } from './message/MessageGroup';
import { MessageList } from './MessageList';
import { MessageData } from './types/MessageData';
import { TextMessageContainer } from './message/renderers/TextMessage';
import { ImageMessageContainer } from './message/renderers/ImageMessage';
import { StickerMessageContainer } from './message/renderers/StickerMessage';
import { AudioMessageContainer } from './message/renderers/AudioMessage';
import { VideoMessageContainer } from './message/renderers/VideoMessage';
import { ImageReplyRenderer } from './reply/renderers/ImageReply';
import { TextReplyRenderer } from './reply/renderers/TextReply';
import { MessageInput } from './MessageInput';
import { useChat } from './ChatContext';


// Definition

const meta: Meta<typeof MessageGroup> = {
    component: MessageGroup
};

export default meta;
type Story = StoryObj<typeof MessageGroup>;



// Utility: sort by timestamp

const sortedMessages = [...messages]
    .map(m => [m.timestamp ? new Date(m.timestamp).getTime() : 0, m] as const)
    .sort(([a], [b]) => a - b)
    .map(([, m]) => m);

// Utility: group consecutive messages by author+direction
function groupMessages(messages: MessageData[]) {
    const groups: Array<{
        id: string;
        direction: 'inbound' | 'outbound';
        author: MessageData['author'];
        messages: MessageData[];
    }> = [];
    let currentGroup: typeof groups[0] | null = null;
    for (const m of messages) {
        if (
            !currentGroup ||
            currentGroup.author?.id !== m.author?.id ||
            currentGroup.direction !== m.direction
        ) {
            // Start new group
            currentGroup = {
                id: m.id,
                direction: m.direction,
                author: m.author,
                messages: [m]
            };
            groups.push(currentGroup);
        } else {
            currentGroup.messages.push(m);
        }
    }
    return groups;
}

const grouped = groupMessages(sortedMessages);

// MessageInputWrapper component to use hooks
function MessageInputWrapper() {

    const { replyTo } = useChat();
    
    return (
        <MessageInput 
            onSubmit={(message) => {
                action('submitMessage')({ message, replyTo });
                console.log('New message:', message, 'Reply to:', replyTo);
            }}
        />
    );

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
        <ChatProvider
            renderMessage={{
                text: () => <TextMessageContainer />,
                sticker: () => <StickerMessageContainer />,
                image: () => <ImageMessageContainer />,
                audio: () => <AudioMessageContainer />,
                video: () => <VideoMessageContainer />
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
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${backgroundImage})` }} />
                <div className="relative h-full flex flex-col z-10">

                    <MessageList className="flex-grow overflow-y-auto">
                        {grouped.map(group => (

                            <MessageGroup key={group.id} group={{ id: group.id, direction: group.direction, author: group.author! }}>
                                
                                <MessageGroup.Messages>
                                    {group.messages.map(msg => (
                                        <Message key={msg.id} message={msg} />
                                    ))}
                                </MessageGroup.Messages>

                            </MessageGroup>

                        ))}
                    </MessageList>

                    <MessageInputWrapper />

                </div>
            </div>
        </ChatProvider>
    )
};
