import React, { FC } from 'react';
import { ComponentScale } from '../ComponentSize';
export interface Props {
    scale?: ComponentScale;
    className?: string;
}
export declare const Checkbox: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & Props>;
