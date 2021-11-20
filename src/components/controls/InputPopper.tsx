
import classnames from 'classnames';
import React, { Ref, useContext, useImperativeHandle, useRef, useState } from 'react';
import { PopperProps } from '../Popper';
import { Context } from './Control';
import { WrapperProps } from './Wrapper';
import { WrapperPopper } from './WrapperPopper';


//
// InputPopper
//

export interface InputPopperProps extends WrapperProps, Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    // for input

    /** Name used for the input element and returned in the change event. */
    name?: string,

    /** String representation of the color (for uncontrolled). */
    defaultValue?: string,

    /** String representation of the color (for controlled). */
    value?: string,

    /** Change event handler (for controlled). */
    onChange?: React.ChangeEventHandler<HTMLInputElement>,

    // for popper

    /** Show popper. */
    show?: boolean;

    /** Callback to invoke when needing to show popper. */
    onShow?: () => void;

    /** Callback to invoke when needing to hide popper.. */
    onHide?: () => void;

    /** Callback that returns the element to include inside the popper. */
    popper: () => React.ReactElement;

}

export const InputPopper = React.forwardRef((
    props: InputPopperProps & React.InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
) => {

    // properties

    const {

        variant,
        withFullWidth,

        onFocus,
        onBlur,

        error,
        disabled,

        start,
        end,

        className,

        withPlacement: placement,
        withArrow,
        withSameWidth,

        show,
        onShow,
        onHide,

        popper,

        ...inputProps

    } = props;

    // configuration

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const context = useContext(Context);

    const handleMouseDown = () => {
        if (document.activeElement === inputRef.current) {
            console.log('is active');
            if (show) {
                onHide!();
            } else {
                onShow!();
            }
        }
    }

    const [focus, setFocus] = useState(false);
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(e);
        setFocus(true);
        onShow?.(); 
    }
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        onHide?.();
        setFocus(false);
        onBlur?.(e);
    }

    // render

    return (
        <WrapperPopper

            ref={wrapperRef}

            variant={variant}
            withFullWidth={withFullWidth}

            focus={focus}
            disabled={disabled}
            error={error}

            start={start}
            end={end}

            withPlacement={placement}
            withArrow={withArrow}
            withSameWidth={withSameWidth}

            show={show}
            onHide={onHide}
            popper={popper}

        >
            <input

                ref={inputRef}

                onMouseDown={handleMouseDown}

                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}

                className={classnames(
                    'block w-full',
                    'outline-none focus:outline-none',
                    error || context.error ? 'placeholder-danger-500' : 'placeholder-control-placeholder',
                    'placeholder-opacity-40',
                    className
                )}

                {...inputProps}

            />
        </WrapperPopper>
    );

});
