import { default as classnames, default as classNames } from 'classnames';
import React from 'react';
import { ComponentScale } from '../ComponentScale';
import { Input } from './Input';


export interface IconInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    left?: React.ComponentType<any>;
    right?: React.ReactNode;
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
}

export const IconInput = React.forwardRef(({ left, right, scale, error, className, ...props }, ref) => {
    return (
        <div className={classNames('relative',
            className)}>
            <Input ref={ref} scale={scale} className={classnames({ 'pl-9': left, 'pr-9': right })}  {...props} />
            {left &&
                <div className="absolute inset-y-0 left-0 flex flex-row justify-center items-center" style={{ width: '2em' }}>
                    {left}
                </div>
            }
            {right &&
                <div className="absolute inset-y-0 right-0 flex flex-row justify-center items-center" style={{ width: '2em' }}>
                    {right}
                </div>
            }
        </div>
    );

}) as React.ForwardRefExoticComponent<React.PropsWithoutRef<IconInputProps> & React.RefAttributes<HTMLInputElement>>;
