import type { ReactNode } from 'react';
import { cn } from '../../../components/utilities/cn';
import { useChat } from '../ChatContext';
import { useMessage } from './MessageContext';
import { MessageOptions } from './MessageOptions';
import { MessageReactionPicker } from './MessageReactionPicker';
import { MessageReactions } from './MessageReactions';


type Placement = 'start' | 'center' | 'end';

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
// below. The group avatar rides along with the tail instead of living here — both mark
// "this is the group's last bubble," so both are `Bubble`'s job (see `MessageBubble.tsx`).
// `plain` (a context flag from the dispatch layer) drops all three — and, in the bubble
// and author slot, the group decorations too. Horizontal placement is one three-valued
// axis: `placement` (defaulting to the message's directional `alignment`) mapped once
// through `PLACEMENT_ITEMS`. The structural frame (row / anchor / bubble scope) is unchanged.
export function MessageFrame({ children, placement }: MessageFrameProps) {

    const { message: { alignment }, plain } = useMessage();
    const { onCreateReaction } = useChat();

    // One three-valued placement: an explicit `placement` (the preview centers a lone
    // bubble) or the message's directional `alignment`. Mapped once, used at all three
    // levels below. The picker's inner-side offset keys off the same value, but a centered
    // frame is always `plain`, so that offset never renders.
    const align = placement ?? alignment;
    const items = PLACEMENT_ITEMS[align];

    return (
        <div className={cn('w-full group flex flex-col', items)}>

            {/* Positioning anchor — `relative`, shrink-wrapped to the content; holds the
                picker so it can sit just outside the bubble, while keeping it out of the
                bubble hover group. */}
            <div className={cn('relative max-w-[75%] flex flex-col', items)}>

                {/* Bubble hover scope — the content + its option menu ONLY. Carries the
                    flex-col alignment a bubble-less sticker needs for its stacked
                    children (author pill / image / properties bubble); `gap-1` is a
                    no-op for every other kit, which only ever passes one child. */}
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

            </div>

            {!plain && <MessageReactions />}

        </div>
    );

}
