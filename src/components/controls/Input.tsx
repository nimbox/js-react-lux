import classnames from 'classnames';
import React, { useContext, useImperativeHandle, useRef, useState } from 'react';
import { Context } from './Control';
import { Wrapper, WrapperProps } from './Wrapper';


//
// Input
//

export interface InputProps extends WrapperProps {
}

export const Input = React.forwardRef<HTMLInputElement, InputProps & React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {

    // properties

    const {

        variant,
        withFullWidth: withNoFull,

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

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onFocus) { onFocus(e); }
        setFocus(true);
    }
    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false);
        if (onBlur) { onBlur(e); }
    }

    // render

    return (
        <Wrapper

            variant={variant}
            withFullWidth={withNoFull}

            focus={focus}
            disabled={disabled}
            error={error}

            start={start}
            end={end}

        >
            <input

                ref={inputRef}

                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
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
