import classnames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { ChooseOption, ChooseOptionProps } from '../ChooseOption';
import { defaultGetOptions, defaultRenderGroupLabel, defaultRenderOption } from '../ChooseOptionList';
import { Popper, PopperProps } from '../Popper';
import { defaultGetValue } from './Choose';
import { Wrapper, WrapperProps } from './Wrapper';
import _debounce from 'lodash/debounce';
import _isFunction from 'lodash/isFunction';
import { Loading } from '../Loading';
import { AngleDownIcon, WarningIcon } from '../../icons';
import { Delay } from '../Delay';


//
// Choose
//

export type ChooseProps<G, O> = ChooseOneProps<G, O> | ChooseMultipleProps<G, O>;

export interface ChooseOneProps<G, O> extends BaseChooseProps<G, O> {

    /**
     * 
     */
    withMultiple?: false;

    /**
     * The values to display as selected.
     */
    value?: string;

    /** 
     * Function to convert a value to an option.
     */
    option: (value: string) => (O | undefined) | Promise<O | undefined>;

}

export interface ChooseMultipleProps<G, O> extends BaseChooseProps<G, O> {

    /**
     * 
     */
    withMultiple?: true;

    /**
     * The values to display as selected.
     */
    value?: string[];

    /** 
     * Function to convert a value to an option.
     */
    option: (values: string[]) => (O | undefined)[] | Promise<(O | undefined)[]>;

}

export interface BaseChooseProps<G, O> extends WrapperProps,
    Pick<PopperProps, 'placement' | 'withArrow' | 'withSameWidth'>,
    Pick<ChooseOptionProps<G, O>, 'withSearch' | 'getOptions' | 'renderGroupLabel' | 'renderOption' | 'renderFooter'> {

    /**
     * 
     */
    withMultiple?: boolean;

    /**
     * Callback when an option is chosen from the list.
     */
    onChoose?: (value: string) => void;

    /**
     * Function to provide options given a search query. This function can
     * return the options or a promise that resolves to the options.
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
     * to multipe renders of `renderOption`.
     */
    renderSelection?: (props: { active: boolean, option: O }) => React.ReactNode;

    // styling

    /**
     * 
     */
    placeholder?: string;

    /**
     * 
     */
    className?: string;

    /**
     * Classes to pass to the ChooseOption container.
     */
    containerClassName?: string;

}



export const ChooseMultiple: <G, O>(props: ChooseProps<G, O>) => React.ReactElement = <G,O>(props: ChooseProps<G, O>) => {

    const {

        variant,
        withNoFull,

        withMultiple = false,
        withSearch,

        option,
        options,

        getValue = defaultGetValue,
        getOptions = defaultGetOptions,

        placement = 'bottom-start',
        withArrow = false,
        withSameWidth = false,

        renderSelection,
        renderGroupLabel = defaultRenderGroupLabel,
        renderOption = defaultRenderOption,
        renderFooter,

        start,
        end,

        value,
        // onChange,

        error,
        disabled,

        placeholder,
        className,

        containerClassName

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
    const [loadedOption, setLoadedOption] = useState<any>();

    const doLoad = useCallback((value) => {

        let working = true;
        (async () => {
            try {
                const promisedOption = await Promise.resolve(option(value));
                if (working) {
                    setLoadedOptionValue(value);
                    setLoadedOption(promisedOption as any);
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
        handleLoad(value);
    }, [handleLoad, value]);

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
        console.log('handleMouseDown', document.activeElement, wrapperRef);
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
        // setInputValue(inputRef, getValue(option));
        // if (value == null) {
        //     setLoadedOption(option);
        // }
        console.log('option', option);
        handleHide();
    };

    // render

    console.log('render');

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
                        {loading && <Delay><Loading colorClassName="text-control-border" /></Delay>}
                        {loadingError ? <WarningIcon className="text-danger-500 stroke-2" /> : <AngleDownIcon className="text-control-border stroke-2" />}
                    </>
                }

                className="cursor-pointer"

            >

                {!loadedOption ?
                    <span>{placeholder}</span>
                    :
                    <span className={className}>
                        {withMultiple ? loadedOption.map((option: O) => renderOption({ option })) : renderOption({ option: loadedOption })}
                    </span>
                }

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

                        containerClassName={classnames('border border-control-border rounded', containerClassName)}

                    />

                </Popper>
            }

        </>
    );

};
