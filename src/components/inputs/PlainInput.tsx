import classnames from 'classnames';
import React, { Ref, useContext } from 'react';
import { Context } from './Control';


//
// PlainInput
//

export interface PlainInputProps {

    /**
     * Show the input content as disabled.
     */
    disabled?: boolean;

    /**
     * Show the the input content as an error.
     */
    error?: boolean;

}

export const PlainInput = React.forwardRef((
    props: PlainInputProps & React.InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        disabled,
        error,

        className,

        ...inputProps

    } = props;

    // State

    const context = useContext(Context);
    const isError = error || context.error;

    // Render

    return (

        <input

            ref={inputRef}
            disabled={disabled}

            className={classnames(
                'block w-full',
                'bg-transparent',
                'outline-none focus:outline-none',
                isError ? 'placeholder-danger-500' : 'placeholder-control-placeholder',
                'placeholder-opacity-40',
                className
            )}

            {...inputProps}

        />

    );

});
