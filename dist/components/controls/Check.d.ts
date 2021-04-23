import React, { FC } from 'react';
import { ComponentScale } from '../ComponentSize';
export interface CheckProps {
    scale?: ComponentScale;
    className?: string;
}
export declare const Check: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & CheckProps>;
