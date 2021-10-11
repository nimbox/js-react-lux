import classnames from 'classnames';
import React, { useContext, useImperativeHandle, useRef, useState } from 'react';
import { Context } from './Control';
import { Wrapper, WrapperProps } from './Wrapper';


//
// TextArea
//

export interface TextAreaProps extends WrapperProps {
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps & React.InputHTMLAttributes<HTMLTextAreaElement>>((props, ref) => {

    // properties

    const {

        variant,
        withNoFull,

        onFocus,
        onBlur,
        error,
        disabled,

        start,
        end,

        className,

        ...textAreaProps

    } = props;

    // configuration

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => textAreaRef.current!);

    const context = useContext(Context);
    const [focus, setFocus] = useState(false);

    const handleOnFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (onFocus) { onFocus(e); }
        setFocus(true);
    }
    const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setFocus(false);
        if (onBlur) { onBlur(e); }
    }

    // render

    return (
        <Wrapper

            variant={variant}
            withNoFull={withNoFull}

            focus={focus}
            disabled={disabled}
            error={error}

            start={start}
            end={end}

        >
            <textarea

                ref={textAreaRef}

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

                {...textAreaProps}

            />
        </Wrapper>
    );

});
