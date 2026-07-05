import type { ReactionDetail } from '../types/ReactionDetail';
import type { ReactionPill } from '../types/ReactionPill';
import { alex, miguel, sarah } from './authors';


// Reaction fixtures. On the envelope, reactions are author-free PILLS
// (`{ emoji, count, highlighted }`) — cheap, shipped with every message. The
// who-reacted DETAILS (`ReactionDetail[]`) load lazily via `getReactionDetails` and
// carry the opaque author + the emoji each used. See docs/module-chat.md §6.

// One emoji, highlighted (the viewer reacted with it).
export const singlePill: ReactionPill[] = [
    { emoji: '👍', count: 3, highlighted: true }
];

// Several emojis; the viewer reacted with one of them (❤️ highlighted).
export const multiPill: ReactionPill[] = [
    { emoji: '🔥', count: 4, highlighted: true },
    { emoji: '🚀', count: 2 },
    { emoji: '👏', count: 1 }
];

// The lazily-loaded details behind `multiPill`: who reacted, with which emoji.
// `removable: true` marks the viewer's own reaction — the base offers a "remove"
// affordance on that row (paired with `onDeleteReaction`). The base never derives
// removability; the consumer projects it (docs §6).
export const reactionDetails: ReactionDetail[] = [
    { author: sarah, emoji: '🔥', timestamp: '2024-01-16T10:25:10Z', removable: true },
    { author: alex, emoji: '🔥', timestamp: '2024-01-16T10:25:14Z' },
    { author: miguel, emoji: '🔥', timestamp: '2024-01-16T10:25:20Z' },
    { author: alex, emoji: '🚀', timestamp: '2024-01-16T10:25:30Z' },
    { author: miguel, emoji: '👏', timestamp: '2024-01-16T10:25:45Z' }
];
