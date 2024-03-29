import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';
import { ComponentScale, controlScale, controlText } from './ComponentScale';



export interface RadioBarProps {
    scale?: ComponentScale;
    value: any;
    onChange: (value: any) => void;
    className?: string;
}

export interface RadioBarOptionProps {
    value: any;
    className?: string;
}

type ContextProps = Pick<RadioBarProps, 'scale' | 'value' | 'onChange'>;
const Context = createContext<ContextProps>({ scale: 'base', value: [], onChange: () => null });

export interface RadioBarComponent extends FC<RadioBarProps> {
    Option: FC<RadioBarOptionProps>;
}

export const RadioBar: RadioBarComponent = ({ scale = 'base', value, onChange, className, children }) => (
    <Context.Provider value={{ scale, value, onChange }}>
        <div className={classnames(
            controlText[scale],
            'inline-block truncate',
            'border border-control-border rounded', 
            className)}>
            {children}
        </div>
    </Context.Provider>
);

RadioBar.Option = (({ value, className, children }) => {

    const context = useContext(Context);
    const onClick = () => context.onChange(value);

    return (
        <div onClick={onClick} className={classnames(
            'inline-block', 
            controlScale[context.scale!],
            'border-control-border border-r last:border-r-0',
            { 
                'text-white bg-primary-500': context.value === value 
            },
            'hover:text-white hover:bg-primary-600',
            'cursor-pointer', className)}>
            {children}
        </div>
    );

}) as FC<RadioBarOptionProps>;
RadioBar.Option.displayName = 'RadioBar.Option';
