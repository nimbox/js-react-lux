import React, { Ref, useImperativeHandle, useState } from 'react';
import tinycolor from 'tinycolor2';
import defaultSwatches from '../../data/flat-colors';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { RefreshIcon } from '../../icons';
import { consumeEvent } from '../../utilities/consumeEvent';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { InputProps } from '../controls/Input';
import { InputPopper } from '../controls/InputPopper';
import { PopperProps } from '../Popper';


//
// SwatchPicker
//

export interface SwatchPickerProps extends
    InputProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    // SwatchPicker

    /** 
     * Possible swatch colors.
     * @default defaultSwatches
     */
    values?: string[];

    // Popper

    /** 
     * Classes to append to the popper element. 
     * @default 'w-64 lux-p-2em grid grid-cols-5 cursor-pointer'
     */
    popperClassName?: string;

}

export const SwatchPicker = React.forwardRef((
    props: SwatchPickerProps & React.InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        // SwatchPicker

        defaultValue,
        value: propsValue,
        onChange,

        values = defaultSwatches,

        // Popper

        withPlacement,
        withArrow,
        withSameWidth,

        popperClassName = 'w-64 lux-p-2em grid grid-cols-5 cursor-pointer',

        // input

        ...inputProps

    } = props;

    // State

    const [show, setShow] = useState(false);

    const internalInputRef = useObservableValueRef<HTMLInputElement>(null, { onSet: () => console.log('onSet') });
    // const [internalInputRef, setInternalInputRef] = useState<HTMLInputElement | null>(null);

    const isControlled = propsValue != null;
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const value = isControlled ? propsValue : internalValue;

    // Colors

    const valueColor = tinycolor(value);
    const color = valueColor.isValid() && valueColor.isDark() ? 'white' : 'black';
    const backgroundColor = valueColor.isValid() ? value : 'white';

    useImperativeHandle(inputRef, () => internalInputRef.current!);

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
            className="h-full lux-p-1em border-l border-control-border rounded-l cursor-pointer"
            style={{ width: '2em', color, backgroundColor }}
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

            ref={internalInputRef}

            variant="outlined"

            {...!isControlled ? { defaultValue } : undefined}
            {...isControlled ? { value } : undefined}
            onChange={handleChange}

            end={adornment()}

            withPlacement={withPlacement}
            withArrow={withArrow}
            withSameWidth={withSameWidth}

            show={show}
            onChangeShow={setShow}
            renderPopper={popper}

            {...inputProps}

        />

    );

});
