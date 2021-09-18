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

    placement?: PopperPlacement;
    withArrow?: boolean;
    withSameWidth?: boolean;

    className?: string;

}

export const Popper = React.forwardRef<HTMLDivElement, PopperProps>((props, ref) => {

    // properties

    const { 
        
        reference, 

        placement = 'bottom-start', 
        withArrow = false, 
        withSameWidth = false, 
        
        className, 
        
        children,

        ...divProps 
    
    } = props;

    // configuration

    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    const [arrow, setArrow] = useState<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => popper!);

    const { styles, attributes } = usePopper(reference, popper, {
        placement,
        modifiers: [
            { name: 'offset', options: { offset: [0, 4] } },
            ...(withArrow ? [{ name: 'arrow', options: { element: arrow } }] : []),
            ...(withSameWidth ? [sameWidth] : [])
        ]
    });

    // render

    return ReactDOM.createPortal(
        <div ref={setPopper} {...attributes.popper} {...divProps} className={classnames('z-40 popper-element', className)} style={styles.popper}>
            {children}
            {withArrow && <div ref={setArrow} className="popper-arrow" style={styles.arrow} />}
        </div>,
        document.querySelector('#modal')!
    );

});
