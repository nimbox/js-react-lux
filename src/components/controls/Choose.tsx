import classNames from 'classnames';
import _isFunction from 'lodash/isFunction';
import React, { Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { AngleDownIcon, WarningIcon } from '../../icons';
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

        defaultValue,
        value,
        onChange,

        error,
        disabled,

        placeholder,

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

    // const [focus, setFocus] = useState(false);

    const chooseOptionRef = useRef<HTMLInputElement & { handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void }>(null);

    const selectionRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const [initializing, setInitializing] = useState(false);
    const [initializingError, setInitializingError] = useState(false);
    const [loadedOption, setLoadedOption] = useState<O | undefined>();

    useEffect(() => {
        setInitializing(true);
        setInitializingError(false);
        (async () => {
            try {
                const promisedOption = await Promise.resolve(option(String(value != null ? value : defaultValue!)));
                setLoadedOption(promisedOption);
            } catch (e) {
                setInitializingError(true);
            } finally {
                setInitializing(false);
            }
        })();
    }, [option, defaultValue, value]);

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

    // handlers

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

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        handleShow();
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!withSearch && show) {
            setShow(false);
        }
    };

    // choose handlers

    const handleChoose = (option: O) => {

        const v = getValue(option);
        setInputValue(inputRef, v);
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

                end={
                    <>
                        {initializing && <Delay><Loading /></Delay>}
                        {initializingError ? <WarningIcon className="text-danger-500" /> : <AngleDownIcon />}
                    </>
                }

                className="cursor-pointer"

            >

                <div ref={selectionRef} className="focus:bg-red-500">
                    {initializing ?
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

                    className="absolute inset-0 opacity-0 pointer-events-none"

                />

            </Wrapper>

            {show &&
                <Popper
                    ref={setPopperRef}
                    reference={wrapperRef!}
                    placement={placement}
                    withArrow={withArrow}
                    withSameWidth={withSameWidth}
                    className="control-bg"
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
