import React, { FC } from 'react';
import { ComponentScale } from '../ComponentSize';
export interface Props {
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
}
export declare const Radio: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & Props>;
