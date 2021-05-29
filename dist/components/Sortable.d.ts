import { FC } from 'react';
import { ComponentScale } from './ComponentScale';
export interface SortableProps {
    onChange: (dragIndex: number, hoverIndex: number) => void;
    scale?: ComponentScale;
}
export declare const Sortable: FC<SortableProps>;
