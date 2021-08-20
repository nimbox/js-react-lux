import { FC } from 'react';
export interface CheckButtonProps {
    onFulfill: () => void;
    onReject: () => void;
    'data-tooltip'?: string;
    'data-tooltip-fulfill'?: string;
    'data-tooltip-reject'?: string;
    children?: never;
}
export declare const CheckButton: FC<CheckButtonProps>;
