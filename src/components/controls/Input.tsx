import classnames from 'classnames';
import React, { Ref, useContext, useImperativeHandle, useRef, useState } from 'react';
import { Context } from './Control';
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

        ...inputProps

    } = props;

    // configuration

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const context = useContext(Context);

    const [focus, setFocus] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(e);
        setFocus(true);
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false);
        onBlur?.(e);
    }

    // render

    return (
        <Wrapper

            variant={variant}
            withFullWidth={withFullWidth}

            focus={focus}
            disabled={disabled}
            error={error}

            start={start}
            end={end}

        >
            <input

                ref={inputRef}

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
        </Wrapper>
    );

});
