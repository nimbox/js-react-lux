import React, { FC } from 'react';
import { createPortal } from 'react-dom';


//
// modal
//

export interface ModalProps {
    visible: boolean;
    onHide: () => void;
}

export const Modal: FC<ModalProps> = ({ visible, onHide, children }) => {

    return visible ? createPortal(
        <div className="fixed inset-0 bg-gray-700 bg-opacity-80">
            {React.Children.only(children)}
        </div>,
        document.querySelector('#modal')!
    ) : null;

};
