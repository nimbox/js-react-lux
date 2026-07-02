import { type ReactionPill } from './ReactionPill';


// The base machinery's message type — the content-blind projection. Grouping,
// ordering, the slots and the registry are all typed to this. `author` and
// `content` are opaque (the base never reads them, only forwards them); `type` is
// an open registry key the library never switches on. The consumer/kit works with
// the narrowed `MessageData<T>`, which widens to this. See docs/module-chat.md §3.
export interface BaseMessage {

    // Mechanic primitives — the base reads and paints with these.

    id: string;
    // Grouping key — consecutive same-`group` messages form a group. **Absent**
    // means the message is ungrouped: it renders as a `single` row (centered,
    // authorless — e.g. a system event). See buildMessageRows / §4.
    group?: string;
    color?: string;               // author accent — for base-drawn chrome (reply line, bubble accent)
    alignment: 'start' | 'end';   // presentation side, not a channel concept
    timestamp: number | string | Date;   // ordering + day separators

    // The payload — opaque; `type` keys the registry.

    author?: unknown;             // forwarded to authorRenderer
    type: string;                 // open registry key
    content?: unknown;            // forwarded to the registered renderer

    // Cross-cutting decorations (universal, channel-neutral; rendered, never interpreted).

    status?: string;              // opaque delivery token, rendered via renderStatus
    editedAt?: number | string | Date;    // "(edited)" — appended in Properties
    deletedAt?: number | string | Date;   // tombstone — dispatch short-circuits to TombstoneMessage
    forwardedFrom?: {             // origin attribution (Telegram forwards) — opaque author
        author?: unknown;
        label?: string;
    };
    thread?: {                    // thread summary (Slack/Teams/Discord) — participants opaque
        count: number;
        lastAt?: number | string | Date;
        participants?: unknown[];
    };
    reactions?: ReactionPill[];   // author-free pills; who-reacted is lazy via getReactionParticipants
    replyTo?: BaseMessage;

}
