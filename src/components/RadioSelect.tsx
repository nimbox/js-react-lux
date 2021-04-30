import classnames from 'classnames';
import React, { createContext, FC, useContext, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { AngleDownIcon } from '../icons';
import { ComponentScale, controlScale, controlText } from './ComponentScale';


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

    const [isVisible, onOutsideClick] = useState(false);
    const [target, popper] = useOutsideClick(() => onOutsideClick(!isVisible));

    return (
        <Context.Provider value={{ scale, value, onChange }}>
            <div className={classnames('relative inline-block', className)}>
                <div ref={target} className={classnames(
                    'relative border border-control-border rounded pr-8 text-right cursor-pointer', 
                    controlScale[scale])}>
                    {label}
                    <div className="absolute top-1/2 right-1 ">
                        < AngleDownIcon className={classnames(
                            'stroke-current stroke-2', {
                            'h-3 w-3 -mt-1.5': scale === 'xs',
                            'h-4 w-4 -mt-2': scale === 'sm',
                            'h-5 w-5 -mt-2.5': scale === 'base',
                            'h-6 w-6 -mt-3': scale === 'lg'
                        })} onClick={(() => onOutsideClick(!isVisible))} />
                    </div>
                </div>
                {isVisible &&
                    <div ref={popper} className={classnames(
                        'absolute bg-white border border-control-border rounded',
                        'right-0 mt-2 overflow-auto')}>
                        {children}
                    </div>}
            </div>
        </Context.Provider>
    );
}) as RadioSelectComponent;

RadioSelect.Option = (({ value, className, children }) => {

    const context = useContext(Context);
    const onClick = () => context.onChange(value);

    return (
        <div onClick={onClick} className={classnames(
            'block',
            controlScale[context.scale ? context.scale : 'base'],
            {
                'text-white bg-primary-500': context.value === value
            }, 
            'hover:text-white hover:bg-primary-600',
            'cursor-pointer', className)}>
            {children}
        </div>
    );

}) as FC<RadioSelectOptionProps>;

RadioSelect.Option.displayName = 'RadioSelect.Option';