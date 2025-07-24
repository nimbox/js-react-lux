import { MessageAuthor } from '../types/MessageAuthor';


export const authors: Record<string, MessageAuthor> = {
    '1': {
        id: '1',
        type: 'user',
        name: 'John Doe',
        initials: 'JD',
        color: '#3B82F6',
        remoteId: '+12345678901',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    '2': {
        id: '2',
        type: 'user',
        name: 'Jane Smith',
        initials: 'JS',
        color: '#10B981',
        remoteId: '+10987654321',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
};
