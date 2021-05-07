import { FC } from 'react';
import { ComponentScale } from './ComponentScale';
export interface LoadingProps {
    scale?: ComponentScale;
    className?: string;
    colorClassName?: string;
}
export declare const Loading: FC<LoadingProps>;
