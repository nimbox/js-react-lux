import { ReactionDetailData } from '../types/ReactionDetailData';
import { authors } from './authors';


export const reactions: ReactionDetailData[] = [
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
