import classnames from 'classnames';
import React, { useContext } from 'react';
import { Context } from './Control';


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ error, className, ...props }, ref) => {

    const context = useContext(Context);

    return (
        <input {...props} ref={ref} className={classnames(
            'block w-full',
            'lux-control-font lux-control-padding',
            'rounded border border-control-border',
            error || context.error ?
                'text-danger-500 border-danger-500 focus:border-danger-500 focus:ring-danger-500 placeholder-danger-500' :
                'focus:border-primary-500 focus:ring-primary-500 placeholder-control-border',
            'focus:ring focus:ring-opacity-50 focus:outline-none',
            'placeholder-opacity-40',
            'disabled:opacity-50',
            className)}
        />
    );

});
