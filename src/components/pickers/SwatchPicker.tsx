import React, { Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import defaultSwatches from '../../data/flat-colors';
import { consumeEvent } from '../../utilities/consumeEvent';
import { setInputValue } from '../../utilities/setInputValue';
import { InputProps } from '../controls/Input';
import { InputPopper } from '../controls/InputPopper';
import { PopperProps } from '../Popper';


//
// SwatchPicker
//

export interface SwatchPickerProps extends
    InputProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    /** Possible swatch colors. */
    values?: string[];

    /** Classes to append to the popper element. Defaults to 'p-2 w-64 grid grid-cols-5 cursor-pointer'. */
    popperClassName?: string;

}

export const SwatchPicker = React.forwardRef((
    props: SwatchPickerProps & React.InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
) => {

    // properties

    const {

        defaultValue,
        value,
        onChange,

        values = defaultSwatches,

        onFocus,
        onBlur,

        withPlacement: placement,
        withArrow,
        withSameWidth,

        popperClassName = 'p-2 w-64 grid grid-cols-5 cursor-pointer',

        ...inputProps

    } = props;

    // configuration

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    // Maintain an internalValue to use the internal input as controlled,
    // and only update internalValue when the picker is controlled.
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    useEffect(() => { if (value != null) { setInternalValue(value || ''); } }, [value]);

    // handlers

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

    // handler

    const handleClickSwatch = (swatch: string) => {
        setInputValue(inputRef, swatch);
        handleHide();
    };

    const handleRandomClickSwatch = () => {
        setInputValue(inputRef, values[Math.floor(Math.random() * values.length)]);
    };

    // adornment

    const adornment = () => {
        return (
            <div
                onMouseDown={consumeEvent}
                onClick={handleRandomClickSwatch}
                className="h-full rounded-l cursor-pointer"
                style={{ width: '2em', backgroundColor: internalValue }}
            />
        );
    };

    // popper

    const popper = () => {
        return (
            <div onMouseDown={consumeEvent} className={popperClassName}>
                {values.map((s, i) =>
                    <div key={i} onClick={() => handleClickSwatch(s)} style={{ backgroundColor: s }}>&nbsp;</div>
                )}
            </div>
        );
    };

    // render

    return (

        <InputPopper

            ref={inputRef}

            variant="outlined"

            value={value}
            onChange={handleChange}

            end={adornment()}

            withPlacement={placement}
            withArrow={withArrow}
            withSameWidth={withSameWidth}

            show={show}
            onShow={handleShow}
            onHide={handleHide}
            popper={popper}

            {...inputProps}

        />

    );

});
