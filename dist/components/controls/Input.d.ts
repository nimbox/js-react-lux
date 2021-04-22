import React, { FC } from 'react';
import { ComponentScale } from '../ComponentSize';
export interface InputProps {
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
}
export declare const Input: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & InputProps>;
