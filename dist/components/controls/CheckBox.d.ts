import React, { FC } from 'react';
import { ComponentScale } from '../ComponentScale';
export interface CheckBoxProps {
    scale?: ComponentScale;
    className?: string;
}
export declare const CheckBox: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & CheckBoxProps>;
