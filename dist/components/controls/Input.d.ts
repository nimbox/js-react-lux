import React from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
