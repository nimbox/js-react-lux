import classnames from 'classnames';
import React, { useContext, useImperativeHandle, useRef } from 'react';
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
        withFullWidth,
        withFullHeight,

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

    // render

    return (
        <Wrapper

            variant={variant}
            withFullWidth={withFullWidth}
            withFullHeight={withFullHeight}

            disabled={disabled}
            error={error}

            start={start}
            end={end}

        >
            <textarea

                ref={textAreaRef}

                disabled={disabled}

                className={classnames(
                    'block w-full',
                    'bg-transparent',
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
