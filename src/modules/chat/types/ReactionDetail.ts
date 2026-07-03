// One entry in a message's who-reacted list — the expanded detail behind an
// aggregated `ReactionPill`, loaded lazily via `getReactionDetails`. Ties an opaque
// author to the emoji they used; the base renders the author through `authorRenderer`
// and the emoji itself — it never reads the author shape (that was the flaw in the
// old `ReactionDetailsData`, whose `author: MessageAuthor` leaked the shape into a
// base type). `removable` is a neutral, consumer-projected instruction (same
// philosophy as a pill's `highlighted`): the base renders a "remove" affordance for
// the row and ascribes no meaning — the consumer decides removability, so the "viewer"
// concept never enters this base type. See docs/module-chat.md §6.
export interface ReactionDetail {

    // Opaque — forwarded to `authorRenderer`, never read by the base.
    author?: unknown;

    emoji: string;
    timestamp?: number | string | Date;

    // The base offers a "remove my reaction" affordance for this row iff set. The
    // consumer projects it (typically "the viewer's own reaction"); the base never
    // derives it and knows nothing about whose reaction it is.
    removable?: boolean;

}
