import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useChat } from '../../ChatContext';
import { useMessage } from '../MessageContext';
import { MessageOptions } from '../MessageOptions';
import { MessageReactionPicker } from '../MessageReactionPicker';
import { MessageReactions } from '../MessageReactions';


export interface MessageContainerProps {
    children: ReactNode;
}

// The Container tier owns the full-surface message frame, its content-blind affordances,
// and ALL of the hover logic (the provider renders no DOM — see `MessageProvider`). It
// declares THREE nested elements, each with a single job:
//   • the ROW (`w-full group`) is the full-width row and the FULL-ROW hover region — the
//     unnamed `group` that reveals the reaction picker (so hovering anywhere on the row,
//     bubble→gap→picker, keeps it revealed: no flicker).
//   • the POSITIONING ANCHOR (`relative max-w-[75%]`, shrink-wrapped to the bubble — its
//     only in-flow child is the bubble group; the picker is absolute/out of flow) is the
//     box both overlays position against, and it HOLDS the picker.
//   • the BUBBLE HOVER SCOPE (`group/bubble`) is an inner wrapper around the bubble + its
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
export function MessageContainer({ children }: MessageContainerProps) {

    const { message: { alignment } } = useMessage();
    const { onCreateReaction } = useChat();
    const isStart = alignment === 'start';

    return (
        <div className={classNames('w-full group flex flex-col', isStart ? 'items-start' : 'items-end')}>

            {/* Positioning anchor — `relative`, shrink-wrapped to the bubble; holds the
                picker so it can sit just outside the bubble, while keeping it out of the
                bubble hover group. */}
            <div className={classNames('relative max-w-[75%] flex flex-col', isStart ? 'items-start' : 'items-end')}>

                {/* Bubble hover scope — the bubble + its option menu ONLY. Carries the
                    flex-col alignment a bubble-less sticker needs for its two stacked
                    children. */}
                <div className={classNames('flex flex-col group/bubble', isStart ? 'items-start' : 'items-end')}>

                    {children}

                    {/* Option chrome — top-right corner of the bubble, revealed on BUBBLE
                        hover (`group/bubble`). Its overflow menu portals out, so gating the
                        trigger on hover is safe. */}
                    <div className="absolute top-2 right-2 z-20 invisible group-hover/bubble:visible">
                        <MessageOptions />
                    </div>

                </div>

                {/* Reaction chooser — just outside the bubble on the inner side (right of
                    an inbound bubble, left of an outbound one), revealed on FULL-ROW hover
                    (the wrapper's unnamed `group`). Sibling of the bubble group so hovering
                    it never reveals the menu; still inside the `relative` anchor so it
                    places against the bubble box. The picker button self-manages its own
                    hover reveal and popover, so no gating here. */}
                {onCreateReaction && (
                    <div className={classNames(
                        'absolute top-1/2 -translate-y-1/2 z-20',
                        isStart ? 'left-full ml-2' : 'right-full mr-2'
                    )}>
                        <MessageReactionPicker />
                    </div>
                )}

            </div>

            <MessageReactions />

        </div>
    );

}
