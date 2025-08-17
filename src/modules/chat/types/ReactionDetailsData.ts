import { type MessageAuthor } from './MessageAuthor';


export interface ReactionDetailsData {

    emoji: string;

    self: boolean;
    author: MessageAuthor;
    timestamp: string;

}
