import React, { Ref } from 'react';
import { PlainInput } from './PlainInput';
import { Wrapper, WrapperProps } from './Wrapper';


//
// Input
//

export interface InputProps extends WrapperProps {

    /** Name used for the input element and returned in the change event. */
    name?: string,

    /** String representation of the color (for uncontrolled). */
    defaultValue?: string,

    /** String representation of the color (for controlled). */
    value?: string,

    /** Change event handler (for controlled). */
    onChange?: React.ChangeEventHandler<HTMLInputElement>,

}

export const Input = React.forwardRef((
    props: InputProps & React.InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // properties

    const {

        // Wrapper

        variant,
        disabled,
        error,

        start,
        end,

        // Input

        className,

        ...inputProps

    } = props;

    // render

    return (

        <Wrapper

            variant={variant}
            disabled={disabled}
            error={error}

            start={start}
            end={end}

        >

            <PlainInput

                ref={inputRef}

                disabled={disabled}
                error={error}

                {...inputProps}

            />

        </Wrapper>

    );

});
