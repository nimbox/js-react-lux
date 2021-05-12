import classnames from 'classnames';
import React, { createContext, FC, useContext, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { AngleDownIcon } from '../../icons';
import { Context as controlContext } from './Control';
import { ComponentScale, controlIconSmallMarginSize, controlScale } from '../ComponentScale';
import { ComponentAlign } from '../ComponentAlign';


export interface CustomMultiSelectProps {
    scale?: ComponentScale;
    label: (t: any) => string;
    value: any[];
    onChange: (value: any) => void;
    align: ComponentAlign;
    className?: string;
}

export interface CustomMultiSelectContentProps {
    value: any;
    className?: string;
}

type ContextProps = Pick<CustomMultiSelectProps, 'scale' | 'value' | 'onChange'>;
const Context = createContext<ContextProps>({ scale: 'base', value: [], onChange: () => [] });

interface CustomMultiSelectComponent extends FC<CustomMultiSelectProps> {
    Option: FC<CustomMultiSelectContentProps>;
}

export const CustomMultiSelect: CustomMultiSelectComponent = (({ scale = 'base', label, value, onChange, align, className, children }) => {

    const context = useContext(controlContext);
    const [isVisible, onOutsideClick] = useState(false);
    const [target, popper] = useOutsideClick(() => onOutsideClick(!isVisible));

    return (
        <Context.Provider value={{ scale, value, onChange }}>
            <div className={classnames('relative inline-block w-full', className)}>
                <div ref={target} tabIndex={0} className={classnames(
                    'relative border border-control-border rounded',
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:outline-none',
                    'px-2 py-0 pr-8 truncate cursor-pointer',
                    controlScale[scale])} onClick={(() => onOutsideClick(!isVisible))}>
                    {label(value) || <span>&nbsp;</span>}
                    <div className="absolute top-1/2 right-1 ">
                        < AngleDownIcon className={classnames(
                            'stroke-current stroke-2',
                            controlIconSmallMarginSize[scale || context.scale || 'base'])} />
                    </div>
                </div>
                {isVisible && React.Children.count(children) != 0 &&
                    <div ref={popper} className={classnames(
                        'absolute bg-white border border-control-border rounded',
                        {
                            'left-0': align === 'start',
                            'right-0': align === 'end',
                            'inset-x-0 truncate': align === 'stretch'
                        },
                        'mt-2 overflow-auto')}>
                        {children}
                    </div>
                }
                {isVisible && React.Children.count(children) == 0 &&
                    <div className="w-absolute bg-white border border-control-border rounded inset-x-0 mt-2">&nbsp;</div>
                }
            </div>
        </Context.Provider>
    );
}) as CustomMultiSelectComponent;


CustomMultiSelect.Option = (({ value, className, children }) => {

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
            controlScale[context.scale ? context.scale : 'base'],
            {
                'text-white bg-primary-500': context.value.indexOf(value) >= 0
            },
            'hover:text-white hover:bg-primary-600',
            'cursor-pointer', className)}>
            {children}
        </div>
    );

}) as FC<CustomMultiSelectContentProps>;

CustomMultiSelect.Option.displayName = 'CustomMultiSelect.Option';