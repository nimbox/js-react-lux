import { default as classnames } from 'classnames';
import React, { FC, Ref, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { AngleDownIcon } from '../../icons';
import { Popper, PopperProps } from '../Popper';
import { Context } from './Control';
import { Wrapper, WrapperProps } from './Wrapper';


//
// Select
//

export interface SelectOptionProps {

    value: string;

    children: React.ReactNode;

}

export interface SelectProps extends WrapperProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    /**
     * Display the native version of the the control. Useful when thinking about
     * mobile development.
     */
    withNative?: boolean;

    /**
     * Classes to pass to the ChooseOption container.
     */
    containerClassName?: string;

    /**
     * Children must be of type Select.Option.
     */
    children?: React.ReactElement<SelectOptionProps> | React.ReactElement<SelectOptionProps>[];

}

export interface SelectSubComponents {

    Option: FC<SelectOptionProps>;

}

interface SelectContextProps {

    withNative?: boolean;

}

const SelectContext = React.createContext<SelectContextProps>({ withNative: false });

export const SelectFN = React.forwardRef<HTMLSelectElement | HTMLInputElement, SelectProps & (React.SelectHTMLAttributes<HTMLSelectElement> | React.InputHTMLAttributes<HTMLInputElement>)>((props, ref) => {

    if (props?.withNative) {
        return <NativeSelect ref={ref as Ref<HTMLSelectElement>} {...(props as SelectProps & (React.SelectHTMLAttributes<HTMLSelectElement>))} />
    }

    return <CustomSelect ref={ref as Ref<HTMLInputElement>} {...(props as (SelectProps & React.InputHTMLAttributes<HTMLInputElement>))} />

});


export const Select = SelectFN as (typeof SelectFN & SelectSubComponents);

//
// NativeSelect
//

const NativeSelect = React.forwardRef<HTMLSelectElement, SelectProps & React.SelectHTMLAttributes<HTMLSelectElement>>((props, ref) => {

    // properties

    const {

        withNative,

        variant,
        withFullWidth: withNoFull,

        onFocus,
        onBlur,

        start,
        end,

        error,
        disabled,

        placeholder,
        className,

        containerClassName,

        children,

        ...selectProps

    } = props;

    // configuration

    const context = useContext(Context);

    const selectRef = useRef<HTMLSelectElement>(null);
    useImperativeHandle(ref, () => selectRef.current!);

    // manage focus

    const [, setFocus] = useState(false);
    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
        if (onFocus) { onFocus(e); }
        setFocus(true);
    }
    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
        setFocus(false);
        if (onBlur) { onBlur(e); }
    }

    // render

    return (
        <SelectContext.Provider value={{ withNative }}>

            <Wrapper

                variant={variant}
                withFullWidth={withNoFull}

                error={error}
                disabled={disabled}

                start={start}
                end={
                    <>
                        {end}
                        <AngleDownIcon />
                    </>
                }

            >

                <select

                    ref={selectRef}

                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={disabled}

                    className={classnames(
                        'block w-full',
                        'appearance-none outline-none focus:outline-none',
                        'placeholder-opacity-40', { 'placeholder-danger-500': error || context.error },
                        className
                    )}

                    {...selectProps}

                >

                    {children}

                </select>

            </Wrapper>

        </SelectContext.Provider>
    );

});


// 
// CustomSelect
//

const CustomSelect = React.forwardRef<HTMLInputElement, SelectProps & React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {

    const {

        withNative,

        variant,
        withFullWidth: withNoFull,

        withPlacement: placement = 'bottom-start',
        withArrow = false,
        withSameWidth = false,

        onFocus,
        onBlur,

        start,
        end,

        defaultValue,
        value,
        onChange,

        error,
        disabled,

        tabIndex = 0,
        placeholder,
        className,

        containerClassName,

        children,

        ...selectProps

    } = props;

    // configuration

    // const context = useContext(Context);
    const chooseOptionRef = useRef<HTMLInputElement & { handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void }>(null);


    // convert children into options

    const options = useMemo<React.ReactElement[][]>(() =>
        [React.Children.toArray(children)] as React.ReactElement[][],
        [children]
    );

    // get selected option

    const [loadedOption, setLoadedOption] = useState<React.ReactElement | null>(null);

    const handleLoad = useCallback((value) => {
        const option = options[0].find(child =>
            React.isValidElement<SelectOptionProps>(child) && child.props.value === value);
        setLoadedOption(option || null);
    }, [options]);

    useEffect(() => {
        const v = value || defaultValue || '';
        handleLoad(v);
    }, [handleLoad, value]); // eslint-disable-line react-hooks/exhaustive-deps

    // popper show and hide

    const [show, setShow] = useState(false);
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
    const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(show, () => { if (show) { setShow(false); } }, wrapperRef, popperRef);

    const handleShow = () => {
        if (!show) {
            setShow(true);
        }
    };
    const handleHide = () => {
        setShow(false);
        wrapperRef?.focus();
    };

    // When using `react-hook-form`, or anything that directly changes the html
    // input element value via the `ref.current.value`, we need to intercept the
    // reference we publish to detect those changes. We use a Proxy to check
    // when the property `value` is set, and trigger an `option` load that
    // eventually updates the `optionValue` and `loadedOption`. These two
    // variables represents the current value for the component.
    //
    // This changes when either the value property changes (via the props) or
    // when the ref.current.value is set to a different value than the one
    // current value of the component.

    const handler: ProxyHandler<HTMLInputElement> = {
        get(target, property) {
            return (target as any)[property];
        },
        set(target, property, value) {
            if (property === 'value') {
                handleLoad(value);
            }
            (target as any)[property] = value;
            return true;
        }
    }

    const selectionRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => selectRef.current ? new Proxy(selectRef.current, handler) : selectRef.current!);

    // handle keyboard and mouse

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        switch (e.key) {

            case 'Escape':
                handleHide();
                break;

            case 'ArrowUp':
            case 'ArrowDown':
                handleShow();
                break;

        }

        if (show) {
            chooseOptionRef.current!.handleKeyDown(e);
        }

    }

    const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
        if (document.activeElement != null && document.activeElement === wrapperRef) {
            e.preventDefault();
            handleShow();
        }
    };

    // handle focus

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        handleShow();
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (show) {
            handleHide();
        }
    };

    // handlers

    // const handleChoose = (option: React.ReactElement) => {
    //     setRefInputValue(selectRef, option.props.value);
    //     if (value == null) {
    //         console.log('loaded options');
    //         setLoadedOption(option);
    //     }
    //     handleHide();
    // };

    // render

    return (

        <SelectContext.Provider value={{ withNative }}>

            <Wrapper

                ref={setWrapperRef}
                tabIndex={tabIndex}

                variant={variant}
                withFullWidth={withNoFull}

                onKeyDown={handleKeyDown}
                onMouseDown={handleMouseDown}

                onFocus={handleFocus}
                onBlur={handleBlur}

                disabled={disabled}
                error={error}

                start={start}
                end={
                    <>
                        {end}
                        <AngleDownIcon />
                    </>
                }

                className="cursor-pointer"

            >

                <div
                    ref={selectionRef}
                    className={classnames('truncate', className)}
                >
                    {loadedOption ?
                        <span>{loadedOption.props.children}</span> :
                        placeholder ?
                            <span className="text-control-placeholder opacity-40">{placeholder}</span> :
                            <>&nbsp;</>
                    }
                </div>

                <input

                    type="text"
                    tabIndex={-1}

                    ref={selectRef}

                    defaultValue={defaultValue}
                    value={value}
                    onChange={onChange}

                    {...selectProps}

                    className="absolute w-full inset-0 text-center opacity-0 pointer-events-none"

                />

            </Wrapper>

            {show &&
                <Popper
                    ref={setPopperRef}
                    reference={wrapperRef!}
                    withPlacement={placement}
                    withArrow={withArrow}
                    withSameWidth={withSameWidth}
                    className="bg-control-bg"
                >

                    {/* <Choose

                        ref={chooseOptionRef}

                        onBlur={handleHide}

                        onChoose={() => null}

                        provider={options}
                        renderOption={({ option }) => <>{option}</>}

                        className={classNames('border border-control-border rounded', containerClassName)}

                    /> */}

                </Popper>
            }

        </SelectContext.Provider>

    );

});

const SelectOption: FC<SelectOptionProps> = ({ value, children }) => {

    const { withNative } = useContext(SelectContext);

    if (withNative) {
        return (
            <option value={value}>{children}</option>
        );
    } else {
        return (
            <>{children}</>
        );
    }

};
Select.Option = SelectOption;
