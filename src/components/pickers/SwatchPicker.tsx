import classnames from 'classnames';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { setInputValue } from '../../utilities/setInputValue';
import defaultSwatches from '../../utils/flat-colors';
import { Input } from '../controls/Input';
import { Popper } from '../Popper';


//
// SwatchPicker
//

export type SwatchPickerAlign = 'start' | 'stretch' | 'end';

export interface SwatchPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {

    /** Name used for the input element and returned in the change event. */
    name?: string,

    /** String representation of the color (for uncontrolled). */
    defaultValue?: string,

    /** String representation of the color (for controlled). */
    value?: string,

    /** Possible swatch colors. */
    values?: string[];

    /** Change event handler (for controlled). */
    onChange?: React.ChangeEventHandler<HTMLInputElement>,

    align?: SwatchPickerAlign;

    /** Classes to append to the popper element. */
    popperClassName?: string;

}

export const SwatchPicker = React.forwardRef<HTMLInputElement, SwatchPickerProps>(({ name, defaultValue, value, values = defaultSwatches, onChange, align = 'stretch', popperClassName = 'grid grid-cols-5 w-32', onFocus, onBlur, ...props }, ref) => {

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    // Maintain an internalValue to use the internal input as controlled,
    // and only update internalValue only when the DatePicker is controlled.
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    useEffect(() => { if (value != null) { setInternalValue(value || ''); } }, [value]);

    const [show, setShow] = useState(false);
    const popperRef = useRef<HTMLInputElement>(null);
    useOnOutsideClick(() => { if (show) { setShow(!false); } }, show, inputRef.current, popperRef.current);

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
        setInputValue(inputRef, swatch);
        setShow(false);
    };

    const handleRandomClickSwatch = () => {
        setInputValue(inputRef, values[Math.floor(Math.random() * values.length)]);
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

                onClick={() => setShow(true)}

                onFocus={handleOnFocus}
                onBlur={handleOnBlur}

                {...props}

            />

            <div
                onMouseDown={(e) => { e.preventDefault(); }}
                onClick={handleRandomClickSwatch}
                className="absolute inset-y-0 right-0 border border-control-border rounded bg-red-500 cursor-pointer"
                style={{ width: '2em', backgroundColor: internalValue }}
            />

            {show &&
                <Popper ref={popperRef} reference={inputRef.current!} onMouseDown={(e) => { e.preventDefault(); }} withSameWidth className={classnames('bg-content-fg border border-content-border rounded cursor-pointer', popperClassName)}>
                    {values.map((s, i) =>
                        <div key={i} onClick={() => handleClickSwatch(s)} style={{ backgroundColor: s }}>&nbsp;</div>
                    )}
                </Popper>
            }

        </div>
    );

});
