import { FloatingArrow, FloatingPortal, type Placement, arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../utilities/cn';


interface TooltipProviderProps {

    children?: React.ReactNode;

}

interface ActiveTooltip {
    target: HTMLElement;
    text: string;
    placement: Placement;
}

export function TooltipProvider(props: TooltipProviderProps) {

    const {
        children,
    } = props;

    const [active, setActive] = useState<ActiveTooltip | null>(null);

    useEffect(() => {

        // The element the pointer is over, or the nearest one above it that
        // carries a tooltip.
        //
        // `closest` rather than the target itself. `mouseover` and `mouseout`
        // fire on every crossing between an element and its own children, and
        // the target is always the deepest one — so an element that merely
        // holds its label in a `span` used to lose its tooltip the moment the
        // pointer reached the text, while keeping it over the gaps in between.
        // Anything inside a tooltipped element is still inside it.

        function tooltipped(target: EventTarget | null): HTMLElement | null {
            return target instanceof Element ? target.closest<HTMLElement>('[data-tooltip]') : null;
        }

        function handleOver(e: MouseEvent) {

            const el = tooltipped(e.target);
            if (el == null) { return; }

            setActive({
                target: el,
                text: el.getAttribute('data-tooltip') || '',
                placement: (el.getAttribute('data-tooltip-placement') as Placement) || 'top',
            });

        }

        function handleOut(e: MouseEvent) {

            const el = tooltipped(e.target);
            if (el == null) { return; }

            // Where the pointer went. Moving into a child of the same element
            // is not leaving it, and hiding on that would undo what the
            // matching `mouseover` is about to do — which is the flicker this
            // pair used to produce over any tooltip with markup inside it.

            const to = e.relatedTarget;
            if (to instanceof Node && el.contains(to)) { return; }

            setActive(null);

        }

        window.addEventListener('mouseover', handleOver);
        window.addEventListener('mouseout', handleOut);
        return () => {
            window.removeEventListener('mouseover', handleOver);
            window.removeEventListener('mouseout', handleOut);
        };

    }, []);

    // Render

    return (
        <>
            {children}
            {active && (
                <Tooltip
                    text={active.text}
                    reference={active.target}
                    placement={active.placement}
                />
            )}
        </>
    );

};

// Tooltip

interface TooltipProps {

    text: string;
    reference: HTMLElement;
    placement: Placement;

    className?: string;

}

function Tooltip(props: TooltipProps) {

    // Properties

    const { text, reference, placement, className } = props;

    // Configuration

    const arrowRef = useRef<SVGSVGElement | null>(null);
    const { refs, floatingStyles, context } = useFloating({
        placement,
        middleware: [
            offset(8),
            flip(),
            shift(),
            arrow({ element: arrowRef, padding: 4 }),
        ],
        whileElementsMounted: autoUpdate,
    });

    useEffect(() => {
        refs.setReference(reference);
    }, [reference, refs]);

    // Render

    return (
        <FloatingPortal id="modal">
            <div
                ref={refs.setFloating}
                style={floatingStyles}
                className={cn('tooltip-element',
                    className,

                )}
            >
                {text}
                <FloatingArrow
                    ref={arrowRef}
                    context={context}
                    className="tooltip-arrow"
                    strokeWidth={1}
                />
            </div>
        </FloatingPortal>
    );

};