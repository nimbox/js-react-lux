import classnames from 'classnames';
import React, { FC, useContext } from 'react';
import { ComponentScale, controlScale } from '../ComponentScale';
import { Context } from './Control';


export interface SelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    scale?: ComponentScale;
}

export interface SelectSubComponents {
    Option: FC<{ value?: any, className?: string }>;
}

export const Select = React.forwardRef(
    ({ scale, className, children, ...props }, ref) => {

        const context = useContext(Context);

        return (
            <select {...props} ref={ref} className={classnames(
                controlScale[scale || context.scale || 'base'],
                'block w-full rounded border border-control-border',
                'focus:border-primary-500 focus:ring focus:ring-primary-500',
                'focus:ring-opacity-50 focus:outline-none',
                className)} >
                {children}
            </select>
        );

    }
) as React.ForwardRefExoticComponent<React.PropsWithoutRef<SelectProps> & React.RefAttributes<HTMLSelectElement>> & SelectSubComponents;

Select.Option = ({ value, children }) => (
    <option value={value}>{children}</option>
);
