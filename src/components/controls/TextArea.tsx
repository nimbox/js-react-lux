import classnames from 'classnames';
import React, { FC, useContext } from 'react';
import { ComponentScale, paddings } from '../ComponentSize';
import { Context } from './Control';


export interface Props {
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
}

export const TextArea: FC<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & Props> =
    ({ error, scale, className, ...props }) => {

        const context = useContext(Context);
        
        return (
            <textarea {...props} className={classnames(
                paddings[scale || context.scale || 'base'],
                'block form-input w-full rounded border border-control-border',
                error || context.error ? 
                    'border-danger-500 focus:border-danger-500 focus:ring focus:ring-danger-500' : 
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:outline-none',
                className)}
            />
        );

    };
