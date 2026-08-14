import { arrow as arrowMw, autoUpdate, flip, FloatingPortal, hide, offset, shift, size, useFloating, type Placement as FPlacement } from '@floating-ui/react';
import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { cn } from '../utilities/cn';
import { ControlArrow } from './ControlArrow';


const ARROW_PADDING = 16;

export type PopperPlacement = FPlacement;

export interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {

    ref?: React.Ref<HTMLPopperElement>;

    reference: Element;

    withPlacement?: PopperPlacement;
    withArrow?: boolean;
    withSameWidth?: boolean;

    className?: string;

}

export interface HTMLPopperElement extends HTMLDivElement {
    forceUpdate: (() => void) | null;
}

export function Popper(props: PopperProps) {

    // Properties

    const {

        ref,

        reference,

        withPlacement = 'bottom-start',
        withArrow = false,
        withSameWidth = false,

        className,

        children,

        ...divProps

    } = props;


    // Configuration

    const arrowRef = useRef<SVGSVGElement | null>(null);

    const middleware = useMemo(() => {
        const list = [offset(4), flip(), shift()];
        if (withArrow) list.push(arrowMw({ element: arrowRef, padding: ARROW_PADDING }));
        if (withSameWidth) {
            list.push(
                size({
                    apply({ rects, elements }) {
                        elements.floating.style.width = `${Math.round(rects.reference.width)}px`;
                    }
                })
            );
        }
        /**
         * `shift()` keeps the panel inside the viewport, which is what stops it
         * from being cut off — and also what strands it when its reference
         * scrolls away: the reference leaves, the panel is held back at the
         * edge, and it hangs there anchored to nothing. `hide()` reports when
         * that has happened so the panel can go with it. Last in the list, as
         * it reads the position the others settled on.
         */
        list.push(hide());

        return list;
    }, [withArrow, withSameWidth]);

    const { refs, floatingStyles, update, context, middlewareData } = useFloating({
        placement: withPlacement,
        middleware,
        whileElementsMounted: autoUpdate
    });

    const referenceHidden = middlewareData.hide?.referenceHidden ?? false;

    // Bind external reference element

    useEffect(() => {
        refs.setReference(reference);
    }, [reference, refs]);

    useImperativeHandle(ref, () => {
        const el = refs.floating.current as HTMLPopperElement;
        if (el) el.forceUpdate = update ?? null;
        return el;
    }, [update, refs.floating.current]);

    // Render

    return (
        <FloatingPortal id="modal">
            <div
                ref={refs.setFloating}
                {...divProps}
                className={cn('z-50 popper-element', className)}
                style={{
                    ...floatingStyles,
                    visibility: referenceHidden ? 'hidden' : 'visible'
                }}
            >
                {children}
                {withArrow && <ControlArrow ref={arrowRef} context={context} />}
            </div>
        </FloatingPortal>
    );

}
