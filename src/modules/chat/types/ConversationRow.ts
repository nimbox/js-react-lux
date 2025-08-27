import type { ConversationData } from './ConversationData';


export type ConversationRow =
    { id: string, type: 'separator', label: string } |
    { id: string, type: 'conversation', conversation: ConversationData };
