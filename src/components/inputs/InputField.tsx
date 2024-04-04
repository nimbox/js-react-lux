import classNames from 'classnames';
import React, { ReactElement, useRef, useState } from 'react';
import { Field, FieldProps } from './Field';


export interface InputFieldProps extends Omit<FieldProps, 'className'> {

    defaultValue?: string | ReadonlyArray<string> | number | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;

    className?: string;
    fieldClassName?: string;

}

export const InputField = (props: InputFieldProps): ReactElement => {

    const {

        variant,

        label,
        start,
        end,

        defaultValue,
        value,

        shrink,
        focus: hasFocusProp,
        disabled,
        error,

        className,
        fieldClassName

    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const [internalValue, setInternalValue] = useState<string | ReadonlyArray<string> | number | undefined>(value != null ? value : defaultValue);

    const [hasValue, setHasValue] = useState(internalValue != null && internalValue !== '');
    const [hasFocus, setHasFocus] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInternalValue(event.target.value);
        setHasValue(event.target.value != null && event.target.value !== '');
    };

    // Render

    return (
        <Field

            variant={variant}

            label={label}
            start={start}
            end={end}

            shrink={shrink || hasFocus || hasValue}
            focus={hasFocusProp || hasFocus}
            disabled={disabled}
            error={error}

            className={classNames('', fieldClassName)}

        >
            <input

                ref={inputRef}
                type="text"

                value={internalValue}
                onChange={handleChange}

                disabled={disabled}

                className={classNames('lux-control-font outline-none focus:outline-none bg-transparent', className)}

                onFocus={() => setHasFocus(true)}
                onInput={(e) => console.log('e', e)}
                onBlur={() => setHasFocus(false)}

            />

        </Field>
    );

};
