import React, { type Ref, useContext } from 'react';
import { cn } from '../utilities/cn';
import { ControlContext } from './ControlContext';


//
// PlainTextArea
//

export interface PlainTextAreaProps {

    ref?: Ref<HTMLTextAreaElement>;

    /**
     * Show the input content as disabled.
     */
    disabled?: boolean;

    /**
     * Show the the input content as an error.
     */
    error?: boolean;

}

export function PlainTextArea(props: PlainTextAreaProps & React.InputHTMLAttributes<HTMLTextAreaElement>) {

    // Properties

    const {

        ref,

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

            ref={ref}

            disabled={disabled}
 
            className={cn(
                'block w-full',
                'bg-transparent',
                'outline-none focus:outline-none',
                isError ? 'placeholder-danger-500/40' : 'placeholder-control-placeholder/40',
                'resize-none',
                className
            )}

            {...textAreaProps}

        />

    );

}
