import { FC } from 'react';
import { ComponentScale } from './ComponentScale';
export interface SortableProps {
    scale?: ComponentScale;
    onChange: (source: number, target: number) => void;
    className?: string;
}
export declare const Sortable: FC<SortableProps>;
