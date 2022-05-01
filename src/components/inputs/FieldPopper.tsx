import classNames from 'classnames';
import React, { forwardRef, HTMLAttributes, Ref, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useInternalize } from '../../hooks/useInternalize';
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
     * Class name to apply to the popper.
     * @default bg-control-bg border border-control-border rounded drop-shadow
     */
    popperClassName?: string;

    // FieldPopper

    /**
     * Default show value (for uncontrolled).
     */
    defaultShow?: boolean;

    /**
     * Show value (for controlled).
     */
    show?: boolean;

    /**
     * Change show event handler (for controlled).
     */
    onChangeShow: (show: boolean) => void;

    /**
     * Toggle visibility of the popper when a click is detected on the field.
     * @default true
     */
    withToggle?: boolean;

    /**
     * Called when tabbing inside the popper reaches the begining or the end.
     * This is done by adding two selectable, but invisisble, divs, one before
     * and one after all the elements of the popper.
     */
    onPopperBlur?: () => void;

    /**
     * Render the popper.
     */
    renderPopper: () => React.ReactElement;

}

/**
 * FieldPopper. Container of all inputs that require a popper to display or
 * input further information.
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

        onFocus,
        onBlur,

        children,

        // Popper 

        popperRef,

        withPlacement,
        withArrow,
        withSameWidth,

        popperClassName,

        // FieldPopper

        defaultShow,
        show,
        onChangeShow,

        withToggle = true,

        onPopperBlur,

        renderPopper,

        // Rest of field

        ...fieldProps

    } = props;

    // Assertions

    if (process.env.NODE_ENV !== 'production') {
        if (show !== null && onChangeShow == null) {
            console.error('You provided a `show` prop without an `onChangeShow` handler.');
        }
    }

    // Internalize `show`

    const [internalShow, handleChangeInternalShow] = useInternalize(false, defaultShow, show, onChangeShow);

    // Clone references

    const [internalFieldRef, setInternalFieldRef] = useState<HTMLDivElement | null>(null);
    useImperativeHandle(fieldRef, () => internalFieldRef!);

    const [internalPopperRef, setInternalPopperRef] = useState<HTMLPopperElement | null>(null);
    useImperativeHandle(popperRef, () => internalPopperRef!);

    // Hide when clicking outside the field or the popper

    const handleHide = useCallback(() => handleChangeInternalShow(false), [handleChangeInternalShow]);
    useOnOutsideClick(internalShow, handleHide, internalFieldRef, internalPopperRef);

    // Field handlers

    // Hide the popper if a blur events happens in the field or the popper and
    // the next active element is outside of both. This handles the case when
    // another element is focused programmatically and not because of a keypress
    // or mousedown. 

    const isShowOnFocus = useRef(false);

    const handleFieldFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(e);
        handleChangeInternalShow(true);
        isShowOnFocus.current = true;
    }, [onFocus, handleChangeInternalShow]);

    const handleFieldBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
        setTimeout(() => {
            const activeElement = getActiveElement();
            if (
                !(activeElement == null) &&
                (internalPopperRef != null && !internalPopperRef.contains(activeElement))
            ) {
                handleChangeInternalShow(false);
            }
        }, 0);
        onBlur?.(e);
    }, [internalPopperRef, handleChangeInternalShow, onBlur]);

    const handleFieldClick = useCallback(() => {
        if (!isShowOnFocus.current) {
            if (withToggle) {
                handleChangeInternalShow(!internalShow);
            }
        }
        isShowOnFocus.current = false;
    }, [withToggle, internalShow, handleChangeInternalShow]);

    // Popper handlers

    const handlePopperBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        setTimeout(() => {
            const activeElement = getActiveElement();
            if (
                !(activeElement == null) &&
                !(internalFieldRef != null && internalFieldRef?.contains(activeElement)) &&
                !(internalPopperRef != null && internalPopperRef?.contains(activeElement))
            ) {
                handleChangeInternalShow(false);
            }
        }, 0);
    };

    // Hide the popper it a focus event is received before or after any of the
    // focusable elements inside the popper.

    const handlePopperLimitBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        e.target.blur();
        onPopperBlur?.();
    };

    // Render

    return (
        <>

            <Field

                ref={setInternalFieldRef}

                focus={internalShow}
                disabled={disabled}
                error={error}

                onFocus={handleFieldFocus}
                onBlur={handleFieldBlur}
                onClick={handleFieldClick}

                {...fieldProps}

            >

                {children}

            </Field>

            {internalShow && !disabled &&

                <Popper

                    ref={setInternalPopperRef}
                    reference={internalFieldRef!}

                    withPlacement={withPlacement}
                    withArrow={withArrow}
                    withSameWidth={withSameWidth}

                    onBlur={handlePopperBlur}

                    className={classNames('bg-control-bg border border-control-border rounded drop-shadow', popperClassName)}

                >

                    {onPopperBlur && <div tabIndex={0} onFocus={handlePopperLimitBlur} />}
                    {renderPopper()}
                    {onPopperBlur && <div tabIndex={0} onFocus={handlePopperLimitBlur} />}

                </Popper>
            }

        </>
    );

});
