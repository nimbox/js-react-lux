import { arrow, autoUpdate, flip, FloatingArrow, FloatingPortal, offset, shift, useClick, useDismiss, useFloating, useInteractions, type Placement } from '@floating-ui/react';
import classNames from 'classnames';
import { useMemo, useRef, useState } from 'react';
import { useChat } from '../../ChatContext';
import { useMessage } from '../MessageContext';
import { useMessageGroup } from '../MessageGroupContext';
import { MessageReactionDetails } from './MessageReactionDetails';


export function MessageReactions() {

    const { removeReaction } = useChat();
    const { group: { direction } } = useMessageGroup();
    const { message: { reactions } } = useMessage();

    // Sort reactions by count

    const { sorted, total } = useMemo(() => {
        if (!reactions) {
            return { sorted: [], total: 0 };
        }
        const sorted = [...reactions].sort((a, b) => b.count - a.count)
        const total = reactions.reduce((s, r) => s + r.count, 0)
        return { sorted, total }
    }, [reactions])

    // Floating UI

    const [open, setOpen] = useState(false);

    const arrowRef = useRef<SVGSVGElement | null>(null);
    const { refs, floatingStyles, context } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: PLACEMENT[direction] ?? 'top',
        strategy: 'fixed',
        middleware: [
            offset(8),
            shift({ padding: 8 }),
            flip(),
            arrow({ element: arrowRef, padding: 8 })
        ],
        whileElementsMounted: autoUpdate
    });

    const click = useClick(context, { toggle: true, event: 'mousedown' });
    const dismiss = useDismiss(context, { outsidePress: true, outsidePressEvent: 'pointerdown', escapeKey: true });
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

    // Handlers

    const handleRemoveReaction = (messageId: string, emoji: string) => {
        removeReaction(messageId, emoji);
        setOpen(false);
    };

    // Render

    if (sorted.length === 0) {
        return null;
    }

    return (
        <>

            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className={classNames(
                    'flex -mt-2 z-10',
                    direction === 'outbound' ? 'justify-self-end mr-3' : 'justify-self-start ml-3'
                )}
            >
                <span className="bg-white rounded-full shadow-md flex items-center justify-center min-w-6 h-6 text-base border border-gray-200 p-3 gap-0.5">
                    {sorted.map(r => (
                        <span key={r.emoji} className="mx-0.5 text-base">{r.emoji}</span>
                    ))}
                    {(total > 1) && <span className="ml-0.5 text-xs">{total}</span>}
                </span>
            </button>

            {open && (
                <FloatingPortal id="modal">
                    <div ref={refs.setFloating} {...getFloatingProps({ className: 'text-base rounded border border-control-border bg-white' })} style={floatingStyles} >

                        <MessageReactionDetails onRemoveReaction={handleRemoveReaction} />

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

const PLACEMENT: Record<'inbound' | 'outbound', Placement> = {
    'inbound': 'top-start',
    'outbound': 'top-end'
} as const;
