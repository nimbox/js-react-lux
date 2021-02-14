import React, { FC } from 'react';
import { ComponentSize } from './ComponentSize';
export interface ButtonProps {
    link?: boolean;
    secondary?: boolean;
    size?: ComponentSize;
}
export declare const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps>;
export interface MoreOptionsButtonProps {
    size?: ComponentSize;
    value: boolean;
    onChange: (value: boolean) => void;
}
export declare const MoreOptionsButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & MoreOptionsButtonProps>;
