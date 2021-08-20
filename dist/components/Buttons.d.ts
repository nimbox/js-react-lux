import React, { FC, ReactNode } from 'react';
import { ComponentColor } from './ComponentColor';
import { ComponentScale } from './ComponentScale';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'primary' | 'secondary' | 'muted';
    variant?: 'filled' | 'text' | 'outlined' | 'link';
    start?: ReactNode;
    end?: ReactNode;
    className?: string;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface RoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    scale?: ComponentScale;
    color?: ComponentColor;
}
export declare const RoundButton: FC<RoundButtonProps>;
export interface MoreOptionsButtonProps {
    scale?: ComponentScale;
    value: boolean;
    onChange: (value: boolean) => void;
    className?: string;
}
export declare const MoreOptionsButton: FC<MoreOptionsButtonProps>;
