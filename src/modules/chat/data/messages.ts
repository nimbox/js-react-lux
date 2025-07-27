import { authors } from './authors';
import { MessageData } from '../types/MessageData';

export const messages: MessageData[] = [
    // Day 1 - Monday, January 15th
    {
        id: '1',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'Hey Sarah! How was your weekend?',
        status: 'sent',
        timestamp: '2024-01-15T09:30:00Z',
        reactions: [
            { emoji: '😊', count: 1 }
        ]
    },
    {
        id: '2',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'Hi Alex! It was great, thanks for asking. Went hiking on Saturday and just relaxed on Sunday. How about you?',
        status: 'sent',
        timestamp: '2024-01-15T09:32:00Z',
        reactions: []
    },
    {
        id: '3',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'That sounds amazing! I spent most of the weekend working on that new project we discussed. Actually, I wanted to show you something I\'ve been working on.',
        status: 'sent',
        timestamp: '2024-01-15T09:35:00Z',
        reactions: []
    },
    {
        id: '4',
        author: authors['1'],
        direction: 'inbound',
        type: 'image',
        body: 'Check out this mockup I created for the landing page',
        status: 'sent',
        timestamp: '2024-01-15T09:36:00Z',
        reactions: [
            { emoji: '👀', count: 1 },
            { emoji: '🔥', count: 1 }
        ],
        attachments: [
            {
                type: 'image',
                name: 'Landing Page Mockup',
                mime: 'image/jpeg',
                size: 234567,
                url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
            }
        ]
    },
    {
        id: '5',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'Wow, this looks really clean! I love the color scheme you chose. The layout is much better than what we had before.',
        status: 'sent',
        timestamp: '2024-01-15T09:40:00Z',
        reactions: []
    },
    {
        id: '6',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'Thanks! I was thinking we could also add some animations to make it more engaging. What do you think?',
        status: 'sent',
        timestamp: '2024-01-15T09:42:00Z',
        reactions: []
    },
    {
        id: '7',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'That\'s a great idea! Subtle animations would definitely improve the user experience. Maybe we could discuss this in our meeting tomorrow?',
        status: 'sent',
        timestamp: '2024-01-15T09:45:00Z',
        reactions: [
            { emoji: '✅', count: 1 }
        ]
    },
    {
        id: '8',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'Perfect! I\'ll prepare some examples to show you. Looking forward to it!',
        status: 'sent',
        timestamp: '2024-01-15T09:47:00Z',
        reactions: [
            { emoji: '👍', count: 1 }
        ]
    },
    {
        id: '9',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'Great! See you tomorrow then. Have a good rest of your day!',
        status: 'sent',
        timestamp: '2024-01-15T09:50:00Z',
        reactions: []
    },
    {
        id: '10',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'You too! 😊',
        status: 'sent',
        timestamp: '2024-01-15T09:51:00Z',
        reactions: []
    },
    {
        id: '10.5',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: '😊',
        status: 'sent',
        timestamp: '2024-01-15T09:52:00Z',
        reactions: []
    },
    {
        id: '10.6',
        author: authors['1'],
        direction: 'inbound',
        type: 'audio',
        body: 'Voice message from Alex',
        status: 'sent',
        timestamp: '2024-01-15T09:53:00Z',
        reactions: [
            { emoji: '🎵', count: 1 }
        ],
        attachments: [
            {
                type: 'audio',
                name: 'Voice Message',
                mime: 'audio/mpeg',
                size: 123456,
                url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
            }
        ]
    },

    // Day 2 - Tuesday, January 16th
    {
        id: '11',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'Good morning Alex! Ready for our meeting?',
        status: 'sent',
        timestamp: '2024-01-16T10:00:00Z',
        reactions: []
    },
    {
        id: '12',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'Morning Sarah! Yes, I\'m all set. I\'ve got some really cool animation examples to show you.',
        status: 'sent',
        timestamp: '2024-01-16T10:02:00Z',
        reactions: [
            { emoji: '🎬', count: 1 }
        ]
    },
    {
        id: '13',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'Awesome! I\'m excited to see what you\'ve come up with. Should we start in 10 minutes?',
        status: 'sent',
        timestamp: '2024-01-16T10:03:00Z',
        reactions: []
    },
    {
        id: '14',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'Perfect timing! I\'ll send you the meeting link in a moment.',
        status: 'sent',
        timestamp: '2024-01-16T10:04:00Z',
        reactions: []
    },
    {
        id: '15',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'Here\'s the link: https://meet.example.com/abc123',
        status: 'sent',
        timestamp: '2024-01-16T10:05:00Z',
        reactions: []
    },
    {
        id: '16',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'Got it! See you there.',
        status: 'sent',
        timestamp: '2024-01-16T10:06:00Z',
        reactions: []
    },

    // Day 3 - Wednesday, January 17th
    {
        id: '17',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'Hey Sarah! I just finished implementing those animations we discussed. Want to take a look?',
        status: 'sent',
        timestamp: '2024-01-17T14:30:00Z',
        reactions: []
    },
    {
        id: '18',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'Absolutely! I\'ve been curious to see how they turned out.',
        status: 'sent',
        timestamp: '2024-01-17T14:32:00Z',
        reactions: [
            { emoji: '👀', count: 1 }
        ]
    },
    {
        id: '19',
        author: authors['1'],
        direction: 'inbound',
        type: 'video',
        body: 'Here\'s a quick demo of the animations in action',
        status: 'sent',
        timestamp: '2024-01-17T14:35:00Z',
        reactions: [
            { emoji: '🎥', count: 1 },
            { emoji: '🔥', count: 1 }
        ],
        attachments: [
            {
                type: 'video',
                name: 'Animation Demo',
                mime: 'video/mp4',
                size: 456789,
                url: 'https://www.w3schools.com/html/mov_bbb.mp4'
            }
        ]
    },
    {
        id: '20',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'This is incredible! The transitions are so smooth. Our users are going to love this.',
        status: 'sent',
        timestamp: '2024-01-17T14:40:00Z',
        reactions: [
            { emoji: '❤️', count: 1 }
        ]
    },
    {
        id: '21',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'Thanks! I\'m really happy with how it turned out. Should we start testing it with some users next week?',
        status: 'sent',
        timestamp: '2024-01-17T14:42:00Z',
        reactions: []
    },
    {
        id: '22',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'Definitely! I\'ll set up some user testing sessions. This is going to be a game-changer for our product.',
        status: 'sent',
        timestamp: '2024-01-17T14:45:00Z',
        reactions: [
            { emoji: '🚀', count: 1 },
            { emoji: '💯', count: 1 }
        ]
    },

    // Day 4 - Thursday, January 18th
    {
        id: '23',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'Good news! I just got feedback from the first round of user testing. Everyone loved the animations!',
        status: 'sent',
        timestamp: '2024-01-18T11:15:00Z',
        reactions: [
            { emoji: '🎉', count: 1 }
        ]
    },
    {
        id: '24',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'That\'s fantastic! 🎉 Any specific feedback we should consider for improvements?',
        status: 'sent',
        timestamp: '2024-01-18T11:17:00Z',
        reactions: []
    },
    {
        id: '25',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'A few users mentioned they\'d like the animations to be slightly faster. Also, one person suggested adding a subtle sound effect option.',
        status: 'sent',
        timestamp: '2024-01-18T11:20:00Z',
        reactions: []
    },
    {
        id: '26',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'Great feedback! I can definitely speed up the animations. The sound effect idea is interesting - we could make it optional in the settings.',
        status: 'sent',
        timestamp: '2024-01-18T11:22:00Z',
        reactions: [
            { emoji: '💡', count: 1 }
        ]
    },
    {
        id: '27',
        author: authors['2'],
        direction: 'outbound',
        type: 'sticker',
        body: '',
        status: 'sent',
        timestamp: '2024-01-18T11:25:00Z',
        reactions: [],
        attachments: [
            {
                type: 'sticker',
                name: 'Thumbs Up',
                mime: 'image/png',
                size: 34567,
                url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f44d.svg'
            }
        ]
    },

    // Day 5 - Friday, January 19th
    {
        id: '28',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'Happy Friday! I just pushed the updated animations with faster transitions. Want to test it out?',
        status: 'sent',
        timestamp: '2024-01-19T09:00:00Z',
        reactions: []
    },
    {
        id: '29',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'Happy Friday to you too! 🎉 Yes, absolutely! I\'ll test it right away.',
        status: 'sent',
        timestamp: '2024-01-19T09:02:00Z',
        reactions: []
    },
    {
        id: '30',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'Just tested it - the speed is perfect now! Much more responsive. Great work!',
        status: 'sent',
        timestamp: '2024-01-19T09:15:00Z',
        reactions: [
            { emoji: '👏', count: 1 },
            { emoji: '🔥', count: 1 }
        ]
    },
    {
        id: '31',
        author: authors['1'],
        direction: 'inbound',
        type: 'text',
        body: 'Awesome! I\'m so glad it\'s working well. Have a great weekend!',
        status: 'sent',
        timestamp: '2024-01-19T09:20:00Z',
        reactions: []
    },
    {
        id: '32',
        author: authors['2'],
        direction: 'outbound',
        type: 'text',
        body: 'You too! Thanks for all the hard work this week. We\'re going to have an amazing product launch! 🚀',
        status: 'sent',
        timestamp: '2024-01-19T09:22:00Z',
        reactions: [
            { emoji: '🚀', count: 1 },
            { emoji: '💪', count: 1 }
        ]
    }
]; 