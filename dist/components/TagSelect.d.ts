import { FC } from 'react';
import { ComponentSize } from './ComponentSize';
export interface TagSelectProps {
    size?: ComponentSize;
    tags: any[];
    className?: string;
    onDelete?: (value: any) => void;
    onSearch: (value: any) => any[];
    onSelect: (value: any) => void;
    onCreate: (value: any) => void;
}
export declare const TagSelect: FC<TagSelectProps>;
