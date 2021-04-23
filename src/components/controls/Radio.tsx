import classnames from 'classnames';
import React, { FC, useContext } from 'react';
import { ComponentScale, controlText, controlSize, controlScale } from '../ComponentScale';
import { Context } from './Control';


export interface RadioProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    scale?: ComponentScale;
    error?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({ scale, error, className, children, ...props }, ref) => {

    const context = useContext(Context);

    return children ? 
        (
        <div className="flex flex-row items-center">
            <input type="radio" ref={ref} {...props} className={classnames(className,
                controlSize[scale || context.scale || 'base'],
                'border border-control-border checked:border-control-border text-primary-500',
                'focus:border-primary-500 focus:ring focus:ring-offset-0 focus:ring-primary-500 focus:ring-opacity-50')}
            />
            <span className={classnames('ml-2', controlText[scale || context.scale || 'base'], className)}>{children}</span>
        </div>
        )
        :
        (
        <input type="radio" ref={ref} {...props} className={classnames(className,
            controlSize[scale || context.scale || 'base'],
            'border border-control-border checked:border-control-border text-primary-500',
            'focus:border-primary-500 focus:ring focus:ring-offset-0 focus:ring-primary-500 focus:ring-opacity-50')}
        />
        )

});