import classNames from 'classnames';
import _debounce from 'lodash/debounce';
import _isFunction from 'lodash/isFunction';
import React, { Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { AngleDownIcon, FullSquareIcon, WarningIcon } from '../../icons';
import { setInputValue } from '../../utilities/setInputValue';
import { ChooseOption, ChooseOptionProps } from '../ChooseOption';
import { defaultGetOptions, defaultRenderGroupLabel, defaultRenderOption } from '../ChooseOptionList';
import { Delay } from '../Delay';
import { Loading } from '../Loading';
import { Popper, PopperProps } from '../Popper';
import { Wrapper, WrapperProps } from './Wrapper';


//
// Choose
//

export interface ChooseProps<G, O> extends WrapperProps,
    Pick<PopperProps, 'placement' | 'withArrow' | 'withSameWidth'>,
    Pick<ChooseOptionProps<G, O>, 'withSearch' | 'getOptions' | 'renderGroupLabel' | 'renderOption' | 'renderFooter'> {

    /** 
     * Function to convert a value to an option. If not provided, it
     * just iterates over all the options to check for a value match.
     */
    option: (value: string) => (O | undefined) | Promise<O | undefined>;

    /**
     * Function to provide options given a search query. This function
     * can return the options or a promise that resolves to the
     * options.
     */
    options: (G[] | Promise<G[]>) | ((search: string) => (G[] | Promise<G[]>));

    //

    /**
     * Extractor to get the value of a given option. Default is
     * `(option) => option`.
     */
    getValue?: (option: O) => string;

    //

    /**
     * Render the selected option from the provided option. Defaults
     * to `renderOption`.
     */
    renderSelectedOption?: (props: { option: O }) => React.ReactNode;

    //

    /**
     * Classes to pass to the ChooseOption container.
     */
    containerClassName?: string;

}

/**
 * Choose is a controller or uncontrolled input that automatically
 * renders the currently selected option as well calling the options
 * promise while managing loading and error states. Assume this
 * elements acts as an `input`.
 */
export const Choose = React.forwardRef(<G, O>(
    props: ChooseProps<G, O> & React.InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
) => {

    const {

        variant,
        withNoFull,

        withSearch,

        option,
        options,

        getValue = defaultGetValue,
        getOptions = defaultGetOptions,

        placement = 'bottom-start',
        withArrow = false,
        withSameWidth = false,

        renderSelectedOption,
        renderGroupLabel = defaultRenderGroupLabel,
        renderOption = defaultRenderOption,
        renderFooter,

        start,
        end,

        defaultValue,
        value,
        onChange,

        error,
        disabled,

        placeholder,
        className,

        containerClassName,

        ...inputProps

    } = props;

    // assertions

    if (process.env.NODE_ENV !== 'production') {
        if (withSearch && !_isFunction(options)) {
            console.error('Provided withSearch parameter without providing an option provider function.  Try setting options to (search ) => [[ ... ]]');
        }
    }

    // configuration

    const chooseOptionRef = useRef<HTMLInputElement & { handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void }>(null);

    // get selected option

    const [loading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);

    const loadRef = useRef<{ cancel: (() => void) } | null>(null);
    const [loadedOptionValue, setLoadedOptionValue] = useState(null);
    const [loadedOption, setLoadedOption] = useState<O | undefined>();

    const doLoad = useCallback((value) => {

        let working = true;
        (async () => {
            try {
                const promisedOption = await Promise.resolve(option(value));
                if (working) {
                    setLoadedOptionValue(value);
                    setLoadedOption(promisedOption);
                }
            } catch (e) {
                if (working) {
                    setLoadingError(e != null);
                }
            } finally {
                if (working) {
                    loadRef.current = null;
                    setLoading(false);
                }
            }
        })();
        return ({ cancel: () => { working = false; } });

    }, [option]);

    const handleLoad = useCallback(_debounce((value) => { // eslint-disable-line react-hooks/exhaustive-deps

        if (value !== loadedOptionValue) {

            if (loadRef.current) {
                loadRef.current.cancel();
            }

            setLoading(true);
            setLoadingError(false);
            loadRef.current = doLoad(value);

        }

    }, 0), [doLoad, loadedOptionValue]);

    useEffect(() => { 
        const v = value || defaultValue || '';
        handleLoad(v);
    }, [handleLoad, value]); // eslint-disable-line react-hooks/exhaustive-deps

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
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current ? new Proxy(inputRef.current, handler) : inputRef.current!);

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
        if (!withSearch && show) {
            setShow(false);
        }
    };

    // handlers

    const handleChoose = (option: O) => {
        setInputValue(inputRef, getValue(option));
        if (value == null) {
            setLoadedOption(option);
        }
        handleHide();
    };

    // render

    return (
        <>

            <Wrapper

                ref={setWrapperRef}
                tabIndex={0}

                variant={variant}
                withNoFull={withNoFull}

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
                        {loading && <Delay><Loading colorClassName="text-control-border"/></Delay>}
                        {loadingError ? <WarningIcon className="text-danger-500" /> : <AngleDownIcon className="text-control-border"/>}
                    </>
                }

                className="cursor-pointer"

            >

                <div
                    ref={selectionRef}
                    className={className}
                >
                    {loading ?
                        <>&nbsp;</> :
                        (loadedOption ?
                            (renderSelectedOption ?
                                renderSelectedOption({ option: loadedOption }) :
                                renderOption({ option: loadedOption })) :
                            (placeholder ?
                                <>{placeholder}</> :
                                <>&nbsp;</>))
                    }
                </div>

                <input

                    type="text"
                    tabIndex={-1}

                    ref={inputRef}

                    defaultValue={defaultValue}
                    value={value}
                    onChange={onChange}

                    {...inputProps}

                    className="absolute inset-0 w-full text-center opacity-0 pointer-events-none"

                />

            </Wrapper>

            {show &&
                <Popper
                    ref={setPopperRef}
                    reference={wrapperRef!}
                    placement={placement}
                    withArrow={withArrow}
                    withSameWidth={withSameWidth}
                    className="bg-control-bg"
                >

                    <ChooseOption


                        ref={chooseOptionRef}

                        withSearch={withSearch}

                        onBlur={handleHide}

                        onHide={handleHide}
                        onChoose={handleChoose}

                        options={options}
                        getOptions={getOptions}

                        renderGroupLabel={renderGroupLabel}
                        renderOption={renderOption}
                        renderFooter={renderFooter}

                        containerClassName={classNames('border border-control-border rounded', containerClassName)}

                    />

                </Popper>
            }

        </>
    );

});

// default properties

export const defaultGetValue = <O,>(option: O) => String(option);
