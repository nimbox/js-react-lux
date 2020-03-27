import React, { FC } from 'react';
export declare const ButtonBar: FC<{
    className?: string;
}>;
export declare const PrimaryButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;
export declare const SecondaryButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;
export declare const LinkButton: FC<React.HTMLAttributes<HTMLSpanElement>>;
export declare const MoreOptionsButton: FC<{
    value: boolean;
    onChange: (value: boolean) => void;
}>;
