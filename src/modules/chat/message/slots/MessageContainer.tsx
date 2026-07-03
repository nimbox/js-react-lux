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

// The Container tier owns the message frame and its content-blind affordances. Both
// affordances are hover OVERLAYS anchored to the **bubble box** — a `relative` anchor
// that shrink-wraps the bubble (capped at `max-w-[75%]`, which resolves because
// `MessageProvider`'s wrapper is now `w-full`) — so they reserve no layout space and
// hug the bubble at any content width (docs §7). The **hover region is the full-width
// row** (the wrapper carries `group`, so `group-hover` covers the whole row): the
// bubble, the gap, and the picker are all inside it, so moving from the bubble to the
// picker never drops the hover (no flicker). Two DELIBERATELY SEPARATE pieces
// (opinionated split): the **reaction chooser** (`MessageReactionPicker`) sits just
// outside the bubble on its inner side, present whenever `onCreateReaction` is
// supplied — it is NOT a menu option; the **option chrome** (`MessageOptions`) sits at
// the bubble's top-right corner. Reactions (`MessageReactions`, the chooser — the
// default single clustered pill) stack below.
export function MessageContainer({ children }: MessageContainerProps) {

    const { message: { alignment } } = useMessage();
    const { onCreateReaction } = useChat();
    const isStart = alignment === 'start';

    return (
        <div className={classNames('flex flex-col', isStart ? 'items-start' : 'items-end')}>

            <div className={classNames('relative max-w-[75%] flex flex-col', isStart ? 'items-start' : 'items-end')}>

                {children}

                {/* Option chrome — top-right corner of the bubble. Its overflow menu
                    portals out, so gating the trigger on hover is safe. */}
                <div className="absolute top-2 right-2 z-20 invisible group-hover:visible">
                    <MessageOptions />
                </div>

                {/* Reaction chooser — just outside the bubble on the inner side (right
                    of an inbound bubble, left of an outbound one). The picker button
                    self-manages its own hover reveal and popover, so no gating here. */}
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
