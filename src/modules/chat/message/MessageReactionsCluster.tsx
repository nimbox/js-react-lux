import { arrow, autoUpdate, flip, FloatingArrow, FloatingPortal, offset, shift, useClick, useDismiss, useFloating, useInteractions, type Placement } from '@floating-ui/react';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useMessage } from './MessageContext';
import { MessageReactionDetails } from './MessageReactionDetails';


// Renders ALL of a message's reactions as ONE clustered pill — the
// distinct emojis side by side plus the total count. Clicking it
// opens a popover of every reactor and the emoji each used
// (`MessageReactionDetails`, unfiltered — who + their reaction, and
// the viewer's own row still offers removal). Unlike the per-emoji
// `MessageReactionsExpanded`, the cluster does not surface *which*
// emoji was the viewer's; it only highlights when the viewer reacted
// with anything. This is the default form the `MessageReactions`
// chooser renders (which `MessageContainer` mounts); exposed directly
// as `Message.ReactionsCluster`. Adding a reaction is a separate
// affordance (the reaction picker).

export function MessageReactionsCluster() {

    const { message: { alignment, reactions } } = useMessage();

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

    if (!reactions || reactions.length === 0) {
        return null;
    }

    const sorted = [...reactions].sort((a, b) => b.count - a.count);
    const total = reactions.reduce((sum, pill) => sum + pill.count, 0);
    const highlighted = reactions.some(pill => pill.highlighted);

    return (
        <div className={classNames(
            'flex flex-row -mt-1 z-10',
            alignment === 'end' ? 'justify-end mr-3' : 'justify-start ml-3'
        )}>

            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className={classNames(
                    'flex items-center gap-0.5 bg-white rounded-full shadow-sm border px-2 h-6 text-sm cursor-pointer',
                    highlighted ? 'border-primary-400' : 'border-gray-200'
                )}
            >
                {sorted.map(pill => (
                    <span key={pill.emoji} className="text-base leading-none">{pill.emoji}</span>
                ))}
                {total > 1 && <span className="text-xs text-gray-500">{total}</span>}
            </button>

            {open && (
                <FloatingPortal id="modal">
                    <div ref={refs.setFloating} {...getFloatingProps({ className: 'text-base rounded border border-control-border bg-white' })} style={floatingStyles}>
                        <MessageReactionDetails />
                        <FloatingArrow
                            ref={arrowRef}
                            context={context}
                            strokeWidth={1}
                            className="fill-control-bg [&>path:first-of-type]:stroke-control-border"
                        />
                    </div>
                </FloatingPortal>
            )}

        </div>
    );

}

const PLACEMENT: Record<'start' | 'end', Placement> = {
    'start': 'top-start',
    'end': 'top-end'
} as const;
