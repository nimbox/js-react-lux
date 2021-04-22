import classnames from "classnames";
import { FC, useContext } from "react";
import { paddings, ComponentScale } from "../ComponentSize";
import { Context } from './Control';


interface SelectComponent extends FC<{ scale?: ComponentScale, className?: String }> {
    Option: FC<{ value?: any, className?: string }>;
}

export const Select: SelectComponent = ({ scale, className, children }) => {

    const context = useContext(Context);
    
    return (
        <select className={classnames(
            paddings[scale || context.scale || 'base'],
            'rounded border-control-border focus:border-primary-500 focus:ring focus:ring-primary-500',
            'focus:ring-opacity-50 focus:outline-none', 
            className)} >
            {children}
        </select>
    );
}

Select.Option = ({ value, children }) => (
    <option value={value}>{children}</option>
);