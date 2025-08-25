import { FloatingArrow, FloatingPortal, type Placement, arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';


interface TooltipProviderProps {

    /**
     * Chilren.
     */
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

        function handleOver(e: MouseEvent) {
            const el = e.target as HTMLElement | null;
            if (el && el.hasAttribute('data-tooltip')) {
                setActive({
                    target: el,
                    text: el.getAttribute('data-tooltip') || '',
                    placement: (el.getAttribute('data-tooltip-placement') as Placement) || 'top',
                });
            }
        }

        function handleOut(e: MouseEvent) {
            const el = e.target as HTMLElement | null;
            if (el && el.hasAttribute('data-tooltip')) {
                setActive(null);
            }
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
                className={classNames('tooltip-element',
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