import classnames from 'classnames';
import React, { FC } from 'react';
import { Modal } from './Modal';


//
// Dialog
//

export interface DialogProps {
    visible: boolean;
    onHide: () => void;
    className: string;
}

export interface DialogComponent extends FC<DialogProps> {
    Header: FC<{ noBorder?: boolean, className?: string }>,
    Body: FC<{ className?: string }>,
    Footer: FC<{ className?: string }>
}

export const Dialog: DialogComponent = ({ visible, onHide, className, children }) => {

    return (
        <Modal visible={visible} onHide={onHide}>
            <div className="w-full h-full flex flex-row justify-center items-center">
                <div className={className}>
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
