import { type ReactionDetailsData } from '../types/ReactionDetailsData';
import { authors } from './authors';


export const reactionDetails: ReactionDetailsData[] = [
    {
        emoji: '👍',
        timestamp: '2024-01-15T10:00:10Z',
        author: authors['1'],
        self: true
    },
    {
        emoji: '😊',
        timestamp: '2024-01-15T10:00:12Z',
        author: authors['2'],
        self: false
    }
];
