// One entry in a message's who-reacted list, loaded lazily via
// `ChatContext.getReactionParticipants`. Ties an opaque author to the emoji they
// used; the base renders the author through `authorRenderer` and the emoji
// itself. Replaces the old `ReactionDetailsData` (which carried a `self` flag and
// a fabricated timestamp). See docs/module-chat.md §6.
export interface ReactionParticipant {

    // Opaque — forwarded to `authorRenderer`, never read by the base.
    author?: unknown;

    emoji: string;
    timestamp?: number | string | Date;

}
