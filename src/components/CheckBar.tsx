import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';



export interface CheckBarProps {

    value: (string | number)[];
    onChange: (value: (string | number)[]) => void;
    className?: string;

    children?: React.ReactNode;

}

export interface CheckBarOptionProps {

    value: (string | number);
    className?: string;

    children?: React.ReactNode;

}

type ContextProps = Pick<CheckBarProps, 'value' | 'onChange'>;
const Context = createContext<ContextProps>({ value: [], onChange: () => null });

export interface CheckBarComponent extends FC<CheckBarProps> {
    Option: FC<CheckBarOptionProps>;
}

export const CheckBar: CheckBarComponent = ({ value, onChange, className, children }) => (
    <Context.Provider value={{ value, onChange }}>
        <div
            className={classnames(
                'inline-block truncate border border-control-border rounded',
                className
            )}
        >
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
        <div
            onClick={onClick}
            className={classnames(
                'inline-block lux-px-2em',
                'border-control-border border-r last:border-r-0',
                {
                    'text-white bg-primary-500': context.value.indexOf(value) >= 0
                },
                'hover:text-white hover:bg-primary-600',
                'cursor-pointer',
                className)}
        >
            {children}
        </div>
    );

}) as FC<CheckBarOptionProps>;
CheckBar.Option.displayName = 'CheckBar.Option';
