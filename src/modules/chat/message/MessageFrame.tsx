import type { ReactNode } from 'react';
import { cn } from '../../../components/utilities/cn';
import { useChat } from '../ChatContext';
import { useMessage } from './MessageContext';
import { MessageOptions } from './MessageOptions';
import { MessageReactionPicker } from './MessageReactionPicker';
import { MessageReactions } from './MessageReactions';


type Placement = 'start' | 'center' | 'end';

// The room on each side of a timeline row that the group avatar stands in:
// a 1.5em avatar (`Avatar.tsx`) at the 1.25rem font-size set on it below is
// 1.875rem across, plus its 0.25rem margin = 2.125rem, flush. All rem, so it
// holds at any root font-size.
const GUTTER = 'px-[2.125rem]';

const PLACEMENT_ITEMS: Record<Placement, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
};


export interface MessageFrameProps {

    /**
     * Where the frame places the bubble. Defaults to the message's directional `alignment`;
     * the composer preview passes `center` — a lone, out-of-timeline bubble has no sender
     * side to align to.
     */
    placement?: Placement;

    /** The slots user to render the message. */
    children: ReactNode;

}

// The full-surface message frame — mounted by the DISPATCH LAYER around a content
// instance (§6, "whoever dispatches, provides"), NOT composed by the instance. It owns
// the message frame, its content-blind affordances, and ALL of the hover logic (the
// provider renders no DOM — see `MessageProvider`). It declares THREE nested elements,
// each with a single job:
//   • the ROW (`w-full group`) is the full-width row and the FULL-ROW hover region — the
//     unnamed `group` that reveals the reaction picker (so hovering anywhere on the row,
//     bubble→gap→picker, keeps it revealed: no flicker).
//   • the POSITIONING ANCHOR (`relative max-w-[75%]`, shrink-wrapped to the content — its
//     only in-flow child is the bubble group; the picker is absolute/out of flow) is the
//     box both overlays position against, and it HOLDS the picker.
//   • the BUBBLE HOVER SCOPE (`group/bubble`) is an inner wrapper around the content + its
//     option menu ONLY — the picker is deliberately a *sibling* of it, not a child.
// The two affordances, deliberately different hover scopes (opinionated split):
//   • the **reaction chooser** (`MessageReactionPicker`) reveals on **full-row** hover
//     (the row's unnamed `group`). Present whenever `onCreateReaction` is supplied; NOT a
//     menu option.
//   • the **option chrome** (`MessageOptions`, the overflow menu at the bubble's
//     top-right corner) reveals only on **bubble** hover (`group/bubble`), so it reads as
//     attached to the message — and because the picker sits OUTSIDE that group, hovering
//     the picker does not reveal it.
// Reactions (`MessageReactions`, the chooser — the default single clustered pill) stack
// below. The frame also places the **group avatar**, on the group's last message: at the
// bottom of the positioning anchor, on the outer side, standing in the gutter the row
// reserves for it. The anchor is the message's content alone (the reactions sit below
// it), so the avatar stays level with the last bubble whatever hangs under it, and every
// message gets it whether or not its instance renders a bubble.
// `plain` (a context flag from the dispatch layer) drops all of it, the gutter included —
// and, in the bubble and author slot, the group decorations too. Horizontal placement is one three-valued
// axis: `placement` (defaulting to the message's directional `alignment`) mapped once
// through `PLACEMENT_ITEMS`. The structural frame (row / anchor / bubble scope) is unchanged.
export function MessageFrame({ children, placement }: MessageFrameProps) {

    const { message: { alignment, author }, isLast, plain } = useMessage();
    const { authorRenderer, onCreateReaction } = useChat();

    // One three-valued placement: an explicit `placement` (the preview centers a lone
    // bubble) or the message's directional `alignment`. Mapped once, used at all three
    // levels below. The picker's inner-side offset keys off the same value, but a centered
    // frame is always `plain`, so that offset never renders.
    const align = placement ?? alignment;
    const items = PLACEMENT_ITEMS[align];

    return (
        <div className={cn('w-full group flex flex-col', !plain && GUTTER, items)}>

            {/* Positioning anchor — `relative`, shrink-wrapped to the content; holds the
                picker so it can sit just outside the bubble, while keeping it out of the
                bubble hover group. */}
            <div className={cn('relative max-w-[75%] flex flex-col', items)}>

                {/* Bubble hover scope — the content + its option menu ONLY. An instance
                    may render several pieces (a sticker: author chip / image / time
                    chip); they stack here with a gap, aligned to the message's side. */}
                <div className={cn('flex flex-col gap-1 group/bubble', items)}>

                    {children}

                    {/* Option chrome — top-right corner of the bubble, revealed on BUBBLE
                        hover (`group/bubble`). Its overflow menu portals out, so gating the
                        trigger on hover is safe. */}
                    {!plain && (
                        <div className="absolute top-2 right-2 z-20 invisible group-hover/bubble:visible">
                            <MessageOptions />
                        </div>
                    )}

                </div>

                {/* Reaction chooser — just outside the bubble on the inner side (right of
                    an inbound bubble, left of an outbound one), revealed on FULL-ROW hover
                    (the wrapper's unnamed `group`). Sibling of the bubble group so hovering
                    it never reveals the menu; still inside the `relative` anchor so it
                    places against the bubble box. The picker button self-manages its own
                    hover reveal and popover, so no gating here. */}
                {!plain && onCreateReaction && (
                    <div className={cn(
                        'absolute top-1/2 -translate-y-1/2 z-20',
                        align === 'start' ? 'left-full ml-2' : 'right-full mr-2'
                    )}>
                        <MessageReactionPicker />
                    </div>
                )}

                {/* Group avatar — on the group's last message, at the bottom of the
                    content, on the outer side. The author is opaque: it is only
                    forwarded to `authorRenderer`. Sized in rem to fill `GUTTER`. */}
                {!plain && isLast && author != null && (
                    <div className={cn(
                        'absolute bottom-0 text-[1.25rem] leading-[1.5rem]',
                        alignment === 'start' ? 'right-full mr-1' : 'left-full ml-1'
                    )}>
                        {authorRenderer.avatar(author)}
                    </div>
                )}

            </div>

            {!plain && <MessageReactions />}

        </div>
    );

}
