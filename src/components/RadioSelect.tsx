import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import { ComponentSize } from './ComponentSize';



export interface RadioSelectProps {
    size?: ComponentSize;
    value: any;
    label: String;
    onChange: (value: any) => void;
    className?: string;
}

export interface RadioSelectOptionProps {
    value: any;
    className?: string;
}

type ContextProps = Pick<RadioSelectProps, 'size' | 'value' | 'onChange'>;
const Context = createContext<ContextProps>({ size: 'base', value: [], onChange: () => [] });

interface RadioSelectComponent extends FC<RadioSelectProps> {
    Option: FC<RadioSelectOptionProps>;
}

export const RadioSelect: RadioSelectComponent = (({ size = 'base', value, label, onChange, className, children }) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useOutsideClick(true);
    return(
        <Context.Provider value={{ size, value, onChange }}>
            <div ref={ref} className={classnames('relative inline-block', className)}>            
                    <div className={classnames('px-2 py-0 border border-primary-700 rounded cursor-pointer',{
                    'text-xs': size === 'sm',
                    'text-base': size === 'base',
                    'text-lg': size === 'lg',
                    })} onClick={(() => {  setIsComponentVisible(!isComponentVisible) })}>
                        {label}
                </div>
                {isComponentVisible &&  <div className={classnames('absolute right-0 overflow-auto mt-2 bg-white border border-primary-700 rounded divide-y divide-primary-700 ')}> 
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
}) as FC<RadioSelectOptionProps>;
RadioSelect.Option.displayName = 'RadioSelect.Option';