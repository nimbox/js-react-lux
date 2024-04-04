import { Placement } from '@popperjs/core';
import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useOnOutsideClick } from '../hooks/useOnOutsideClick';


//
// Popup
//

export interface PopupProps {

    visible?: boolean;
    onChangeVisible?: (visible: boolean) => void;

    placement?: Placement;
    Component: React.FunctionComponent;

    children: React.ReactElement;

}

export const Popup: FC<PopupProps> = ({ visible = false, onChangeVisible = () => null, placement = 'bottom', Component, children }) => {

    const [reference, setReference] = useState(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    const [arrow, setArrow] = useState<HTMLDivElement | null>(null);

    useOnOutsideClick(visible, () => { if (visible) { onChangeVisible(false); } }, reference, popper);

    const { styles, attributes } = usePopper(reference, popper, {
        placement,
        modifiers: [
            { name: 'offset', options: { offset: [0, 4] } },
            { name: 'arrow', options: { padding: 4, element: arrow } }
        ]
    });

    return (
        <>
            {React.cloneElement(children, { ref: setReference })}
            {visible && ReactDOM.createPortal(
                <div ref={setPopper} {...attributes.popper} className="z-30 popper-element text-base rounded border border-control-border bg-white" style={styles.popper}>
                    <Component />
                    <div ref={setArrow} {...attributes.arrow} className="popper-arrow" style={styles.arrow} />
                </div>,
                document.querySelector('#modal')!
            )}
        </>
    );

};
