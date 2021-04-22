import classnames from 'classnames';
import React, { FC, useContext } from 'react';
import { ComponentScale, scales, scalesSquare } from '../ComponentSize';
import { Context } from './Control';


export interface CheckBoxProps {
    scale?: ComponentScale;
    className?: string;
}

export const CheckBox: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & CheckBoxProps> =
    ({ scale, className, children, ...props }) => {

        const context = useContext(Context);

        return (
            <div className="flex flex-row items-center">
                <input type="checkbox" {...props} className={classnames(
                    scalesSquare[scale || context.scale || 'base'],
                    'rounded border border-control-border checked:border-control-border text-primary-500',
                    'focus:border-primary-500 focus:ring focus:ring-offset-0 focus:ring-primary-500 focus:ring-opacity-50',
                    className)}
                />
                <span className={classnames('ml-2', scales[scale || context.scale || 'base'], className)}>{children}</span>
            </div>
        );

    };