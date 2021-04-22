import classnames from 'classnames';
import React, { createContext, FC, useContext, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { ComponentScale } from './ComponentSize';


export interface RadioSelectProps {
    scale?: ComponentScale;
    value: any;
    label: string;
    onChange: (value: any) => void;
    className?: string;
}

export interface RadioSelectOptionProps {
    value: any;
    className?: string;
}

type ContextProps = Pick<RadioSelectProps, 'scale' | 'value' | 'onChange'>;
const Context = createContext<ContextProps>({ scale: 'base', value: [], onChange: () => [] });

interface RadioSelectComponent extends FC<RadioSelectProps> {
    Option: FC<RadioSelectOptionProps>;
}

export const RadioSelect: RadioSelectComponent = (({ scale = 'base', value, label, onChange, className, children }) => {

    const [isVisible, onOutsideClick] = useState(true);
    const [target, popper] = useOutsideClick(() => onOutsideClick(!isVisible));

    return (
        <Context.Provider value={{ scale, value, onChange }}>
            <div className={classnames('relative inline-block', className)}>
                <div ref={target} className={classnames('px-2 py-0 border border-primary-700 rounded cursor-pointer', {
                    'text-xs': scale === 'sm',
                    'text-base': scale === 'base',
                    'text-lg': scale === 'lg',
                })} onClick={(() => { onOutsideClick(!isVisible) })}>
                    {label}
                </div>
                {isVisible &&
                    <div ref={popper} className={classnames('absolute right-0 overflow-auto mt-2 bg-white border border-primary-700 rounded divide-y divide-primary-700 ')}>
                        {children}
                    </div>}
            </div>
        </Context.Provider>
    );
});

RadioSelect.Option = (({ value, className, children }) => {

    const context = useContext(Context);
    const onClick = () => context.onChange(value);

    return (
        <div onClick={onClick} className={classnames('block px-2 py-0',
            {
                'text-xs': context.scale === 'sm',
                'text-base': context.scale === 'base',
                'text-lg': context.scale === 'lg',
            },
            {
                'text-white bg-primary-500': context.value === value
            }, 'cursor-pointer', className)}>
            {children}
        </div>
    );

}) as FC<RadioSelectOptionProps>;

RadioSelect.Option.displayName = 'RadioSelect.Option';