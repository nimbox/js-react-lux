import classNames from 'classnames';
import React, { Ref } from 'react';
import { Field, FieldProps } from './Field';
import { PlainTextArea } from './PlainTextArea';


//
// TextArea
//

export interface TextAreaProps extends FieldProps {

    /**
     * Class name to pass to the field.
     */
    fieldClassName?: string;

}

export const TextArea = React.forwardRef((
    props: TextAreaProps & React.InputHTMLAttributes<HTMLTextAreaElement>,
    textAreaRef: Ref<HTMLTextAreaElement>
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
        ...textAreaProps

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
            <PlainTextArea

                ref={textAreaRef}

                disabled={disabled}
                error={error}

                className={classNames(className, { 'w-full': fullWidth, 'h-full': fullHeight })}

                {...textAreaProps}

            />
        </Field>
    );

});
