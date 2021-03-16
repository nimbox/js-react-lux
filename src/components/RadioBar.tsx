import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';
import { ComponentSize } from './ComponentSize';



export interface RadioBarProps {
    size?: ComponentSize;
    value: any;
    onChange: (value: any) => void;
    className?: string;
}

export interface RadioBarOptionProps {
    value: any;
    className?: string;
}

type ContextProps = Pick<RadioBarProps, 'size' | 'value' | 'onChange'>;
const Context = createContext<ContextProps>({ size: 'base', value: [], onChange: () => [] });

interface RadioBarComponent extends FC<RadioBarProps> {
    Option: FC<RadioBarOptionProps>;
}

export const RadioBar: RadioBarComponent = ({ size = 'base', value, onChange, className, children }) => (
    <Context.Provider value={{ size, value, onChange }}>
        <div className={classnames('inline-block border border-primary-700 rounded text-xs', className)}>
            {children}
        </div>
    </Context.Provider>
);

RadioBar.Option = (({ value, className, children }) => {
    const context = useContext(Context);
    const onClick = () => context.onChange(value);
    return (
        <div onClick={onClick} className={classnames('inline-block px-2 py-0 border-primary-700 border-r last:border-r-0',
            {
                'text-xs': context.size === 'sm',
                'text-base': context.size === 'base',
                'text-lg': context.size === 'lg',
            }, 
            { 
                'text-white bg-primary-500': context.value === value 
            }, 'cursor-pointer', className)}>
            {children}
        </div>
    );
}) as FC<RadioBarOptionProps>;
RadioBar.Option.displayName = 'RadioBar.Option';