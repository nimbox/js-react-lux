import classnames from 'classnames';
import React, { createContext, FC, LegacyRef, useContext, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { AngleDownIcon } from '../../icons/components';
import { ComponentAlign } from '../ComponentAlign';


export interface CustomSelectProps {
    value: any;
    label: (t: any) => string | JSX.Element;
    onChange: (value: any) => void;
    align: ComponentAlign;
    className?: string;
}

export interface CustomSelectOptionProps {
    value: any;
    className?: string;
}

type ContextProps = Pick<CustomSelectProps, 'value' | 'onChange'>;
const Context = createContext<ContextProps>({ value: [], onChange: () => [] });

export interface CustomSelectComponent extends FC<CustomSelectProps> {
    Option: FC<CustomSelectOptionProps>;
}

export const CustomSelect: CustomSelectComponent = (({  value, label, onChange, align, className, children }) => {

    const [isVisible, setIsVisible] = useState(false);

    const [target, setTarget] = useState<HTMLDivElement | null>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(isVisible, () => { if (isVisible) { setIsVisible(false); } }, target, popper);


    return (
        <Context.Provider value={{ value, onChange }}>
            <div className={classnames('relative inline-block w-full', className)}>
                <div ref={setTarget as LegacyRef<HTMLDivElement> | undefined} tabIndex={0} className={classnames(
                    'relative border border-control-border rounded',
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:outline-none',
                    'pr-8 text-right truncate cursor-pointer',
                )} onClick={(() => setIsVisible(!isVisible))}>
                    {label(value) || <span>&nbsp;</span>}
                    <div className="absolute top-1/2 right-1">
                        < AngleDownIcon className={classnames(
                            'stroke-current stroke-2'
                        )} />
                    </div>
                </div>
                {isVisible && React.Children.count(children) !== 0 &&
                    <div ref={setPopper as LegacyRef<HTMLDivElement> | undefined} className={classnames(
                        'absolute bg-white border border-control-border rounded',
                        {
                            'left-0': align === 'start',
                            'right-0': align === 'end',
                            'inset-x-0 truncate': align === 'stretch'
                        },
                        'mt-2')}>
                        {children}
                    </div>
                }
                {isVisible && React.Children.count(children) === 0 &&
                    <div className="w-absolute bg-white border border-control-border rounded inset-x-0 mt-2">&nbsp;</div>
                }
            </div>
        </Context.Provider>
    );
}) as CustomSelectComponent;

CustomSelect.Option = (({ value, className, children }) => {

    const context = useContext(Context);
    const onClick = () => context.onChange(value);

    return (
        <div onClick={onClick} className={classnames(
            'block',
            {
                'text-white bg-primary-500': context.value === value
            },
            'hover:text-white hover:bg-primary-600',
            'cursor-pointer', className)}>
            {children}
        </div>
    );

}) as FC<CustomSelectOptionProps>;

CustomSelect.Option.displayName = 'CustomSelect.Option';

