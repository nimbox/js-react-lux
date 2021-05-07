import { FC } from 'react';
import { ComponentScale } from './ComponentScale';
export interface TagProps {
    scale?: ComponentScale;
    color?: string;
    onClick?: (value: any) => void;
    onDelete?: (value: any) => void;
    className?: string;
}
export declare const Tag: FC<TagProps>;
