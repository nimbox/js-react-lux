import type { Meta, StoryObj } from '@storybook/react';
import { MessageGroup } from './MessageGroup';
import { Message } from './Message';
import { MessageData } from './types/MessageData';
import backgroundImage from './assets/chat-background.png';
import { ReactionDetailData } from './types/ReactionDetailData';
import { ChatProvider } from './ChatProvider';
import { authors } from './data/authors';

// Definition

const meta: Meta<typeof MessageGroup> = {
    component: MessageGroup
};

export default meta;
type Story = StoryObj<typeof MessageGroup>;

// Sample data as JSON array
const messages: MessageData[] = [
    {
        id: '1',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        header: 'Project Update',
        body: 'Hey there! How are you doing today?',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T10:00:00Z',
        reactions: [
            {
                emoji: '👍',
                count: 1
            },
            {
                emoji: '😊',
                count: 1
            }
        ],
        attachments: [
            {
                type: 'image',
                name: 'Sample Image',
                mime: 'image/jpeg',
                size: 123456,
                url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
            }
        ]
    },
    {
        id: '2',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        header: 'Follow-up',
        body: 'I was wondering if you had a chance to look at the project proposal I sent yesterday. x ads asd asd asd asd asd asd asd asd asda sd asd asd asd asd asda sd asd asda sda sd asd asd asd asda sd asd asda ads asd asd',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T10:01:00Z',
        reactions: [
            {
                emoji: '👀',
                count: 1
            }
        ],
        attachments: [
            {
                type: 'audio',
                name: 'Sample Audio',
                mime: 'audio/mp3',
                size: 234567,
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
            }
        ]
    },
    {
        id: '3',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        header: 'Action Required',
        body: 'Let me know what you think when you get a chance!',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T10:02:00Z',
        reactions: [],
        attachments: [
            {
                type: 'video',
                name: 'Sample Video',
                mime: 'video/mp4',
                size: 345678,
                url: 'https://www.w3schools.com/html/mov_bbb.mp4'
            }
        ]
    },
    {
        id: '4',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        header: 'Reply: Project Update',
        body: 'Hi! I\'m doing great, thanks for asking.',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T10:05:00Z',
        reactions: [
            {
                emoji: '❤️',
                count: 1
            }
        ]
    },
    {
        id: '5',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        header: 'Review Scheduled',
        body: 'I\'ll review the proposal and get back to you by the end of the day.',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T10:06:00Z',
        reactions: [
            {
                emoji: '✅',
                count: 1
            },
            {
                emoji: '👍',
                count: 1
            }
        ]
    },
    {
        id: '6',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        header: 'Acknowledgement',
        body: 'Perfect! That sounds great.',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T10:10:00Z',
        reactions: []
    },
    {
        id: '7',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        header: 'Question',
        body: 'Actually, I have a quick question about the timeline.',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T10:12:00Z',
        reactions: [
            {
                emoji: '🤔',
                count: 1
            }
        ]
    },
    {
        id: '8',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        header: 'Call Request',
        body: 'Could we schedule a call to discuss this in more detail?',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T10:13:00Z',
        reactions: [
            {
                emoji: '📞',
                count: 1
            },
            {
                emoji: '👍',
                count: 1
            }
        ]
    }
];

const reactionDetails: ReactionDetailData[] = [
    {
        emoji: '👍',
        timestamp: '2024-01-15T10:00:10Z',
        author: authors['1']
    },
    {
        emoji: '😊',
        timestamp: '2024-01-15T10:00:12Z',
        author: authors['2']
    }
];

// Utility: sort by timestamp
const sortedMessages = [...messages].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

// Utility: group consecutive messages by author+direction
function groupMessages(messages: MessageData[]) {
    const groups: Array<{
        id: string;
        direction: 'inbound' | 'outbound';
        author: MessageData['author'];
        messages: MessageData[];
    }> = [];
    let currentGroup: typeof groups[0] | null = null;
    for (const msg of messages) {
        if (
            !currentGroup ||
            currentGroup.author.id !== msg.author.id ||
            currentGroup.direction !== msg.direction
        ) {
            // Start new group
            currentGroup = {
                id: msg.id,
                direction: msg.direction,
                author: msg.author,
                messages: [msg]
            };
            groups.push(currentGroup);
        } else {
            currentGroup.messages.push(msg);
        }
    }
    return groups;
}

const grouped = groupMessages(sortedMessages);

// Stories

export const Default: Story = {
    render: () => (
        <ChatProvider
            fetchReactionDetails={async () => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                return reactionDetails;
            }}
        >
            <div className="relative min-w-96 h-full bg-chat-message-list-bg">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${backgroundImage})` }} />
                <div className="flex flex-col gap-1">
                    {grouped.map(group => (
                        <MessageGroup key={group.id} group={{ id: group.id, direction: group.direction, author: group.author }}>
                            <MessageGroup.Messages>
                                {group.messages.map(msg => (
                                    <Message key={msg.id} message={msg} />
                                ))}
                            </MessageGroup.Messages>
                        </MessageGroup>
                    ))}
                </div>
            </div>
        </ChatProvider>
    )
};
