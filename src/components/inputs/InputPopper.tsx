import React, { Ref, useImperativeHandle, useRef } from 'react';
import { useInternalizeInput } from '../../hooks/useInternalizeInput';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { PopperProps } from '../Popper';
import { FieldProps } from './Field';
import { FieldPopper } from './FieldPopper';
import { PlainInput } from './PlainInput';


//
// InputPopper
//

export interface InputPopperProps extends
    Omit<FieldProps, 'className'>,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    // Field

    /**
     * Classes to pass to the field.
     */
    fieldClassName?: string;

    // Popper

    /**
     * Show the popper.
     */
    show: boolean;

    /**
     * Manage the show popper state.
     */
    onChangeShow: (s: boolean) => void;

    //

    /**
     * Render the popper.
     */
    renderPopper: () => React.ReactElement;

    /** 
     * Classes to pass to the popper.
     */
    popperClassName?: string;

    // Input

    /** 
     * Name used for the input element and returned in the change event. 
     */
    name?: string,

    /** 
     * Default value for the uncontrolled version.
     */
    defaultValue?: string,

    /** 
     * Value for the controlled version.
     */
    value?: string,

    /**
     * Placeholder to show inside the input if it is empty.
     */
    placeholder?: string,

    /** 
     * Change event handler (for uncontrolled and controlled).
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>,

    /**
     * Change event handler for final blur event. 
     */
    onFinalize?: (value: string) => string | null;

}

/**
 * This component behaves exactly the same way as an html `input` element. The
 * `ref` and `className` of this component are forwarded to the internal `input`
 * element.
 * 
 * Additionaly this component requires a 
 */
export const InputPopper = React.forwardRef((
    props: InputPopperProps & React.InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        // Field

        variant,

        label,
        start,
        end,

        shrink,
        focus,
        disabled,
        error,

        withFullWidth,
        withFullHeight,

        fieldClassName,

        // Popper

        show,
        onChangeShow,

        withPlacement,
        withArrow,
        withSameWidth,

        popperClassName,
        renderPopper,

        // Input

        onKeyDown,
        onChange,
        onFinalize,

        // Rest goes to Input

        ...inputProps


    } = props;

    // Internalize `value`

    const [internalValue, handleChangeInternalValue] = useInternalizeInput('', props.defaultValue, props.value, onChange);
    const handleFinalize = () => {
        if (onFinalize) {
            const finalValue = onFinalize(internalValue);
            if (finalValue) {
                setRefInputValue(internalInputRef, finalValue);
            }
        }
    };

    // Clone references

    const internalInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => internalInputRef.current!);

    // Handlers

    const handleShow = () => { if (!show) { onChangeShow(true); } };
    const handleHide = () => { if (show) { onChangeShow(false); } };

    const handleFinalizeHide = () => {
        handleFinalize();
        handleHide();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(e);
        switch (e.key) {
            case 'ArrowDown':
                handleShow();
                e.preventDefault();
                break;
            case 'ArrowUp':
            case 'Escape':
                handleHide();
                e.preventDefault();
                break;
            case 'Tab':
            case 'Enter':
                handleFinalize();
                handleHide();
                break;
        }
    };

    // Render

    return (

        <FieldPopper

            // Field

            variant={variant}

            label={label}
            start={start}
            end={end}

            shrink={shrink || props.placeholder != null || internalValue.length > 0}
            focus={show}
            disabled={disabled}
            error={error}

            onClick={handleShow}

            withFullWidth={withFullWidth}
            withFullHeight={withFullHeight}

            className={fieldClassName}

            // Popper

            withPlacement={withPlacement}
            withArrow={withArrow}
            withSameWidth={withSameWidth}

            // FieldPopper

            show={show}
            onFullBlur={handleFinalizeHide}

            popperClassName={popperClassName}
            renderPopper={renderPopper}

        >

            <PlainInput type="text"

                ref={internalInputRef}

                onFocus={handleShow}
                onKeyDown={handleKeyDown}
                onChange={handleChangeInternalValue}

                {...inputProps}

            />

        </FieldPopper>

    );

});
