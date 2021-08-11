import { FC } from 'react';
export interface ModalProps {
    visible: boolean;
    onHide: () => void;
}
export declare const Modal: FC<ModalProps>;
