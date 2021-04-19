import classnames from 'classnames';
import React, { FC } from 'react';
import { ComponentSize, paddings } from './ComponentSize';


export interface InputProps {
    inputSize: ComponentSize;
    error?: boolean;
    className?: string;
}

export const Input: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & InputProps> =
    ({ error = false, inputSize = 'base', className, ...props }) => {
        return (
            <input {...props} className={classnames(
                paddings[inputSize],
                "form-input mt-1 block w-full rounded border border-control-border",
                { 'border-danger-500': error },
                "focus:border-control-border focus:ring focus:ring-gray-200 focus:ring-opacity-50", className)}
                placeholder=""
            />)
    };
