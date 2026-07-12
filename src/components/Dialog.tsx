import { FloatingFocusManager, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react';
import classNames from 'classnames';
import React, { type FC } from 'react';
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

    // Drive open/close, dismissal and accessibility through floating-ui so the
    // dialog gets `role="dialog"`, Escape-to-close, outside-press-to-close, a
    // focus trap and focus restoration without hand-rolling any of it.

    const { refs, context } = useFloating({
        open: show,
        onOpenChange: (open) => { if (!open) { onHide(); } }
    });

    const dismiss = useDismiss(context, { outsidePress: true, escapeKey: true });
    const role = useRole(context, { role: 'dialog' });
    const { getFloatingProps } = useInteractions([dismiss, role]);

    // Render

    return (
        <Modal show={show}>
            <FloatingFocusManager context={context} modal>
                <div className="w-full h-full flex flex-row justify-center items-center">
                    <div
                        ref={refs.setFloating}
                        aria-modal="true"
                        className={className}
                        {...getFloatingProps()}
                    >
                        {children}
                    </div>
                </div>
            </FloatingFocusManager>
        </Modal>
    );

};

Dialog.Header = ({ noBorder = false, className, children }) => (
    <div className={classNames({ 'border-b border-content-border': !noBorder }, className)}>{children}</div>
);

Dialog.Body = ({ className, children }) => (
    <div className={className}>{children}</div>
);

Dialog.Footer = ({ className, children }) => (
    <div className={classNames('border-t border-content-border', className)}>{children}</div>
);
