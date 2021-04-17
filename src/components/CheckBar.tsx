import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';
import { ComponentSize, paddings } from './ComponentSize';


export interface CheckBarProps {
    size: ComponentSize;
    value: any[];
    onChange: (value: any) => void;
    className?: string;
}

export interface CheckBarOptionProps {
    value: any;
    className?: string;
}

type ContextProps = Pick<CheckBarProps, 'size' | 'value' | 'onChange'>;
const Context = createContext<ContextProps>({ size: 'base', value: [], onChange: () => null });

export interface CheckBarComponent extends FC<CheckBarProps> {
    Option: FC<CheckBarOptionProps>;
}

export const CheckBar: CheckBarComponent = ({ size = 'base', value, onChange, className, children }) => (
    <Context.Provider value={{ size, value, onChange }}>
        <div className={classnames('inline-block', 'overflow-hidden',
            { 'text-xs': size === 'xs', 'text-sm': size === 'sm', 'text-base': size === 'base', 'text-lg': size === 'lg' },
            'border border-control-border rounded', className)}>
            {children}
        </div>
    </Context.Provider>
);

CheckBar.Option = (({ value, className, children }) => {

    const context = useContext(Context);
    const onClick = () => {
        const i = context.value.indexOf(value);
        if (i < 0) {
            context.onChange([...context.value, value]);
        } else {
            context.onChange([...context.value.slice(0, i), ...context.value.slice(i + 1)]);
        }
    };

    return (
        <div onClick={onClick} className={classnames(
            'inline-block',
            paddings[context.size],
            'border-control-border border-r last:border-r-0',
            { 'text-white bg-primary-500': context.value.indexOf(value) >= 0 },
            'hover:text-white hover:bg-primary-600',
            'cursor-pointer', className)}>
            {children}
        </div>
    );

}) as FC<CheckBarOptionProps>;
CheckBar.Option.displayName = 'CheckBar.Option';
