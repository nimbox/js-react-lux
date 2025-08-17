import classnames from 'classnames';
import React, { type FC, useState } from 'react';
import { useOnOutsideClick } from '../hooks/useOnOutsideClick';
import { Modal } from './Modal';


//
// Dialog
//

export interface DialogProps {

    show: boolean;
    onHide: () => void;

    className: string;

    children?: React.ReactNode;

}

export interface DialogComponent extends FC<DialogProps> {

    Header: FC<{ noBorder?: boolean, className?: string, children?: React.ReactNode }>,

    Body: FC<{ className?: string, children?: React.ReactNode }>,

    Footer: FC<{ className?: string, children?: React.ReactNode }>

}

export const Dialog: DialogComponent = ({ show, onHide, className, children }) => {

    // State

    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(show, onHide, ref);

    // Render

    return (
        <Modal show={show} >
            <div className="w-full h-full flex flex-row justify-center items-center">
                <div ref={setRef} className={className}>
                    {children}
                </div>
            </div>
        </Modal>
    );

};

Dialog.Header = ({ noBorder = false, className, children }) => (
    <div className={classnames({ 'border-b border-content-border': !noBorder }, className)}>{children}</div>
);

Dialog.Body = ({ className, children }) => (
    <div className={className}>{children}</div>
);

Dialog.Footer = ({ className, children }) => (
    <div className={classnames('border-t border-content-border', className)}>{children}</div>
);
