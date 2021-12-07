
import classnames from 'classnames';
import React, { Ref, useContext, useImperativeHandle, useRef } from 'react';
import { Context } from './Control';
import { WrapperPopper, WrapperPopperProps } from './WrapperPopper';


//
// InputPopper
//

export interface InputPopperProps extends WrapperPopperProps {

    // Input

    /** 
     * Name used for the input element and returned in the change event. 
     */
    name?: string,

    /** 
     * String representation of the color (for uncontrolled). 
     */
    defaultValue?: string,

    /** 
     * String representation of the color (for controlled). 
     */
    value?: string,

    /** 
     * Change event handler (for controlled). 
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>,

}

export const InputPopper = React.forwardRef((
    props: InputPopperProps & React.InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        // Wrapper

        variant,
        withFullWidth,
        withFullHeight,

        disabled,
        error,

        start,
        end,

        // Popper

        withPlacement,
        withArrow,
        withSameWidth,

        defaultShow,
        show,
        onChangeShow,

        renderPopper,

        // Input

        className,

        ...inputProps

    } = props;

    // State

    const context = useContext(Context);
    const isError = error || context.error;;

    // Render

    return (
        <WrapperPopper

            variant={variant}
            withFullWidth={withFullWidth}
            withFullHeight={withFullHeight}

            disabled={disabled}
            error={error}

            start={start}
            end={end}

            withPlacement={withPlacement}
            withArrow={withArrow}
            withSameWidth={withSameWidth}

            defaultShow={defaultShow}
            show={show}
            onChangeShow={onChangeShow}

            renderPopper={renderPopper}

        >
            <input

                ref={inputRef}

                disabled={disabled}

                className={classnames(
                    'block w-full',
                    'outline-none focus:outline-none',
                    isError ? 'placeholder-danger-500' : 'placeholder-control-placeholder',
                    'placeholder-opacity-40',
                    className
                )}

                {...inputProps}

            />
        </WrapperPopper>
    );

});
