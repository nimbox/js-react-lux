import React, { type FC } from 'react';
import { createPortal } from 'react-dom';


//
// Modal
//

export interface ModalProps {

    show: boolean;

    children?: React.ReactNode;

}

export const Modal: FC<ModalProps> = ({ show, children }) => {

    if (!show) {
        return null;
    }

    // Prefer a host-provided `#modal` mount point, but fall back to
    // `document.body` so the modal never crashes an app that has not declared
    // one (`createPortal(…, null)` throws).
    const container = document.querySelector('#modal') ?? document.body;

    return createPortal(
        <div className="fixed inset-0 bg-gray-700/80 z-40">
            {React.Children.only(children)}
        </div>,
        container
    );

};
