import React, { FC } from 'react';
import { ComponentScale } from './ComponentScale';
import { ComponentColor } from './ComponentColor';
export interface ButtonProps {
    link?: boolean;
    secondary?: boolean;
    scale?: ComponentScale;
}
export declare const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps>;
export interface RoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    scale?: ComponentScale;
    color?: ComponentColor;
}
export declare const RoundButton: FC<RoundButtonProps>;
export interface MoreOptionsButtonProps {
    scale?: ComponentScale;
    value: boolean;
    onChange: (value: boolean) => void;
}
export declare const MoreOptionsButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & MoreOptionsButtonProps>;
