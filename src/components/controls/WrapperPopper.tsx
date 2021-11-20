import React, { Ref, useImperativeHandle, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { getActiveElement } from '../../utilities/getActiveElement';
import { Popper, PopperProps } from '../Popper';
import { Wrapper, WrapperProps } from './Wrapper';


//
// WrapperPopper
//

export interface WrapperPopperProps extends WrapperProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    popperRef?: Ref<HTMLDivElement>;

    show?: boolean;

    onHide?: () => void;

    onTabOutside?: () => void;

    popper: () => React.ReactElement;

    popperClassName?: string;

}

export const WrapperPopper = React.forwardRef((
    props: WrapperPopperProps & React.HTMLAttributes<HTMLDivElement>,
    wrapperRef: Ref<HTMLDivElement>
) => {

    // properties

    const {

        withPlacement,
        withArrow,
        withSameWidth,

        popperRef,

        show = false,
        onHide,
        onTabOutside,

        onFocus,
        onBlur,

        popper,
        popperClassName,

        children,

        ...wrapperProps

    } = props;


    // configuration

    // const internalWrapperRef = useRef<HTMLDivElement>(null);
    // const internalPopperRef = useRef<HTMLDivElement>(null);

    const [internalWrapperRef, setInternalWrapperRef] = useState<HTMLDivElement | null>(null);
    const [internalPopperRef, setInternalPopperRef] = useState<HTMLDivElement | null>(null);

    useOnOutsideClick(show, () => onHide?.(), internalWrapperRef, internalPopperRef);

    useImperativeHandle(wrapperRef, () => internalWrapperRef!);
    useImperativeHandle(popperRef, () => internalPopperRef!);

    // handlers

    const [internalFocus, setInternalFocus] = useState(false);

    // Hide the popper if a blur events happens in the wrapper or the popper and
    // the next active element is outside of both. This handles the case when
    // another element is focused programmatically and not because of a keypress
    // or mousedown. 

    const handleWrapperFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(e);
        setInternalFocus(true);
    }

    const handleWrapperBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        setTimeout(() => {
            const activeElement = getActiveElement();
            if (
                !(activeElement == null) &&
                (internalPopperRef != null && !internalPopperRef.contains(activeElement))
            ) {
                onHide?.();
            }
        }, 0);
        setInternalFocus(false);
        onBlur?.(e);
    };

    const handlePopperBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        setTimeout(() => {
            const activeElement = getActiveElement();
            if (
                !(activeElement == null) &&
                !(internalWrapperRef != null && internalWrapperRef?.contains(activeElement)) &&
                !(internalPopperRef != null && internalPopperRef?.contains(activeElement))
            ) {
                onHide?.();
            }
        }, 0);
    };

    // Hide the popper it a focus event is received before or after any of the
    // focusable elements inside the popper.

    const handlePopperLimitFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        e.target.blur();
        onTabOutside?.();
    };

    // render

    return (
        <>

            <Wrapper

                ref={setInternalWrapperRef}

                focus={internalFocus}
                onFocus={handleWrapperFocus}
                onBlur={handleWrapperBlur}

                {...wrapperProps}

            >

                {children}

            </Wrapper>

            {show &&

                <Popper

                    ref={setInternalPopperRef}
                    reference={internalWrapperRef!}

                    withPlacement={withPlacement}
                    withArrow={withArrow}
                    withSameWidth={withSameWidth}

                    onBlur={handlePopperBlur}

                    className="bg-control-bg border border-control-border rounded overflow-hidden filter drop-shadow-lg"

                >

                    {onTabOutside && <div tabIndex={0} onFocus={handlePopperLimitFocus} />}
                    {popper()}
                    {onTabOutside && <div tabIndex={0} onFocus={handlePopperLimitFocus} />}

                </Popper>
            }

        </>
    );

});
