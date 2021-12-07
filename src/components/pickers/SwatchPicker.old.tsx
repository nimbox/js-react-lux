import classnames from 'classnames';
import React, { Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import defaultSwatches from '../../data/flat-colors';
import { Input, InputProps } from '../controls/Input';
import { Popper, PopperPlacement, PopperProps } from '../Popper';


//
// SwatchPicker
//

export type SwatchPickerAlign = 'start' | 'stretch' | 'end';

export interface SwatchPickerProps extends
    InputProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    /** Name used for the input element and returned in the change event. */
    name?: string,

    /** String representation of the color (for uncontrolled). */
    defaultValue?: string,

    /** String representation of the color (for controlled). */
    value?: string,

    /** Change event handler (for controlled). */
    onChange?: React.ChangeEventHandler<HTMLInputElement>,

    /** Possible swatch colors. */
    values?: string[];

    /** Popper placement. */
    withPlacement?: PopperPlacement;

    /** Set popper width to the same width of the reference element. */
    withSameWidth?: boolean;

    /** Classes to append to the popper element. */
    popperClassName?: string;

}

export const SwatchPicker = React.forwardRef((
    props: SwatchPickerProps & React.InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
) => {

    // properties

    const {

        name,
        defaultValue,
        value,
        onChange,

        values = defaultSwatches,

        onFocus,
        onBlur,

        withPlacement: placement,
        withArrow,
        withSameWidth = true,

        popperClassName = 'grid grid-cols-5 w-32',

        ...inputProps

    } = props;

    // configuration


    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    // Maintain an internalValue to use the internal input as controlled,
    // and only update internalValue only when the DatePicker is controlled.
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    useEffect(() => { if (value != null) { setInternalValue(value || ''); } }, [value]);

    const [show, setShow] = useState(false);
    const popperRef = useRef<HTMLInputElement>(null);
    useOnOutsideClick(show, () => { if (show) { setShow(false); } }, inputRef.current, popperRef.current);

    // handlers

    const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (onFocus) { onFocus(event); }
        setShow(true);
    }

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setShow(false);
        if (onBlur) { onBlur(event); }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            // bubble up change event regardless of 
            // controlled or uncontrolled
            onChange(e);
        }
        if (value == null) {
            // set internal value if uncontrolled
            setInternalValue(e.target.value);
        }
    }

    const handleClickSwatch = (swatch: string) => {
        setRefInputValue(inputRef, swatch);
        setShow(false);
    };

    const handleRandomClickSwatch = () => {
        setRefInputValue(inputRef, values[Math.floor(Math.random() * values.length)]);
        setShow(false);
    };

    // render

    return (

        <div className="relative inline-block w-full">

            <Input type="text"

                ref={inputRef}
                name={name}

                defaultValue={defaultValue}
                value={value}
                onChange={handleChange}

                onFocus={handleOnFocus}
                onBlur={handleOnBlur}

                onClick={() => setShow(true)}

                autoComplete="off"

                {...inputProps}

            />

            <div
                onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onClick={handleRandomClickSwatch}
                className="absolute inset-y-0 right-0 border border-control-border rounded bg-red-500 cursor-pointer"
                style={{ width: '2em', backgroundColor: internalValue }}
            />

            {show &&
                <Popper ref={popperRef} reference={inputRef.current!}
                    onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    withPlacement={placement}
                    withSameWidth={withSameWidth}
                    className={classnames('bg-content-fg border border-content-border rounded cursor-pointer', popperClassName)}
                >
                    {values.map((s, i) =>
                        <div key={i} onClick={() => handleClickSwatch(s)} style={{ backgroundColor: s }}>&nbsp;</div>
                    )}
                </Popper>
            }

        </div>

    );

});
