import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';
import { ComponentSize } from './ComponentSize';


export interface CheckboxBarProps {
    size?: ComponentSize;
    value: any[];
    onChange: (value: any) => void;
    className?: string;
}

export interface CheckboxBarOptionProps {
    value: any;
    className?: string;
}

type ContextProps = Pick<CheckboxBarProps, 'size' | 'value' | 'onChange'>;
const Context = createContext<ContextProps>({ size: 'base', value: [], onChange: () => [] });

interface CheckboxBarComponent extends FC<CheckboxBarProps> {
    Option: FC<CheckboxBarOptionProps>;
}

export const CheckboxBar: CheckboxBarComponent = ({ size = 'base', value, onChange, className, children }) => (
    <Context.Provider value={{ size, value, onChange }}>
        <div className={classnames('inline-block border border-primary-700 rounded text-xs', className)}>
            {children}
        </div>
    </Context.Provider>
);

CheckboxBar.Option = (({ value, className, children }) => {
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
            'inline-block px-2 py-0 border-primary-700 border-r last:border-r-0',
            {
                'text-xs': context.size === 'sm',
                'text-base': context.size === 'base',
                'text-lg': context.size === 'lg',
            },
            {
                'text-white bg-primary-500': context.value.indexOf(value) >= 0
            }, 'cursor-pointer', className)}>
            {children}
        </div>
    );
}) as FC<CheckboxBarOptionProps>;
CheckboxBar.Option.displayName = 'CheckboxBar.Option';