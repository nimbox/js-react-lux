import type { MessageRow } from './MessageRow';


export interface MessageGroupRow {

    id: string;

    author?: unknown;
    alignment: 'start' | 'end';

    messages: MessageRow[];

}
