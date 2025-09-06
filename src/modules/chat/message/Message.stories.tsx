import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { action } from 'storybook/actions';
import { AngleDownMenuTrigger } from '../../../components/menu/ChevronMenuTrigger';
import { Menu } from '../../../components/menu/Menu';
import { ForwardIcon, ReplyIcon } from '../../../icons/components';
import chatBackground from '../assets/chat-background.png';
import { TextReply } from '../reply/instances/TextReply';
import { AudioMessage } from './instances/AudioMessage';
import { ImageMessage } from './instances/ImageMessage';
import { TextMessage } from './instances/TextMessage';
import { VideoMessage } from './instances/VideoMessage';
import { MessageProvider } from './MessageProvider';

dayjs.extend(calendar);


// Definition

const meta: Meta<typeof MessageProvider> = {
    parameters: {
    },
    decorators: [
        (Story) => (
            <div className="relative w-full px-8 py-8 flex justify-center items-center bg-chat-message-list-bg">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${chatBackground})` }} />
                <Story />
            </div>
        )
    ],
    tags: ['autodocs'],

    args: {
        menu: <MessageMenu />,
        renderReplyTo: TextReply,
        onAddReaction: async (reaction: string) => action('addReaction')(reaction),
        isFirst: true
    },

    argTypes: {
        menu: {
            table: {
                disable: true
            }
        },
        renderReplyTo: {
            table: {
                disable: true
            }
        }
    }

};

export default meta;

// Setup

function MessageMenu() {
    return (
        <Menu trigger={<AngleDownMenuTrigger />} withPlacement="bottom-end">
            <Menu.Item
                icon={<ReplyIcon />}
                label="Reply"
                onClick={() => action('reply')()}
            />
            <Menu.Item
                icon={<ForwardIcon />}
                label="Forward"
                onClick={() => action('forward')()}
            />
        </Menu>
    );
};

// Sample data

const sampleAuthor = {
    id: 'user-1',
    type: 'user',
    remoteId: 'remote-1',
    name: 'John Doe',
    initials: 'JD',
    color: '#3B82F6',
    avatarUrl: undefined
};

const sampleReplyTextMessage: any = {
    id: 'msg-2',
    author: {
        ...sampleAuthor,
        id: 'user-2',
        remoteId: 'remote-2',
        name: 'Jane Smith',
        initials: 'JS',
        color: '#10B981'
    },
    direction: 'inbound' as const,
    type: 'text',
    body: 'Hi there! How are you doing?',
    timestamp: new Date(Date.now() - 60000), // 1 minute ago
    status: 'read'
};

// Text Message Stories

export const OutboundTextMessage: StoryObj<typeof TextMessage> = {
    render: (args) => <TextMessage {...args} />,
    args: {
        message: {
            id: 'msg-1',
            author: sampleAuthor,
            direction: 'outbound',
            type: 'text',
            body: 'Hello! This is a simple text message.',
            timestamp: new Date(),
            status: 'read'
        }
    }
};

export const OutboundTextMessageWithReply: StoryObj<typeof TextMessage> = {
    render: (args) => <TextMessage {...args} />,
    args: {
        message: {
            id: 'msg-3',
            author: sampleAuthor,
            direction: 'outbound',
            type: 'text',
            body: 'Thanks for your message! I\'m doing great.',
            timestamp: new Date(),
            status: 'read',
            replyTo: sampleReplyTextMessage
        },
        menu: <MessageMenu />
    }
};

export const InboundTextMessage: StoryObj<typeof TextMessage> = {
    render: (args) => <TextMessage {...args} />,
    args: {
        message: {
            id: 'msg-4',
            author: {
                ...sampleAuthor,
                id: 'user-2',
                remoteId: 'remote-2',
                name: 'Jane Smith',
                initials: 'JS',
                color: '#10B981'
            },
            direction: 'inbound' as const,
            type: 'text',
            body: 'Hi there! How are you doing?',
            timestamp: new Date(),
            status: 'read'
        },
        menu: <MessageMenu />
    }
};

export const LongTextMessage: StoryObj<typeof TextMessage> = {
    render: (args) => <TextMessage {...args} />,
    args: {
        message: {
            id: 'msg-5',
            author: sampleAuthor,
            direction: 'outbound' as const,
            type: 'text',
            body: 'This is a much longer message that demonstrates how the text message component handles longer content. It should wrap properly and maintain good readability while preserving the overall message structure and layout.',
            timestamp: new Date(),
            status: 'read'
        },
        menu: <MessageMenu />
    }
};

export const EmojiMessage: StoryObj<typeof TextMessage> = {
    render: (args) => <TextMessage {...args} />,
    args: {
        message: {
            id: 'msg-6',
            author: sampleAuthor,
            direction: 'outbound' as const,
            type: 'text',
            body: '😊',
            timestamp: new Date(),
            status: 'read'
        },
        menu: <MessageMenu />
    }
};

export const MessageWithHeader: StoryObj<typeof TextMessage> = {
    render: (args) => <TextMessage {...args} />,
    args: {
        message: {
            id: 'msg-7',
            author: sampleAuthor,
            direction: 'outbound' as const,
            type: 'text',
            header: 'Important Update',
            body: 'Please review the latest changes before proceeding.',
            timestamp: new Date(),
            status: 'read'
        },
        menu: <MessageMenu />
    }
};

export const MessageWithFooter: StoryObj<typeof TextMessage> = {
    render: (args) => <TextMessage {...args} />,
    args: {
        message: {
            id: 'msg-8',
            author: sampleAuthor,
            direction: 'outbound' as const,
            type: 'text',
            body: 'Meeting scheduled for tomorrow at 2 PM.',
            footer: 'Please confirm your attendance',
            timestamp: new Date(),
            status: 'read'
        },
        menu: <MessageMenu />
    }
};

export const MessageWithHeaderAndFooter: StoryObj<typeof TextMessage> = {
    render: (args) => <TextMessage {...args} />,
    args: {
        message: {
            id: 'msg-9',
            author: sampleAuthor,
            direction: 'outbound' as const,
            type: 'text',
            header: 'Project Update',
            body: 'Phase 1 has been completed successfully. We can now proceed to Phase 2.',
            footer: 'Next review meeting: Friday 3 PM',
            timestamp: new Date(),
            status: 'read'
        },
        menu: <MessageMenu />
    }
};

export const PendingTextMessage: StoryObj<typeof TextMessage> = {
    render: (args) => <TextMessage {...args} />,
    args: {
        message: {
            id: 'msg-10',
            author: sampleAuthor,
            direction: 'outbound' as const,
            type: 'text',
            body: 'This message is pending...',
            timestamp: new Date(),
            status: 'pending'
        },
        menu: <MessageMenu />
    }
};

export const FailedTextMessage: StoryObj<typeof TextMessage> = {
    render: (args) => <TextMessage {...args} />,
    args: {
        message: {
            id: 'msg-11',
            author: sampleAuthor,
            direction: 'outbound' as const,
            type: 'text',
            body: 'This message failed to send',
            timestamp: new Date(),
            status: 'failed'
        },
        menu: <MessageMenu />
    }
};

export const ImageMessageStory: StoryObj<typeof ImageMessage> = {
    render: (args) => <ImageMessage {...args} />,
    args: {
        message: {
            id: 'msg-12',
            author: sampleAuthor,
            direction: 'outbound' as const,
            type: 'image',
            body: 'Check out this image!',
            caption: 'Beautiful sunset at the beach',
            timestamp: new Date(),
            status: 'read',
            attachments: [
                {
                    type: 'image',
                    name: 'sunset.jpg',
                    mime: 'image/jpeg',
                    size: 1024000,
                    filename: 'sunset.jpg',
                    url: 'https://picsum.photos/400/300',
                    thumbnailUrl: 'https://picsum.photos/200/150'
                }
            ]
        },
        menu: <MessageMenu />,
        extra: {
            onClick: (message) => action('onClick')(message),
            className: 'cursor-zoom-in'
        }
    }
};

export const ImageMessageWithReply: StoryObj<typeof ImageMessage> = {
    render: (args) => <ImageMessage {...args} />,
    args: {
        message: {
            id: 'msg-13',
            author: sampleAuthor,
            direction: 'outbound' as const,
            type: 'image',
            body: 'Here\'s the photo you requested',
            caption: 'Product catalog image',
            timestamp: new Date(),
            status: 'read',
            replyTo: sampleReplyTextMessage,
            attachments: [
                {
                    type: 'image',
                    name: 'catalog.jpg',
                    mime: 'image/jpeg',
                    size: 2048000,
                    filename: 'catalog.jpg',
                    url: 'https://picsum.photos/400/300',
                    thumbnailUrl: 'https://picsum.photos/200/150'
                }
            ]
        },
        menu: <MessageMenu />,
        extra: {
            onClick: (message) => action('onClick')(message),
            className: 'cursor-zoom-in'
        }
    }
};

// Audio Message Stories
export const AudioMessageStory: StoryObj<typeof AudioMessage> = {
    render: (args) => <AudioMessage {...args} />,
    args: {
        message: {
            id: 'msg-14',
            author: sampleAuthor,
            direction: 'outbound' as const,
            type: 'audio',
            body: 'Voice message',
            timestamp: new Date(),
            status: 'read',
            attachments: [
                {
                    type: 'audio',
                    name: 'voice-message.wav',
                    mime: 'audio/wav',
                    size: 512000,
                    filename: 'voice-message.wav',
                    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
                }
            ]
        },
        menu: <MessageMenu />
    }
};

// Video Message Stories
export const VideoMessageStory: StoryObj<typeof VideoMessage> = {
    render: (args) => <VideoMessage {...args} />,
    args: {
        message: {
            id: 'msg-15',
            author: sampleAuthor,
            direction: 'outbound' as const,
            type: 'video',
            body: 'Video message',
            caption: 'Quick demo of the new feature',
            timestamp: new Date(),
            status: 'read',
            attachments: [
                {
                    type: 'video',
                    name: 'demo.mp4',
                    mime: 'video/mp4',
                    size: 1048576,
                    filename: 'demo.mp4',
                    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                    thumbnailUrl: 'https://picsum.photos/400/225'
                }
            ]
        },
        menu: <MessageMenu />
    }
};
