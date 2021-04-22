import classnames from 'classnames';
import React, { FC, useContext } from 'react';
import { ComponentScale, paddings } from '../ComponentSize';
import { Context } from './Control';


export interface InputProps {
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
}

export const Input: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & InputProps> =
    ({ scale, error, className, ...props }) => {

        const context = useContext(Context);

        return (
            <input {...props} className={classnames(
                paddings[scale || context.scale || 'base'],
                'block w-full rounded border border-control-border',
                error || context.error ?
                    'border-danger-500 focus:border-danger-500 focus:ring focus:ring-danger-500' :
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                'focus:ring-opacity-50 focus:outline-none',
                className)}
            />
        );

    };
