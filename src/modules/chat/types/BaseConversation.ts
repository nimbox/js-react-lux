import { type AvatarData } from './AvatarData';
import { type BaseMessage } from './BaseMessage';


// The neutral conversation-row envelope — the fields lux *paints*,
// plus one opaque payload it never reads. The base row slots read
// this from context, the way message slots read `BaseMessage` (docs
// §1). Ordered in the same three blocks as `BaseMessage`: mechanic
// primitives → payload → decorations.

export interface BaseConversation {

    // Mechanic primitives — the base reads and paints with these.

    id: string;
    name: string;                 // painted directly (unlike a message's opaque `author`)
    avatar?: AvatarData;
    timestamp?: string;           // list sort key + the row's calendar label

    // The payload — the last message (rendered through the registry)
    // + the opaque `meta` (forwarded, never read).

    // The last message — rendered through the message registry at the
    // `summary` surface (a one-line digest), never a hand-built
    // string. (~ `content`.)

    lastMessage?: BaseMessage;

    // OPAQUE app attributes (pinned / starred / muted / …). lux never
    // reads it; the consumer paints indicators from it
    // (`renderConversationMeta`) and the menu resolves labels/actions
    // from it (`ConversationOption.resolve`). The parallel to
    // `BaseMessage.content` — carry the domain state, stay blind to
    // it.

    meta?: unknown;

    // Cross-cutting decorations — painted, never interpreted.

    // First-class: a neutral read count. lux owns the badge opinion
    // (base `ConversationMeta`), the same way it owns the reaction
    // pill (~ `reactions`) — not opaque, not consumer-configurable.

    unread?: number;

}
