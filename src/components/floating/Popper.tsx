import { arrow as arrowMw, autoUpdate, flip, FloatingPortal, offset, shift, size, useFloating, type Placement as FPlacement } from '@floating-ui/react';
import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { cn } from '../utilities/cn';
import { ControlArrow } from './ControlArrow';


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
        if (withArrow) list.push(arrowMw({ element: arrowRef, padding: 0 }));
        if (withSameWidth) {
            list.push(
                size({
                    apply({ rects, elements }) {
                        elements.floating.style.width = `${Math.round(rects.reference.width)}px`;
                    }
                })
            );
        }
        return list;
    }, [withArrow, withSameWidth]);

    const { refs, floatingStyles, update, context } = useFloating({
        placement: withPlacement,
        middleware,
        whileElementsMounted: autoUpdate
    });

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
                style={floatingStyles}
            >
                {children}
                {withArrow && <ControlArrow ref={arrowRef} context={context} />}
            </div>
        </FloatingPortal>
    );

}
