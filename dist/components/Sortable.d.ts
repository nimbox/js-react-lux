import { FC } from 'react';
import { ComponentScale } from './ComponentScale';
export interface SortableProps {
    onChange: (dragIndex: number, hoverIndex: number) => void;
    scale?: ComponentScale;
}
interface DraggableItemProps {
    index: number;
    scale?: ComponentScale;
    onChange: (dragIndex: number, hoverIndex: number) => void;
}
export declare const DraggableItem: FC<DraggableItemProps>;
export declare const Sortable: FC<SortableProps>;
export {};
