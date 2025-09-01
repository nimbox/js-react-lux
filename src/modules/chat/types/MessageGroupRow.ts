import type { MessageAuthor } from './MessageAuthor';
import type { MessageRow } from './MessageRow';


export interface MessageGroupRow {

    id: string;

    direction: 'inbound' | 'outbound';
    author: MessageAuthor;

    messages: MessageRow[];

}
