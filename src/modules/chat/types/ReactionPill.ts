export interface ReactionPill {

    emoji: string;
    count: number;

    // Whether to emphasise this pill. The consumer projects it (e.g. "the viewer
    // reacted with this emoji" — `highlighted: reactedByViewer`); the base ascribes
    // no meaning, it only styles a highlighted pill differently. Keeping the field
    // viewer-neutral keeps the "viewer" concept out of this base type.
    highlighted?: boolean;

}
