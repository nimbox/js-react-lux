import React, { ReactElement, Ref, useImperativeHandle, useMemo, useState } from 'react';
import tinycolor from 'tinycolor2';
import defaultSwatches from '../../data/flat-colors';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { RefreshIcon } from '../../icons/components';
import { consumeEvent } from '../../utilities/consumeEvent';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { InputPopper, InputPopperProps } from '../inputs/InputPopper';


//
// SwatchPicker
//

export interface SwatchPickerProps extends Omit<InputPopperProps, 'show' | 'onShowChange' | 'renderPopper'> {

    // SwatchPicker

    /** 
     * Possible swatch colors.
     * @default defaultSwatches
     */
    values?: string[];

    /**
     * class to apply to the swatch pallete.
     * @default "w-64 lux-p-2em grid grid-cols-5 cursor-pointer"
     */
    palleteClassName?: string;

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

        // Field

        end,

        // InputPopper

        onChange,

        // SwatchPicker

        values = defaultSwatches,

        palleteClassName = 'w-64 lux-p-2em grid grid-cols-5 cursor-pointer',

        // Rest goes to InputPopper

        ...inputPopperProps

    } = props;

    // State

    const [show, setShow] = useState(false);

    const [internalValue, handleChangeInternalValue] = useInternalizeValue('', props.defaultValue, props.value, onChange);
    const internalInputRef = useObservableValueRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => internalInputRef.current!);

    const handleFinalize = (value: string): string | null => {
        return value;
    };

    // Pallete State

    const { color, backgroundColor } = useMemo(() => {
        const valueColor = tinycolor(internalValue);
        const color = valueColor.isValid() && valueColor.isDark() ? 'white' : 'black';
        const backgroundColor = valueColor.isValid() ? internalValue : 'white';
        return ({ color, backgroundColor });        
    }, [internalValue]);

    // Handlers

    const handleColorChange = (swatch: string) => {
        setRefInputValue(internalInputRef, swatch);
        internalInputRef.current?.select();
        setShow(false);
    };

    const handleRandomColorChange = () => {
        setRefInputValue(internalInputRef, values[Math.floor(Math.random() * values.length)]);
        internalInputRef.current?.select();
    };

    // Adornment

    const adornment = (
        <RefreshIcon
            onMouseDown={consumeEvent}
            onClick={handleRandomColorChange}
            className="h-[1.5em] w-[1.5em] p-[0.25em] border border-control-border rounded cursor-pointer"
            style={{ color, backgroundColor }}
        />
    );

    // Popper

    const renderPalette = () => (
        <Palette

            colors={values}
            onColorChange={handleColorChange}

            className={palleteClassName}

        />
    );

    // Render

    return (

        <InputPopper

            // Field

            end={<>{end}{adornment}</>}

            // InputPopper

            ref={internalInputRef}

            show={show}
            onShowChange={setShow}

            renderPopper={renderPalette}

            onChange={handleChangeInternalValue}
            onFinalize={handleFinalize}

            {...inputPopperProps}

        />

    );

});


//
// Palette
//

interface PaletteProps {

    // Value

    /**
     * Possible swatch colors.
     */
    colors: string[];

    /**
     * Handler to call when a swatch is selected.
     */
    onColorChange: (color: string) => void;

    // Styling

    /** 
     * The class names to apply to the palette.
     */
    className?: string;

}

const Palette = (props: PaletteProps): ReactElement => {

    const {

        colors,
        onColorChange,

        className,

    } = props;

    return (
        <div onMouseDown={consumeEvent} className={className}>
            {colors.map((s, i) =>
                <div key={i} onClick={(e) => onColorChange(s)} style={{ backgroundColor: s }}>&nbsp;</div>
            )}
        </div>
    );

};