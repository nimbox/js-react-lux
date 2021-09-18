import _isFunction from 'lodash/isFunction';
import React, { Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { AngleDownIcon } from '../../icons';
import { isControlled } from '../../utilities/isControlled';
import { setInputValue } from '../../utilities/setInputValue';
import { ChooseOption, ChooseOptionProps } from '../ChooseOption';
import { defaultGetOptions, defaultRenderGroupLabel, defaultRenderOption } from '../ChooseOptionList';
import { Delay } from '../Delay';
import { Loading } from '../Loading';
import { Popper, PopperPlacement, PopperProps } from '../Popper';
import { Wrapper, WrapperProps } from './Wrapper';


export interface ChooseProps<G, O> extends WrapperProps,
    Pick<PopperProps, 'placement' | 'withArrow' | 'withSameWidth'>,
    Pick<ChooseOptionProps<G, O>, 'withSearch' | 'getOptions' | 'renderGroupLabel' | 'renderOption' | 'renderFooter'> {

    /** 
     * Function to convert a value to an option. If not provided, it
     * just iterates over all the options to check for a value match.
     */
    option?: (value: string, options: G[]) => (O | undefined) | Promise<O | undefined>;

    /**
     * Function to provide options given a search query. This function
     * can return the options or a promise that resolves to the
     * options.
     */
    options: G[] | Promise<G[]> | ((search: string) => (G[] | Promise<G[]>));

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
     * Classes to append to the input element. 
     */
    className?: string;

    /** 
     * Classes to append to the popper element. 
     */
    popperClassName?: string;

    /** 
     * Message to show when initializing is false but no item is present. 
     */
    placeholder?: string;

}

export const Choose = React.forwardRef(<G, O>(props: ChooseProps<G, O> & React.InputHTMLAttributes<HTMLInputElement>, ref: Ref<HTMLInputElement>) => {

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

        placeholder,

        ...inputProps

    } = props;

    // assertions

    if (process.env.NODE_ENV !== 'production') {
        if (withSearch && !_isFunction(options)) {
            console.error('Provided withSearch parameter without providing an option provider function.  Try setting options to (search ) => [[ ... ]]');
        }
    }

    // configuration

    const chooseOptionRef = useRef(null);

    const selectionRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const [controlled] = useState(isControlled({ type: 'text', value: props.value }));
    const [initializing, setInitializing] = useState(false);

    const [selectedOption, setSelectedOption] = useState<O | undefined>();

    useEffect(() => {
        setInitializing(true);
        (async () => {

            // await new Promise(resolve => setTimeout(resolve, 5000));

            const promisedOptions = await Promise.resolve(_isFunction(options) ? options('') : options);
            const promisedOption = option == null ?
                lookupGetItem(String(controlled ? value! : defaultValue!), promisedOptions, getValue, getOptions) :
                await Promise.resolve(option(String(controlled ? value! : defaultValue!), promisedOptions));

            setSelectedOption(promisedOption);
            setInitializing(false);

        })();
    }, [defaultValue, value]); // eslint-disable-line react-hooks/exhaustive-deps

    // popper show and hide

    const [show, setShow] = useState(false);
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
    const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(show, () => { if (show) { setShow(false); } }, wrapperRef, popperRef);

    const handleShow = () => {

        console.log('handle show');

        if (!show) {
            setShow(true);
        }

    };
    const handleHide = () => {

        console.log('handle hide');

        setShow(false);
        wrapperRef?.focus();

    };


    // choose handler

    const handleChoose = (option: O) => {

        const v = getValue(option);
        setInputValue(inputRef, v);
        if (value == null) {
            setSelectedOption(option);
        }

        handleHide();

    };

    // mouseDown

    // keyDown handlers


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

        console.log('on handle mouse down');

        if (document.activeElement != null && document.activeElement === wrapperRef) {
            console.log('do the show');
            e.preventDefault();
            handleShow();
        }

    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {

        console.log('handle blur', show);
        // if (show) {
        //     setShow(false);
        // }

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

                onFocus={handleShow}
                onBlur={handleBlur}


                end={
                    <>
                        {initializing && <Delay><Loading /></Delay>}
                        <AngleDownIcon className="cursor-pointer" />
                    </>
                }

            >

                <div ref={selectionRef} className="focus:bg-red-500">
                    {initializing ? <>&nbsp;</> : (selectedOption ? (renderSelectedOption ? renderSelectedOption({ option: selectedOption }) : renderOption({ option: selectedOption })) : (placeholder ? <>{placeholder}</> : <>&nbsp;</>))}
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
                    ref={setPopperRef} reference={wrapperRef!}
                    placement={placement} withArrow={withArrow} withSameWidth={withSameWidth}
                    className="border border-control-border rounded"
                >

                    <ChooseOption


                        ref={chooseOptionRef}

                        withSearch={withSearch}

                        onBlur={handleHide}

                        onHide={handleHide}
                        onChoose={handleChoose}

                        error={undefined}
                        options={options}

                        getOptions={getOptions}

                        renderGroupLabel={renderGroupLabel}
                        renderOption={renderOption}
                        renderFooter={renderFooter}

                    />

                </Popper>
            }

        </>
    );

});

//

export const lookupGetItem = <G, O>(value: string, options: G[], getValue: (option: O) => string, getOptions: (group: G) => O[]) => {

    if (value != null) {
        for (let g of options) {
            for (let i of getOptions(g)) {
                if (getValue(i) === value) {
                    return i;
                }
            }
        }
    }

    return undefined;

}

export const defaultGetValue = <O,>(option: O) => String(option);
