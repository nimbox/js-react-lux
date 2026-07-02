import type { MessageRow } from './MessageRow';


export interface MessageGroupRow {

    id: string;

    alignment: 'start' | 'end';
    // Opaque — forwarded to `authorRenderer.avatar`, never read by the base.
    author?: unknown;

    messages: MessageRow[];

}
