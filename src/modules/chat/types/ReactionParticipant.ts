// One entry in a message's who-reacted list, loaded lazily via
// `getReactionParticipants`. Ties an opaque author to the emoji they used; the
// base renders the author through `authorRenderer` and the emoji itself — it never
// reads the author shape (that was the flaw in the old `ReactionDetailsData`, whose
// `author: MessageAuthor` leaked the shape into a base type). `isViewer` is a
// neutral, consumer-projected flag (the same pattern as a pill's `highlighted`) —
// the base never fabricates it — and gates the "remove my reaction" affordance in
// the details popover. See docs/module-chat.md §6.
export interface ReactionParticipant {

    // Opaque — forwarded to `authorRenderer`, never read by the base.
    author?: unknown;

    emoji: string;
    timestamp?: number | string | Date;

    // The consumer projects "this participant is the viewer" (their own reaction) —
    // used only to offer removal; the base never derives it.
    isViewer?: boolean;

}
