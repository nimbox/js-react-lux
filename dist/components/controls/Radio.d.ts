import React, { FC } from 'react';
import { ComponentScale } from '../ComponentSize';
export interface RadioProps {
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
}
export declare const Radio: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & RadioProps>;
