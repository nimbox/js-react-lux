import { FC } from 'react';
import { ComponentSize } from './ComponentSize';
export interface TagProps {
    size?: ComponentSize;
    onClick?: (value: any) => void;
    onDelete?: (value: any) => void;
    className?: string;
}
export declare const Tag: FC<TagProps>;
