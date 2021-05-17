import { FC } from 'react';
export interface ContactElementListProps {
    values: any[];
    onChange: (dragIndex: number, hoverIndex: number) => void;
    renderList: (values: any[], onChange: (dragIndex: number, hoverIndex: number) => void, isDraggable: boolean) => JSX.Element[];
    isDraggable: boolean;
    className?: string;
}
export declare const ContactElementList: FC<ContactElementListProps>;
