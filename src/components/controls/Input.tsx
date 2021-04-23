import classnames from 'classnames';
import React, { useContext } from 'react';
import { ComponentScale, controlScale } from '../ComponentScale';
import { Context } from './Control';


export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    scale?: ComponentScale;
    error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ error, scale, className, ...props }, ref) => {

    const context = useContext(Context);

    return (
        <input {...props} ref={ref} className={classnames(
            controlScale[scale || context.scale || 'base'],
            'block w-full rounded border border-control-border',
            error || context.error ?
                'border-danger-500 focus:border-danger-500 focus:ring focus:ring-danger-500' :
                'focus:border-primary-500 focus:ring focus:ring-primary-500',
            'focus:ring-opacity-50 focus:outline-none',
            className)}
        />
    );

});
