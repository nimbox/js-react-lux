import type { MessageGroupRow } from './MessageGroupRow';


export type MessageListRow =
    { id: string, type: 'separator', date: Date } |
    { id: string, type: 'group', group: MessageGroupRow };
