import classnames from 'classnames';
import React, { Ref, useCallback, useContext, useImperativeHandle, useRef, useState } from 'react';
import { ChooseInput } from '../..';
import { useOptions, UseOptionsProps, UseOptionsProvider } from '../../hooks/useOptions';
import { useOptionsKeyNavigator } from '../../hooks/useOptionsKeyNavigator';
import { AngleDownIcon } from '../../icons';
import { consumeEvent } from '../../utilities/consumeEvent';
import { Context } from '../controls/Control';
import { WrapperProps } from '../controls/Wrapper';
import { WrapperPopper } from '../controls/WrapperPopper';
import { ChooseOption, ChooseOptionProps } from './ChooseOption';


export interface ChooseProps<G, O> extends
    WrapperProps,
    Pick<ChooseOptionProps<G, O>, 'extractor' | 'onChoose' | 'renderEmpty' | 'renderGroupLabel' | 'renderOption'> {

    withHideOnChoose?: boolean;

    provider: G[] | Promise<G[]>;
    providerProps?: UseOptionsProps<G, O>;

    identifier: (option: O) => string;

    renderChoosen?: ({ option }: { option: O }) => React.ReactNode;

}

export const Choose = React.forwardRef(<G, O>(
    props: ChooseProps<G, O> & React.InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        withHideOnChoose,

        provider,
        providerProps,
        identifier,

        variant,
        withFullWidth,

        onFocus,
        onBlur,

        error: inputError,
        disabled,

        start,
        end,

        className,

        // choose options

        extractor,
        onChoose,

        renderEmpty,
        renderGroupLabel,
        renderOption,
        renderChoosen = ({ option }) => String(option),

        children,

        ...inputProps

    } = props;


    // State

    const [show, setShow] = useState(true);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { options, loading, error } = useOptions(provider);
    const { selected, onKeyDown: onNavigatorKeyDown } = useOptionsKeyNavigator(options, { extractor, onChoose: handleChoose })

    // Handlers

    const internalInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => internalInputRef.current!);

    const context = useContext(Context);
    const [focus, setFocus] = useState(false);

    // show and hide

    const handleShow = useCallback(() => setShow(true), []);
    const handleToggle = useCallback(() => setShow(show => !show), []);
    const handleHide = useCallback(() => setShow(false), []);

    // show on focus or click

    const isMouseDown = useRef(false);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        isMouseDown.current = true;
    }, []);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(e);
        setFocus(true);
        if (!isMouseDown.current) {
            handleShow();
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false);
        onBlur?.(e);
    }

    const handleClick = useCallback(() => {
        handleToggle();
    }, [handleToggle]);

    const handleMouseUp = useCallback((e: React.MouseEvent) => {
        isMouseDown.current = false;
    }, []);

    function handleChoose(option: O) {

        console.log('handleChoose', identifier(option), option);
        setShow(false);

        // onChoose(option);
        // if (show && withHideOnChoose) {
        //     setShow(false);
        //     wrapperRef.current?.focus();
        // }

    };

    // Popper


    const choosen = () => (
        <div>asd</div>
    );

    const popper = () => (
        <ChooseOption

            options={options}
            selected={selected}

            extractor={extractor}
            onChoose={handleChoose}

            renderEmpty={renderEmpty}
            renderGroupLabel={renderGroupLabel}
            renderOption={renderOption}

            onMouseDown={consumeEvent}

            className="divide-y-2"

        />
    );

    // Render

    return (
        <WrapperPopper

            ref={wrapperRef}
            // tabIndex={0}

            variant={variant}
            withFullWidth={withFullWidth}

            show={show}
            popper={popper}

            focus={focus}
            disabled={disabled}
            error={error}

            onKeyDown={onNavigatorKeyDown}

            onMouseDown={handleMouseDown}
            // onFocus={handleFocus}
            // onBlur={handleBlur}
            onClick={handleClick}
            onMouseUp={handleMouseUp}

            start={start}
            end={
                <>
                    {end}
                    <AngleDownIcon className="text-control-border stroke-2" style={{ marginRight: '0.5em' }} />
                </>
            }

            className="cursor-pointer"

        >

            <input

                type="text"

                defaultValue="ricardo"

                // ref={inputRef}

                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}

                // defaultValue={defaultValue}
                // value={value}
                // onChange={onChange}

                // {...inputProps}

                // className="absolute inset-0 w-full text-center opacity-20 pointer-events-none"

            />

        </WrapperPopper>
    );

});
