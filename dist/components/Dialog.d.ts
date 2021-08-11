import { FC } from 'react';
export interface DialogProps {
    visible: boolean;
    onHide: () => void;
    className: string;
}
export interface DialogComponent extends FC<DialogProps> {
    Header: FC<{
        noBorder?: boolean;
        className?: string;
    }>;
    Body: FC<{
        className?: string;
    }>;
    Footer: FC<{
        className?: string;
    }>;
}
export declare const Dialog: DialogComponent;
