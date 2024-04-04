import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';
import type { ReactNode } from 'react';


export interface RadioBarProps {
    value: string | number;
    onChange: (value: string | number) => void;
    className?: string;
    children?: ReactNode;
}

export interface RadioBarOptionProps {
    value: string | number;
    className?: string;
    children?: React.ReactNode;
}

type ContextProps = Pick<RadioBarProps, 'value' | 'onChange'>;
const Context = createContext<ContextProps>({ value: [], onChange: () => null });

export interface RadioBarComponent extends FC<RadioBarProps> {
    Option: FC<RadioBarOptionProps>;
}

export const RadioBar: RadioBarComponent = ({ value, onChange, className, children }) => (
    <Context.Provider value={{ value, onChange }}>
        <div
            className={classnames(
                'max-w-full inline-flex flex-row border border-control-border rounded',
                className)}
        >
            {children}
        </div>
    </Context.Provider>
);

RadioBar.Option = (({ value, className, children }) => {

    const context = useContext(Context);
    const onClick = () => context.onChange(value);

    return (
        <div
            onClick={onClick}
            className={classnames(
                'min-w-0 flex-auto lux-px-2em',
                'border-control-border border-r last:border-r-0',
                {
                    'text-white bg-primary-500': context.value === value
                },
                'hover:text-white hover:bg-primary-600',
                'truncate',
                'cursor-pointer',
                className)}
        >
            {children}
        </div>
    );

}) as FC<RadioBarOptionProps>;
RadioBar.Option.displayName = 'RadioBar.Option';
