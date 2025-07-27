import { authors } from './authors';
import { MessageData } from '../types/MessageData';

export const messages: MessageData[] = [
    {
        id: '1',
        author: authors['1'],
        direction: 'inbound',
        type: 'image',
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
        type: 'audio',
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
        type: 'video',
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
    },
    {
        id: '9',
        author: authors['2'],
        direction: 'outbound',
        type: 'sticker',
        body: '',
        status: 'read',
        timestamp: '2024-01-15T17:08:00Z',
        attachments: [
            {
                type: 'sticker',
                name: 'Crying Sticker',
                mime: 'image/png',
                size: 45678,
                url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f622.svg'
            }
        ]
    },
    {
        id: '10',
        author: authors['1'],
        direction: 'inbound',
        type: 'sticker',
        body: '',
        status: 'delivered',
        timestamp: '2024-01-15T17:09:00Z',
        attachments: [
            {
                type: 'sticker',
                name: 'Smiling Sticker',
                mime: 'image/png',
                size: 34567,
                url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f60a.svg'
            }
        ]
    },
    // Single emoji messages
    {
        id: '11',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        header: '',
        body: '😊',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T17:10:00Z',
        reactions: []
    },
    {
        id: '12',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        header: '',
        body: '👍',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T17:11:00Z',
        reactions: []
    },
    // Two emoji messages
    {
        id: '13',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        header: '',
        body: '🎉🎊',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T17:12:00Z',
        reactions: []
    },
    {
        id: '14',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        header: '',
        body: '❤️💕',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T17:13:00Z',
        reactions: []
    },
    // Three emoji messages
    {
        id: '15',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        header: '',
        body: '🚀🎯💯',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T17:14:00Z',
        reactions: []
    },
    {
        id: '16',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: '🔥💪🏆',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T17:15:00Z',
        reactions: []
    },
    // Message with reply
    {
        id: '17',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        header: 'Reply to previous message',
        body: 'This is a reply to the previous message!',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T17:16:00Z',
        reactions: [],
        replyTo: {
            id: '16',
            author: authors['2'],
            direction: 'outbound',
            type: 'text',
            body: '🔥💪🏆',
            footer: '',
            status: 'sent',
            timestamp: '2024-01-15T17:15:00Z',
            reactions: []
        }
    },
    // Message with reply to image
    {
        id: '18',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        header: 'Reply to image',
        body: 'Great image! Thanks for sharing.',
        footer: '',
        status: 'sent',
        timestamp: '2024-01-15T17:17:00Z',
        reactions: [],
        replyTo: {
            id: '1',
            author: authors['1'],
            direction: 'inbound',
            type: 'image',
            header: 'Project Update',
            body: 'Hey there! How are you doing today? Let\'s make this a very long message. To see if it really wraps and truncates after the 2 line clamp. Still need to add more text to see if it really wraps and truncates after the 2 line clamp.',
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
        }
    }
]; 