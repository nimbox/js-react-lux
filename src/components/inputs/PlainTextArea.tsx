import classnames from 'classnames';
import React, { type Ref, useContext } from 'react';
import { ControlContext } from './ControlContext';


//
// PlainTextArea
//

export interface PlainTextAreaProps {

    /**
     * Show the input content as disabled.
     */
    disabled?: boolean;

    /**
     * Show the the input content as an error.
     */
    error?: boolean;

}

export const PlainTextArea = React.forwardRef((
    props: PlainTextAreaProps & React.InputHTMLAttributes<HTMLTextAreaElement>,
    inputRef: Ref<HTMLTextAreaElement>
) => {

    // Properties

    const {

        disabled,
        error,

        className,

        ...textAreaProps

    } = props;

    // State

    const context = useContext(ControlContext);
    const isError = error || context.error;

    // Render

    return (

        <textarea

            ref={inputRef}

            disabled={disabled}
 
            className={classnames(
                'block w-full',
                'bg-transparent',
                'outline-none focus:outline-none',
                isError ? 'placeholder-danger-500' : 'placeholder-control-placeholder',
                'placeholder-opacity-40',
                'resize-none',
                className
            )}

            {...textAreaProps}

        />

    );

});
