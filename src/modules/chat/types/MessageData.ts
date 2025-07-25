import { MessageAttachment } from './MessageAttachment';
import { MessageAuthor } from './MessageAuthor';
import { ReactionData } from './ReactionData';


export interface MessageData {

    id: string;

    author?: MessageAuthor;
    direction: 'inbound' | 'outbound';

    type: string;

    header?: string;
    body?: string;
    footer?: string;

    attachments?: MessageAttachment[];
    reactions?: ReactionData[];

    replyTo?: MessageData;

    status?: 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | string;
    timestamp?: string;

}
