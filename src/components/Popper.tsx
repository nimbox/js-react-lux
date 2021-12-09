import { Placement } from '@popperjs/core';
import classnames from 'classnames';
import React, { useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { sameWidth } from '../utilities/sameWidth';


//
// Popper
//

export type PopperPlacement = Placement;

export interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {

    reference: Element;

    withPlacement?: PopperPlacement;
    withArrow?: boolean;
    withSameWidth?: boolean;

    className?: string;

}

export interface HTMLPopperElement extends HTMLDivElement {
    forceUpdate: (() => void) | null;
};

export const Popper = React.forwardRef<HTMLPopperElement, PopperProps>((props, popperRef) => {

    // properties

    const {

        reference,

        withPlacement = 'bottom-start',
        withArrow = false,
        withSameWidth = false,

        className,

        children,

        ...divProps

    } = props;

    // configuration

    const [internalPopperRef, setInternalPopperRef] = useState<HTMLDivElement | null>(null);
    const [internalArrowRef, setInternalArrowRef] = useState<HTMLDivElement | null>(null);

    const { styles, attributes, forceUpdate } = usePopper(reference, internalPopperRef, {
        placement: withPlacement,
        modifiers: [
            { name: 'offset', options: { offset: [0, 4] } },
            ...(withArrow ? [{ name: 'arrow', options: { element: internalArrowRef } }] : []),
            ...(withSameWidth ? [sameWidth] : [])
        ]
    });

    useImperativeHandle(popperRef, () =>
        internalPopperRef != null ? Object.assign(internalPopperRef, { forceUpdate }) : null!,
        [internalPopperRef, forceUpdate]
    );

    // render

    return ReactDOM.createPortal(
        <div ref={setInternalPopperRef} {...divProps} {...attributes.popper} className={classnames('z-50 popper-element', className)} style={styles.popper}>
            {children}
            {withArrow && <div ref={setInternalArrowRef} className="popper-arrow" style={styles.arrow} />}
        </div>,
        document.querySelector('#modal')!
    );

});
