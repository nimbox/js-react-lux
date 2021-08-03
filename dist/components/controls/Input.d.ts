import React from 'react';
import { ComponentScale } from '../ComponentScale';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    scale?: ComponentScale;
    error?: boolean;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
