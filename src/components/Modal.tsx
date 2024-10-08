import React, { FC } from 'react';
import { createPortal } from 'react-dom';


//
// Modal
//

export interface ModalProps {

    show: boolean;

    children?: React.ReactNode;

}

export const Modal: FC<ModalProps> = ({ show, children }) => {

    return show ? createPortal(
        <div className="fixed inset-0 bg-gray-700 bg-opacity-80 z-40">
            {React.Children.only(children)}
        </div>,
        document.querySelector('#modal')!
    ) : null;

};
