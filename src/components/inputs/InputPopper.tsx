import { CircleCrossIcon } from '@nimbox/icons-react';
import { type ChangeEventHandler, type InputHTMLAttributes, type KeyboardEvent, type MouseEvent, type ReactElement, type Ref, useImperativeHandle, useRef } from 'react';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { type PopperProps } from '../floating/Popper';
import { consumeEvent } from '../utilities/consumeEvent';
import { setRefInputValue } from '../utilities/setRefInputValue';
import { type FieldProps } from './Field';
import { FieldPopper } from './FieldPopper';
import { PlainInput } from './PlainInput';


//
// InputPopper
//

export interface InputPopperProps extends
    Omit<FieldProps, 'className' | 'ref'>,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    ref?: Ref<HTMLInputElement>;

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
    onShowChange: (show: boolean) => void;

    //

    /**
     * Render the popper.
     */
    renderPopper: () => ReactElement;

    /** 
     * Classes to pass to the popper.
     */
    popperClassName?: string;

    // Input

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
    onChange?: ChangeEventHandler<HTMLInputElement>,

    /**
     * Change event handler for final blur event.
     */
    onFinalize?: (value: string) => string | null;

    /**
     * Offer a cross that empties the field, placed before whatever `end`
     * ornament the input carries.
     *
     * The cross only appears once there is something to clear. The flag says
     * the field may be emptied, not that it permanently advertises it — a
     * cross on an empty field invites a press that does nothing.
     *
     * @default `false`
     */
    withClear?: boolean;

}

/**
 * This component behaves exactly the same way as an html `input` element. The
 * `ref` and `className` of this component are forwarded to the internal `input`
 * element.
 * 
 * Additionaly this component requires a 
 */
export function InputPopper(props: InputPopperProps & InputHTMLAttributes<HTMLInputElement>) {

    // Properties

    const {

        ref,

        // Field

        variant,

        label,
        start,
        end,

        shrink,
        focus, // eslint-disable-line @typescript-eslint/no-unused-vars
        disabled,
        error,

        withoutFullWidth,
        withFullHeight,

        fieldClassName,

        // Popper

        show,
        onShowChange: onShowChange,

        withPlacement,
        withArrow,
        withSameWidth,

        popperClassName,
        renderPopper,

        // Input

        onKeyDown,
        onChange,

        onFinalize,

        withClear = false,

        // Rest goes to Input

        ...inputProps


    } = props;

    // State

    const [internalValue, handleChangeInternalValue] = useInternalizeValue('', props.defaultValue, props.value, onChange);
    const handleFinalize = () => {
        if (onFinalize) {
            const finalValue = onFinalize(internalValue);
            if (finalValue) {
                setRefInputValue(internalInputRef, finalValue);
            }
        }
    };

    const internalInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => internalInputRef.current!);

    // Handlers

    const handleShow = () => { if (!show) { onShowChange(true); } };
    const handleHide = () => { if (show) { onShowChange(false); } };

    const handleFinalizeHide = () => {
        handleFinalize();
        handleHide();
    };

    // Clearing empties the input the same way the popper picks a value, so
    // the change reaches the caller as an ordinary input event. Consuming the
    // mouse down keeps the focus in the field.

    const handleClearMouseDown = (e: MouseEvent) => {
        consumeEvent(e);
        setRefInputValue(internalInputRef, '');
    };

    // The click still follows the mouse down and would reach the field's own
    // handler, which opens the popper.

    const handleClearClick = consumeEvent;

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
            end={
                withClear && internalValue.length > 0
                    ? <>
                        <CircleCrossIcon
                            onMouseDown={handleClearMouseDown}
                            onClick={handleClearClick}
                            className="cursor-pointer"
                        />
                        {end}
                    </>
                    : end
            }

            shrink={shrink || props.placeholder != null || internalValue.length > 0}
            focus={show}
            disabled={disabled}
            error={error}

            onClick={handleShow}

            withoutFullWidth={withoutFullWidth}
            withFullHeight={withFullHeight}

            className={fieldClassName}

            // Popper

            withPlacement={withPlacement}
            withArrow={withArrow}
            withSameWidth={withSameWidth}

            // FieldPopper

            show={show}
            onFullBlur={handleFinalizeHide}

            renderPopper={renderPopper}
            popperClassName={popperClassName}

        >

            <PlainInput

                ref={internalInputRef}

                type="text"

                disabled={disabled}
                error={error}

                onFocus={handleShow}

                onKeyDown={handleKeyDown}
                onChange={handleChangeInternalValue}

                {...inputProps}

            />

        </FieldPopper>

    );

}
