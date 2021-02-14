import { FC } from 'react';
import { ComponentSize } from './ComponentSize';
export interface LoadingProps {
    size?: ComponentSize;
    className?: string;
}
export declare const Loading: FC<LoadingProps>;
