import { FC } from 'react';
import { ComponentScale } from './ComponentSize';
export interface LoadingProps {
    scale?: ComponentScale;
    className?: string;
}
export declare const Loading: FC<LoadingProps>;
