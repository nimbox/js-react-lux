import classnames from 'classnames';
import React, { FC, useContext } from 'react';
import { ComponentScale, scales, scalesSquare } from '../ComponentSize';
import { Context } from './Control';


export interface RadioProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    scale?: ComponentScale;
    error?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({ scale, error, className, children, ...props }, ref) => {

    const context = useContext(Context);

    return (
        <div className="flex flex-row items-center">
            <input type="radio" ref={ref} {...props} className={classnames(
                scalesSquare[scale || context.scale || 'base'],
                'border border-control-border checked:border-control-border text-primary-500',
                'focus:border-primary-500 focus:ring focus:ring-offset-0 focus:ring-primary-500 focus:ring-opacity-50',
                className)}
            />
            <span className={classnames('ml-2', scales[scale || context.scale || 'base'], className)}>{children}</span>
        </div>
    );

});