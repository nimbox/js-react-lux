import classNames from 'classnames';
import React, { FocusEvent, forwardRef, HTMLAttributes, ReactElement, Ref, useImperativeHandle, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { getActiveElement } from '../../utilities/getActiveElement';
import { HTMLPopperElement, Popper, PopperProps } from '../Popper';
import { Field, FieldProps } from './Field';


//
// FieldPopper
//

export interface FieldPopperProps extends FieldProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    // Popper

    /**
     * Popper reference in case you need to do something with the popper itself.
     */
    popperRef?: Ref<HTMLPopperElement>;

    /**
     * Render the popper.
     */
    renderPopper: () => ReactElement;

    /**
     * Class names to apply to the popper.
     * @default bg-control-bg border border-control-border rounded drop-shadow
     */
    popperClassName?: string;


    // FieldPopper

    /**
     * Show value (for controlled).
     */
    show: boolean;

    /**
     * Called when the focus is blured from the field or the popper. This is
     * usually because of a click outside event or a programatic focus of
     * another element in the page.
     */
    onFullBlur?: () => void;

    /**
     * Called when tabbing inside the popper reaches the begining or the end.
     * This is done by adding two selectable, but invisisble, divs, one before
     * and one after all the elements of the popper.
     */
    onKeyBlur?: () => void;

}

/**
 * Container of all inputs that require a popper to display or input further
 * information.
 *
 * The popper in this component is controlled via the `show` property and the
 * `onHide`. The `onHide` is called whenever the field or the popper looses the
 * focus. No attempt is made to detect clicks, since a click outside both
 * elements triggers a focus on an element different than the field or the
 * popper, thus effectively loosing focus.
 *
 * For the case in which the popper can have components with focus, the handler
 * `onKeyBlur` is called when tabbing to elements before or after the focusable
 * elements in the popper. The usual response to this event is to focus the
 * field or the input inside the field.
 *
 * When using this component with inputs there are two possible situations: the
 * elements in the popper don't require focus (click only selection), or there
 * are elements in the popper that can be focused (fields inside the popper).
 *
 * Clickable only. Requires that the rendered popper consumes all mouse events
 * so that the focus never leaves the input in the field. This can be done with
 * `onMouseDown={consumeEvent}` at the highest level element of the popper. Take
 * a look at `DatePicker` to see how this is done.
 *
 * Focusable. Take a look at `Choose` to see how this is done.
 *
 */
export const FieldPopper = forwardRef((
    props: FieldPopperProps & HTMLAttributes<HTMLDivElement>,
    fieldRef: Ref<HTMLDivElement>
) => {

    // Properties

    const {

        // Field

        disabled,
        error,

        children,

        // Popper 

        popperRef,

        withPlacement,
        withArrow,
        withSameWidth,

        onBlur,

        renderPopper,
        popperClassName,

        // FieldPopper

        show,

        onFullBlur,
        onKeyBlur,

        // Rest of field

        ...fieldProps

    } = props;

    // Clone references

    const [internalFieldRef, setInternalFieldRef] = useState<HTMLDivElement | null>(null);
    useImperativeHandle(fieldRef, () => internalFieldRef!);

    const [internalPopperRef, setInternalPopperRef] = useState<HTMLPopperElement | null>(null);
    useImperativeHandle(popperRef, () => internalPopperRef!);

    // Hide when clicking outside the field or the popper. This might be a
    // double occurrence with the handleFullBlur. But it is here as a safety
    // net.

    useOnOutsideClick(show, onFullBlur || defaultFullBlur, internalFieldRef, internalPopperRef);

    // Hide the popper if a blur events happens in the field or the popper and
    // the next active element is outside of both. This handles the case when
    // another element is focused programmatically and not because of a keypress
    // or mousedown. 

    const handleFullBlur = (e: FocusEvent<HTMLDivElement>) => {
        setTimeout(() => {
            const activeElement = getActiveElement();
            if (
                !(activeElement == null) &&
                !(internalFieldRef != null && internalFieldRef?.contains(activeElement)) &&
                !(internalPopperRef != null && internalPopperRef?.contains(activeElement))
            ) {
                onFullBlur?.();
            }
        }, 0);
    };

    const handleFieldBlur = (e: FocusEvent<HTMLDivElement>) => {
        onBlur?.(e);
        handleFullBlur(e);
    };

    // Hide the popper it a focus event is received before or after any of the
    // focusable elements inside the popper.

    const handleKeyBlur = (e: FocusEvent<HTMLDivElement>) => {
        e.target.blur();
        onKeyBlur?.();
    };

    // Render

    return (
        <>

            <Field

                ref={setInternalFieldRef}

                disabled={disabled}
                error={error}

                onBlur={handleFieldBlur}

                {...fieldProps}

            >

                {children}

            </Field>

            {show && !disabled &&

                <Popper

                    ref={setInternalPopperRef}
                    reference={internalFieldRef!}

                    withPlacement={withPlacement}
                    withArrow={withArrow}
                    withSameWidth={withSameWidth}

                    onBlur={handleFullBlur}

                    className={classNames('bg-control-bg border border-control-border rounded drop-shadow', popperClassName)}

                >

                    {onKeyBlur && <div tabIndex={0} onFocus={handleKeyBlur} />}
                    {renderPopper()}
                    {onKeyBlur && <div tabIndex={0} onFocus={handleKeyBlur} />}

                </Popper>
            }

        </>
    );

});


const defaultFullBlur = () => null;
