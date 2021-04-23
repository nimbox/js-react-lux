import classnames from 'classnames';
import React, { createContext, FC, useContext, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { ComponentScale } from './ComponentSize';


export interface CheckSelectProps {
    scale?: ComponentScale;
    label: string;
    value: any[];
    onChange: (value: any) => void;
    className?: string;
}

export interface CheckSelectContentProps {
    value: any;
    className?: string;
}

type ContextProps = Pick<CheckSelectProps, 'scale' | 'value' | 'onChange'>;
const Context = createContext<ContextProps>({ scale: 'base', value: [], onChange: () => [] });

interface CheckSelectComponent extends FC<CheckSelectProps> {
    Option: FC<CheckSelectContentProps>;
}

export const CheckSelect: CheckSelectComponent = (({ scale = 'base', label, value, onChange, className, children }) => {

    const [isVisible, onOutsideClick] = useState(true);
    const [target, popper] = useOutsideClick(() => onOutsideClick(!isVisible));

    return (
        <Context.Provider value={{ scale, value, onChange }}>
            <div className={classnames('relative inline-block', className)}>
                <div ref={target} className={classnames('px-2 py-0 border border-primary-700 rounded cursor-pointer truncate', {
                    'text-xs': scale === 'sm',
                    'text-base': scale === 'base',
                    'text-lg': scale === 'lg',
                })} onClick={(() => { onOutsideClick(!isVisible) })}>
                    {label}
                </div>
                {isVisible &&
                    <div ref={popper} className={classnames('absolute right-0 max-h-48 overflow-auto mt-2 bg-white border border-primary-700 rounded divide-y divide-primary-700')}>
                        {children}
                    </div>
                }
            </div>
        </Context.Provider>
    );
});


CheckSelect.Option = (({ value, className, children }) => {

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
                'text-xs': context.scale === 'sm',
                'text-base': context.scale === 'base',
                'text-lg': context.scale === 'lg',
            },
            {
                'text-white bg-primary-500': context.value.indexOf(value) >= 0
            }, 'cursor-pointer', className)}>
            {children}
        </div>
    );

}) as FC<CheckSelectContentProps>;

CheckSelect.Option.displayName = 'CheckSelect.Option';