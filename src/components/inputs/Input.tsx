import classNames from 'classnames';
import React, { ChangeEventHandler, forwardRef, InputHTMLAttributes, Ref, useImperativeHandle } from 'react';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { Field, FieldProps } from './Field';
import { PlainInput } from './PlainInput';


//
// Input
//

export interface InputProps extends Omit<FieldProps, 'className'> {

    // Field

    /**
     * Class name to pass to the field.
     */
    fieldClassName?: string;

    // Input

    /** 
     * Default value (for uncontrolled). 
     */
    defaultValue?: string;

    /** 
     * Value (for controlled). 
     */
    value?: string;

    /**
     * Placeholder to show inside the input. If a placeholder is set, the label
     * will be forced to shrink state.
     */
    placeholder?: string;

    /** 
     * Change event handler (for controlled). 
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;

    // Input Styling

    /**
     * Classes to apply to the input.
     */
    className?: string;

}

/**
 * This component behaves exactly the same way as an html `input` element. The
 * `ref` and `className` of this component are forwarded to the internal `input`
 * element. Beware that this `input` is wrapped in other components when setting
 * the `className`. To style the field use the `fieldClassName` property.
 */
export const Input = forwardRef((
    props: InputProps & InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        // Field

        variant,

        label,
        start,
        end,

        shrink,
        focus,
        disabled,
        error,

        withFullWidth = true,
        withFullHeight,

        fieldClassName,

        // Input

        onChange,

        className,

        // Rest goes to Input

        ...inputProps

    } = props;

    // Internalize `value`

    const [internalValue, handleChangeInternalValue] = useInternalizeValue('', props.defaultValue, props.value, onChange);
    const internalInputRef = useObservableValueRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => internalInputRef.current!);

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

            <PlainInput

                ref={internalInputRef}
                disabled={disabled}
                error={error}

                onChange={handleChangeInternalValue}

                className={classNames(className, { 'w-full': withFullWidth, 'h-full': withFullHeight })}

                {...inputProps}

            />

        </Field>
    );

});
