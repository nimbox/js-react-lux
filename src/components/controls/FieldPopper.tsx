import React, { Ref, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { getActiveElement } from '../../utilities/getActiveElement';
import { HTMLPopperElement, Popper, PopperProps } from '../Popper';
import { Field, FieldProps } from './Field';


//
// FieldPopper
//

export interface FieldPopperProps extends FieldProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    /**
     * Toggle visibiiity of the popper when a click is detected on the field.
     * @default true
     */
    withToggle?: boolean;

    // popper

    popperRef?: Ref<HTMLPopperElement>;

    defaultShow?: boolean;

    show?: boolean;

    onChangeShow: (show: boolean) => void;

    // popper

    /**
     * Render the popper.
     */
    renderPopper: () => React.ReactElement;

    /**
     * Called when tabbing inside the popper reaches the begining or the end.
     * This is done by adding two selectable, but invisisble, divs, one before
     * and one after all the elements of the popper.
     */
    onPopperBlur?: () => void;

    /**
     * Class name to apply to the popper.
     * @default `max-h-96 overflow-y-scroll bg-control-bg border border-control-border rounded filter drop-shadow`
     */
    popperClassName?: string;



}

export const FieldPopper = React.forwardRef((
    props: FieldPopperProps & React.HTMLAttributes<HTMLDivElement>,
    fieldRef: Ref<HTMLDivElement>
) => {

    // Properties

    const {

        // Field

        disabled,
        error,

        onFocus,
        onBlur,

        // Popper 

        popperRef,

        withPlacement,
        withArrow,
        withSameWidth,

        // FieldPopper

        withToggle = true,

        defaultShow: defaultShowProp,
        show: showProp,
        onChangeShow: onChangeShowProp,

        renderPopper,
        onPopperBlur,
        popperClassName = 'max-h-96 overflow-y-scroll bg-control-bg border border-control-border rounded filter drop-shadow',

        //

        children,

        // Rest of field

        ...fieldProps

    } = props;

    // Assertions

    if (process.env.NODE_ENV !== 'production') {
        if (showProp !== null && onChangeShowProp == null) {
            console.error('You provided a `show` prop without an `onChangeShow` handler.');
        }
    }

    // State

    const isShowControlled = showProp != null;
    const [internalShow, setInternalShow] = useState(defaultShowProp != null ? defaultShowProp : false);
    const show = isShowControlled ? showProp! : internalShow;

    // Handlers

    const handleShow = useCallback(() => {
        onChangeShowProp?.(true);
        if (!isShowControlled) {
            setInternalShow(true);
        }
    }, [isShowControlled, onChangeShowProp]);

    const handleHide = useCallback(() => {
        if (!isShowControlled) {
            setInternalShow(false);
        }
        onChangeShowProp?.(false);
    }, [isShowControlled, onChangeShowProp]);

    const [internalFieldRef, setInternalFieldRef] = useState<HTMLDivElement | null>(null);
    useImperativeHandle(fieldRef, () => internalFieldRef!);

    const [internalPopperRef, setInternalPopperRef] = useState<HTMLPopperElement | null>(null);
    useImperativeHandle(popperRef, () => internalPopperRef!);

    useOnOutsideClick(show, handleHide, internalFieldRef, internalPopperRef);

    // Field handlers

    // Hide the popper if a blur events happens in the field or the popper and
    // the next active element is outside of both. This handles the case when
    // another element is focused programmatically and not because of a keypress
    // or mousedown. 

    const isShowOnFocus = useRef(false);

    const handleFieldFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(e);
        handleShow();
        isShowOnFocus.current = true;
    }, [handleShow, onFocus]);

    const handleFieldBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
        setTimeout(() => {
            const activeElement = getActiveElement();
            if (
                !(activeElement == null) &&
                (internalPopperRef != null && !internalPopperRef.contains(activeElement))
            ) {
                handleHide();
            }
        }, 0);
        onBlur?.(e);
    }, [internalPopperRef, handleHide, onBlur]);

    const handleFieldClick = useCallback(() => {
        if (!isShowOnFocus.current) {
            if (withToggle) {
                if (show) {
                    handleHide();
                } else {
                    handleShow();
                }
            }
        }
        isShowOnFocus.current = false;
    }, [withToggle, show, handleShow, handleHide]);

    // Popper handlers

    const handlePopperBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        setTimeout(() => {
            const activeElement = getActiveElement();
            if (
                !(activeElement == null) &&
                !(internalFieldRef != null && internalFieldRef?.contains(activeElement)) &&
                !(internalPopperRef != null && internalPopperRef?.contains(activeElement))
            ) {
                handleHide();
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

                hasFocus={show}

                disabled={disabled}
                error={error}

                onFocus={handleFieldFocus}
                onBlur={handleFieldBlur}
                onClick={handleFieldClick}

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

                    onBlur={handlePopperBlur}

                    className={popperClassName}

                >

                    {onPopperBlur && <div tabIndex={0} onFocus={handlePopperLimitBlur} />}
                    {renderPopper()}
                    {onPopperBlur && <div tabIndex={0} onFocus={handlePopperLimitBlur} />}

                </Popper>
            }

        </>
    );

});
