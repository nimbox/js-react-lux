import { type ChangeEventHandler, type InputHTMLAttributes, type Ref } from 'react';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { cn } from '../utilities/cn';
import { Field, type FieldProps } from './Field';
import { PlainTextArea } from './PlainTextArea';


//
// TextArea
//

export interface TextAreaProps extends Omit<FieldProps, 'className' | 'ref'> {

    ref?: Ref<HTMLTextAreaElement>;

    // Field

    /**
     * Class name to pass to the field.
     */
    fieldClassName?: string;

    // TextArea

    /** 
     * Name used for the input element and returned in the change event. 
     */
    name?: string;

    /** 
     * Default value (for uncontrolled). 
     */
    defaultValue?: string;

    /** 
     * Value (for controlled). 
     */
    value?: string;

    /**
     * Placeholder to show inside the text area. If a placeholder is
     * set, the label will be forced to shrink state.
     */
    placeholder?: string;

    /** 
     * Change event handler (for controlled). 
     */
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;

    // TextArea Styling

    /**
     * Classes to apply to the input.
     */
    className?: string;

}

export function TextArea(props: TextAreaProps & InputHTMLAttributes<HTMLTextAreaElement>) {

    // Properties

    const {

        ref,

        // Field

        variant,

        label,
        start,
        end,

        shrink,
        focus,
        disabled,
        error,

        withFullWidth,
        withFullHeight,

        fieldClassName,

        // TextArea

        onChange,

        className,

        // Rest goes to TextArea

        ...textAreaProps

    } = props;

    // Internalize `value`

    const [internalValue, handleChangeInternalValue] = useInternalizeValue('', props.defaultValue, props.value, onChange);

    // Render

    return (
        <Field

            variant={variant}

            label={label}
            start={start}
            end={end}

            shrink={shrink || props.placeholder != null || internalValue.length > 0}
            focus={focus}
            disabled={disabled}
            error={error}

            withFullWidth={withFullWidth}
            withFullHeight={withFullHeight}
            className={fieldClassName}

        >

            <PlainTextArea

                ref={ref}

                disabled={disabled}
                error={error}

                onChange={handleChangeInternalValue}

                className={cn(className, { 'w-full': withFullWidth, 'h-full': withFullHeight })}

                {...textAreaProps}

            />

        </Field>
    );

}
