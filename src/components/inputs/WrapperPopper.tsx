import React, { type Ref, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { type HTMLPopperElement, Popper, type PopperProps } from '../Popper';
import { getActiveElement } from '../utilities/getActiveElement';
import { Wrapper, type WrapperProps } from './Wrapper';


//
// WrapperPopper
//

export interface WrapperPopperProps extends WrapperProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    /**
     * Toggle visibiiity of the popper when a click is detected on the wrapper.
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

export const WrapperPopper = React.forwardRef((
    props: WrapperPopperProps & React.HTMLAttributes<HTMLDivElement>,
    wrapperRef: Ref<HTMLDivElement>
) => {

    // Properties

    const {

        // Wrapper

        disabled,
        error,

        onFocus,
        onBlur,

        // Popper 

        popperRef,

        withPlacement,
        withArrow,
        withSameWidth,

        // WrapperPopper

        withToggle = true,

        defaultShow,
        show: propsShow,
        onChangeShow: propsOnChangeShow,

        renderPopper,
        onPopperBlur,
        popperClassName = 'max-h-96 overflow-y-scroll bg-control-bg border border-control-border rounded filter drop-shadow',

        //

        children,

        // wrapper

        ...wrapperProps

    } = props;

    // Assertions

    // if (process.env.NODE_ENV !== 'production') {
    //     if (propsShow !== null && propsOnChangeShow == null) {
    //         console.error('You provided a `show` prop without an `onChangeShow` handler.');
    //     }
    // }

    // State

    const isShowControlled = propsShow != null;
    const [internalShow, setInternalShow] = useState(defaultShow != null ? defaultShow : false);
    const show = isShowControlled ? propsShow! : internalShow;

    // Handlers

    const handleShow = useCallback(() => {
        propsOnChangeShow?.(true);
        if (!isShowControlled) {
            setInternalShow(true);
        }
    }, [isShowControlled, propsOnChangeShow]);

    const handleHide = useCallback(() => {
        if (!isShowControlled) {
            setInternalShow(false);
        }
        propsOnChangeShow?.(false);
    }, [isShowControlled, propsOnChangeShow]);

    const [internalWrapperRef, setInternalWrapperRef] = useState<HTMLDivElement | null>(null);
    useImperativeHandle(wrapperRef, () => internalWrapperRef!);

    const [internalPopperRef, setInternalPopperRef] = useState<HTMLPopperElement | null>(null);
    useImperativeHandle(popperRef, () => internalPopperRef!);

    useOnOutsideClick(show, handleHide, internalWrapperRef, internalPopperRef);

    // Wrapper handlers

    // Hide the popper if a blur events happens in the wrapper or the popper and
    // the next active element is outside of both. This handles the case when
    // another element is focused programmatically and not because of a keypress
    // or mousedown. 

    const isShowOnFocus = useRef(false);

    const handleWrapperFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(e);
        handleShow();
        isShowOnFocus.current = true;
    }, [handleShow, onFocus]);

    const handleWrapperBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
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

    const handleWrapperClick = useCallback(() => {
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

    const handlePopperBlur = () => {
        setTimeout(() => {
            const activeElement = getActiveElement();
            if (
                !(activeElement == null) &&
                !(internalWrapperRef != null && internalWrapperRef?.contains(activeElement)) &&
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

            <Wrapper

                ref={setInternalWrapperRef}

                disabled={disabled}
                error={error}

                onFocus={handleWrapperFocus}
                onBlur={handleWrapperBlur}
                onClick={handleWrapperClick}

                {...wrapperProps}

            >

                {children}

            </Wrapper>

            {show && !disabled &&

                <Popper

                    ref={setInternalPopperRef}
                    reference={internalWrapperRef!}

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
