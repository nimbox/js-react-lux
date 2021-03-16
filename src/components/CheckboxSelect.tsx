import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import { ComponentSize } from './ComponentSize';


export interface CheckboxSelectProps {
    size?: ComponentSize;
    label: string;
    value: any[];
    onChange: (value: any) => void;
    className?: string;
}

export interface CheckboxSelectContentProps {
    value: any;
    className?: string;
}

type ContextProps = Pick<CheckboxSelectProps, 'size' | 'value' | 'onChange' >;
const Context = createContext<ContextProps>({ size: 'base', value: [], onChange: () => []});

interface CheckboxSelectComponent extends FC<CheckboxSelectProps> {
    Option: FC<CheckboxSelectContentProps>;
}

export const CheckboxSelect: CheckboxSelectComponent = (({ size = 'base', label, value, onChange, className, children }) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useOutsideClick(true);
    return (
        <Context.Provider value={{ size, value,  onChange}}>
            <div ref={ref} className={classnames('relative inline-block', className)}> 
                <div className={classnames('px-2 py-0 border border-primary-700 rounded cursor-pointer truncate',{
                'text-xs': size === 'sm',
                'text-base': size === 'base',
                'text-lg': size === 'lg',
                })} onClick={(() => {  setIsComponentVisible(!isComponentVisible) })}>
                    {label}
            </div>
            { isComponentVisible &&  <div className={classnames('absolute right-0 max-h-48 overflow-auto mt-2 bg-white border border-primary-700 rounded divide-y divide-primary-700')}> 
                    {children} 
                </div> }
            </div>
        </Context.Provider>
    );
});


CheckboxSelect.Option = (({ value, className, children }) => {
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
            'px-2 py-0',
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
}) as FC<CheckboxSelectContentProps>;
CheckboxSelect.Option.displayName = 'CheckboxSelect.Option';