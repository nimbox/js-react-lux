import React, { Ref, useImperativeHandle, useState } from 'react';
import tinycolor from 'tinycolor2';
import defaultSwatches from '../../data/flat-colors';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { RefreshIcon } from '../../icons/components';
import { consumeEvent } from '../../utilities/consumeEvent';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { InputProps } from '../inputs/Input';
import { InputPopper } from '../inputs/InputPopper';
import { PopperProps } from '../Popper';
import classnames from 'classnames';


//
// SwatchPicker
//

export interface SwatchPickerProps extends
    InputProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    // Wrapper

    /**
     * Classes to append to the wrapper component.
     */
    fieldClassName?: string;

    // Popper

    /** 
     * Classes to append to the popper component.
     */
    popperClassName?: string;

    // SwatchPicker

    /** 
     * Possible swatch colors.
     * @default defaultSwatches
     */
    values?: string[];

}

/**
 * A color picker that allows the user to select a color from a list of
 * swatches.
 */
export const SwatchPicker = React.forwardRef((
    props: SwatchPickerProps & React.InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        // Wrapper

        variant = 'outlined',
        fieldClassName: wrapperClassName,

        // Popper

        popperClassName = 'w-64 lux-p-2em grid grid-cols-5 cursor-pointer',

        // SwatchPicker

        defaultValue: propsDefaultValue,
        value: propsValue,
        onChange,

        values = defaultSwatches,

        // input

        ...inputProps

    } = props;

    // State

    const [show, setShow] = useState(false);

    const internalInputRef = useObservableValueRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => internalInputRef.current!);

    const isControlled = propsValue != null;
    const [internalValue, setInternalValue] = useState(propsDefaultValue ?? '');
    const value = isControlled ? propsValue : internalValue;

    // Colors

    const valueColor = tinycolor(value);
    const color = valueColor.isValid() && valueColor.isDark() ? 'white' : 'black';
    const backgroundColor = valueColor.isValid() ? value : 'white';

    // Handlers

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
        onChange?.(e);
    };

    const handleClickSwatch = (e: React.MouseEvent, swatch: string) => {
        consumeEvent(e);
        setRefInputValue(internalInputRef, swatch);
        setShow(false);
    };

    const handleRandomClickSwatch = (e: React.MouseEvent) => {
        consumeEvent(e);
        setRefInputValue(internalInputRef, values[Math.floor(Math.random() * values.length)]);
    };

    // Adornment

    const adornment = () => (
        <RefreshIcon
            onMouseDown={consumeEvent}
            onClick={handleRandomClickSwatch}
            className={classnames(
                'h-full w-full lux-p-1em  border-control-border cursor-pointer',
                {
                    '-m-px border rounded': variant === 'outlined',
                    'h-full border-l border-t border-r rounded-t': variant === 'filled',
                    'h-full border-l border-t border-r': variant === 'inlined',
                    'h-full': variant === 'plain'
                }
            )}
            style={{
                ...(variant === 'outlined' && { with: 'calc(2em + 2px)', height: 'calc(100% + 2px)' }),
                ...(variant === 'filled' && { width: '2em' }),
                ...((variant === 'inlined' || variant === 'plain') && { width: '1.5em' }),
                color, backgroundColor
            }}
        />
    );

    // Popper

    const popper = () => (
        <div onMouseDown={consumeEvent} className={popperClassName}>
            {values.map((s, i) =>
                <div key={i} onClick={(e) => handleClickSwatch(e, s)} style={{ backgroundColor: s }}>&nbsp;</div>
            )}
        </div>
    );

    // render

    return (

        <InputPopper

            // Wrapper

            variant={variant}
            wrapperClassName={wrapperClassName}

            end={adornment()}

            // Popper 

            show={show}
            onChangeShow={setShow}

            renderPopper={popper}

            // Input

            ref={internalInputRef}

            {...!isControlled ? { defaultValue: propsDefaultValue } : undefined}
            {...isControlled ? { value: value } : undefined}
            onChange={handleChange}

            {...inputProps}

        />

    );

});
