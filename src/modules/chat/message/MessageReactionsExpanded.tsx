import { arrow, autoUpdate, flip, FloatingArrow, FloatingPortal, offset, shift, useClick, useDismiss, useFloating, useInteractions, type Placement } from '@floating-ui/react';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import type { ReactionPill } from '../types/ReactionPill';
import { useMessage } from './MessageContext';
import { MessageReactionDetails } from './MessageReactionDetails';


// The EXPANDED reactions rendering — one chip per emoji. Each chip
// shows its own count, highlights when the viewer reacted with it,
// and opens a popover of that emoji's participants. The alternative
// to the default `MessageReactionsCluster` (one clustered pill);
// exposed as `Message.ReactionsExpanded`. Adding a reaction is a
// separate affordance (the reaction picker).

export function MessageReactionsExpanded() {

    const { message: { alignment, reactions } } = useMessage();

    if (!reactions || reactions.length === 0) {
        return null;
    }

    const sorted = [...reactions].sort((a, b) => b.count - a.count);

    return (
        <div className={classNames(
            'flex flex-row flex-wrap gap-1 -mt-1 z-10',
            alignment === 'end' ? 'justify-end mr-3' : 'justify-start ml-3'
        )}>
            {sorted.map(pill => (
                <ReactionChip key={pill.emoji} pill={pill} alignment={alignment} />
            ))}
        </div>
    );

}

function ReactionChip({ pill, alignment }: { pill: ReactionPill; alignment: 'start' | 'end' }) {

    const [open, setOpen] = useState(false);

    const arrowRef = useRef<SVGSVGElement | null>(null);
    const { refs, floatingStyles, context } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: PLACEMENT[alignment] ?? 'top',
        strategy: 'fixed',
        middleware: [offset(8), shift({ padding: 8 }), flip(), arrow({ element: arrowRef, padding: 8 })],
        whileElementsMounted: autoUpdate
    });

    const click = useClick(context, { toggle: true, event: 'mousedown' });
    const dismiss = useDismiss(context, { outsidePress: true, outsidePressEvent: 'pointerdown', escapeKey: true });
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

    return (
        <>
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className={classNames(
                    'flex items-center gap-0.5 bg-white rounded-full shadow-sm border px-2 h-6 text-sm cursor-pointer',
                    pill.highlighted ? 'border-primary-400' : 'border-gray-200'
                )}
            >
                <span className="text-base leading-none">{pill.emoji}</span>
                {pill.count > 1 && <span className="text-xs text-gray-500">{pill.count}</span>}
            </button>

            {open && (
                <FloatingPortal id="modal">
                    <div ref={refs.setFloating} {...getFloatingProps({ className: 'text-base rounded border border-control-border bg-white' })} style={floatingStyles}>
                        <MessageReactionDetails emoji={pill.emoji} />
                        <FloatingArrow
                            ref={arrowRef}
                            context={context}
                            strokeWidth={1}
                            className="fill-control-bg [&>path:first-of-type]:stroke-control-border"
                        />
                    </div>
                </FloatingPortal>
            )}
        </>
    );

}

const PLACEMENT: Record<'start' | 'end', Placement> = {
    'start': 'top-start',
    'end': 'top-end'
} as const;
