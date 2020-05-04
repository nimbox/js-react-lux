import React, { FC } from 'react';
export interface LuxInput {
    error?: boolean;
}
export declare const Group: FC<{
    className?: string;
}>;
export declare const Label: FC<{}>;
export declare const Input: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & LuxInput>;
export declare const TextArea: FC<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & LuxInput>;
export declare const SearchInput: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & LuxInput>;
export declare const Error: FC<{
    error: boolean;
    className?: string;
}>;
export declare const Checkbox: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & LuxInput>;
export declare const Radio: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & LuxInput>;
interface SelectProps {
    value: string;
    onChange: (value: string) => void;
}
interface SelectComponent extends FC<{
    className?: String;
} & SelectProps> {
    Option: FC<{
        value?: any;
        className?: string;
    }>;
}
export declare const Select: SelectComponent;
export {};
