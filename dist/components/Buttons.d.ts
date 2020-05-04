import React, { FC } from 'react';
declare type Size = 'xs' | 'base' | 'xl';
export declare const PrimaryButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: Size;
}>;
export declare const SecondaryButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: Size;
}>;
export declare const LinkButton: FC<React.HTMLAttributes<HTMLSpanElement> & {
    size?: Size;
}>;
export declare const MoreOptionsButton: FC<{
    value: boolean;
    onChange: (value: boolean) => void;
    className?: string;
}>;
export {};
