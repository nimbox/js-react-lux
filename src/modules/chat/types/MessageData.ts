import { type MessageAttachment } from './MessageAttachment';
import { type MessageAuthor } from './MessageAuthor';
import { type ReactionData } from './ReactionData';


export interface MessageData {

    id: string;

    author?: MessageAuthor;
    direction: 'inbound' | 'outbound';

    type: string;

    header?: string;
    body?: string;
    caption?: string;
    footer?: string;

    attachments?: MessageAttachment[];
    reactions?: ReactionData[];

    replyTo?: Omit<MessageData, 'replyTo'>;

    status?: 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | string;
    timestamp?: string;

}
