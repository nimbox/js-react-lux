import type { BaseConversation } from '../types/BaseConversation';
import { alex } from './authors';
import { audioMessage, documentMessage, imageMessage, textInbound } from './messages';


// Conversation-row fixtures. `BaseConversation` is the neutral row envelope lux
// paints: `name` (painted directly, unlike a message's opaque author), `avatar`,
// `timestamp`, an optional `lastMessage` (rendered through the registry's `summary`
// surface — never a hand-built string), a first-class `unread` count, and the OPAQUE
// `meta` (pinned/muted app state the consumer projects via `renderConversationMeta`
// and reads inside `ConversationOption.resolve`). lux owns the ROW; the LIST
// (ordering/selection/unread source) is the consumer's. See docs/module-chat.md §1, §12.

// The shape a story stashes in the opaque `meta` — lux never reads it.
export interface StoryConversationMeta {
    pinned?: boolean;
    muted?: boolean;
}

export const conversationWithPhoto: BaseConversation = {
    id: 'conv-alex',
    name: 'Alex Rivera',
    avatar: { color: '#ffffff', backgroundColor: alex.color, src: alex.avatarUrl, alt: 'Alex Rivera' },
    timestamp: '2024-01-16T10:21:00Z',
    lastMessage: textInbound,
    unread: 3
};

export const conversationPinned: BaseConversation = {
    id: 'conv-sarah',
    name: 'Sarah Johnson',
    avatar: { color: '#ffffff', backgroundColor: '#10B981', initials: 'SJ' },
    timestamp: '2024-01-16T09:40:00Z',
    lastMessage: imageMessage,
    meta: { pinned: true } satisfies StoryConversationMeta
};

export const conversationMuted: BaseConversation = {
    id: 'conv-miguel',
    name: 'Miguel Santos',
    avatar: { color: '#ffffff', backgroundColor: '#F59E0B', initials: 'MS' },
    timestamp: '2024-01-15T18:02:00Z',
    lastMessage: audioMessage,
    meta: { muted: true } satisfies StoryConversationMeta
};

export const conversationLongName: BaseConversation = {
    id: 'conv-long',
    name: 'Product Launch — Design, Engineering & Marketing sync',
    avatar: { color: '#ffffff', backgroundColor: '#8B5CF6', initials: 'PL' },
    timestamp: '2024-01-15T14:35:00Z',
    lastMessage: documentMessage,
    unread: 12
};

export const conversationEmpty: BaseConversation = {
    id: 'conv-empty',
    name: 'New contact',
    avatar: { color: '#ffffff', backgroundColor: '#6B7280', initials: 'NC' },
    timestamp: '2024-01-15T08:00:00Z'
};

// A ready-made list for the consumer-style List story (ordering is the consumer's job —
// here, newest first by timestamp).
export const conversations: BaseConversation[] = [
    conversationWithPhoto,
    conversationPinned,
    conversationMuted,
    conversationLongName,
    conversationEmpty
];
