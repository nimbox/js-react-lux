import classNames from 'classnames';
import React, { Ref } from 'react';
import { Field, FieldProps } from './Field';
import { PlainInput } from './PlainInput';


//
// Input
//

export interface InputProps extends FieldProps {

    /** 
     * Name used for the input element and returned in the change event. 
     */
    name?: string;

    /** 
     * String representation of the color (for uncontrolled). 
     */
    defaultValue?: string;

    /** 
     * String representation of the color (for controlled). 
     */
    value?: string;

    /** 
     * Change event handler (for controlled). 
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;

    /**
     * Class name to pass to the field.
     */
    fieldClassName?: string;

}

export const Input = React.forwardRef((
    props: InputProps & React.InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        // Field

        variant,

        start,
        end,

        disabled,
        error,

        fullWidth,
        fullHeight,
        fieldClassName,

        // Input

        className,
        ...inputProps

    } = props;

    // Render

    return (
        <Field

            variant={variant}

            start={start}
            end={end}

            disabled={disabled}
            error={error}

            fullWidth={fullWidth}
            fullHeight={fullHeight}
            className={fieldClassName}

        >

            <PlainInput

                ref={inputRef}

                disabled={disabled}
                error={error}

                className={classNames(className, { 'w-full': fullWidth, 'h-full': fullHeight })}

                {...inputProps}

            />

        </Field>
    );

});
