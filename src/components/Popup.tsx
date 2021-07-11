import { Placement } from '@popperjs/core';
import React, { FC, ReactElement, ReactNode, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useOnOutsideClick } from '../hooks/useOnOutsideClick';


export interface PopupProps {

    visible?: boolean;
    onChangeVisible?: (visible: boolean) => void;

    placement?: Placement;
    Component: React.FunctionComponent;

    children: React.ReactElement;

}

export const Popup: FC<PopupProps> = ({ visible = false, onChangeVisible = (visible: boolean) => null, placement = 'bottom', Component, children }) => {

    const [target, setTarget] = useState(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    const [arrow, setArrow] = useState<HTMLDivElement | null>(null);

    useOnOutsideClick(() => visible && onChangeVisible(false), visible, target, popper);

    const { styles, attributes } = usePopper(target, popper, {
        placement,
        modifiers: [
            { name: 'offset', options: { offset: [0, 4] } },
            { name: 'arrow', options: { padding: 4, element: arrow } },
        ]
    });

    return (
        <>
            {React.cloneElement(children, { ref: setTarget })}
            {visible && ReactDOM.createPortal(
                <div ref={setPopper} {...attributes.popper} className="popper-element text-base rounded border border-control-border bg-white" style={styles.popper}>
                    <Component/>
                    <div ref={setArrow} {...attributes.arrow} className="popper-arrow" style={styles.arrow} />
                </div>,
                document.querySelector('body')!
            )}
        </>
    );

};
