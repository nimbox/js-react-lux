
import React, { Ref } from 'react';
import { PlainInput } from './PlainInput';
import { WrapperPopper, WrapperPopperProps } from './WrapperPopper';


//
// InputPopper
//

export interface InputPopperProps extends WrapperPopperProps {

    // Wrapper

    wrapperClassName?: string;

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
     * Change event handler (for uncontrolled and controlled).
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>,

}

/**
 * InputPopper is a wrapper for the input element that provides a customizable
 * popper.
 */
export const InputPopper = React.forwardRef((
    props: InputPopperProps & React.InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        // Wrapper

        variant,
        disabled,
        error,

        start,
        end,

        wrapperClassName,

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

    // Render

    return (
        <WrapperPopper

            variant={variant}
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

            className={wrapperClassName}

        >

            <PlainInput

                ref={inputRef}

                disabled={disabled}
                error={error}

                {...inputProps}

            />

        </WrapperPopper>
    );

});
