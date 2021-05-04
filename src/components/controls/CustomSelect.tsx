import classnames from 'classnames';
import React, { createContext, FC, useContext, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { AngleDownIcon } from '../../icons';
import { Context as controlContext } from './Control';
import { ComponentScale, controlIconSmallMarginSize, controlScale } from '../ComponentScale';
import { ComponentAlign } from '../ComponentAlign'


export interface RadioSelectProps {
    scale?: ComponentScale;
    value: any;
    label: (t: any) => string | JSX.Element;
    onChange: (value: any) => void;
    align: ComponentAlign;
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

export const CustomSelect: RadioSelectComponent = (({ scale = 'base', value, label, onChange, align, className, children }) => {

    const context = useContext(controlContext);
    const [isVisible, onOutsideClick] = useState(false);
    const [target, popper] = useOutsideClick(() => onOutsideClick(!isVisible));

    return (
        <Context.Provider value={{ scale, value, onChange }}>
            <div className={classnames('relative inline-block', className)}>
                <div ref={target} className={classnames(
                    'relative border border-control-border rounded pr-8 text-right truncate cursor-pointer',
                    controlScale[scale])} onClick={(() => onOutsideClick(!isVisible))}>
                    {label(value)}
                    <div className="absolute top-1/2 right-1">
                        < AngleDownIcon className={classnames(
                            'stroke-current stroke-2',
                            controlIconSmallMarginSize[scale || context.scale || 'base'])} />
                    </div>
                </div>
                {isVisible &&
                    <div ref={popper} className={classnames(
                        'absolute bg-white border border-control-border rounded',
                        {
                            'left-0': align === 'start',
                            'right-0': align === 'end',
                            'inset-x-0 truncate': align === 'stretch'
                        },
                        'mt-2')}>
                        {children}
                    </div>}
            </div>
        </Context.Provider>
    );
}) as RadioSelectComponent;

CustomSelect.Option = (({ value, className, children }) => {

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

CustomSelect.Option.displayName = 'CustomSelect.Option';