import classNames from 'classnames';
import React from 'react';
import { FC, ReactElement, Ref } from 'react';


export type FieldVariant = 'outlined' | 'filled' | 'inlined';

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {

    /**
     * Variant to display the element.
     * @default 'outlined'
     */
    variant?: FieldVariant;

    label?: string;
    shrink?: boolean;

    hasFocus?: boolean;
    hasValue?: boolean;

    /**
     * Show the wrapper content as disabled (currently opacity 50%).
     */
    disabled?: boolean;

    /**
     * Show the wrapper content as error (currently danger color).
     */
    error?: boolean;

    //

    /**
     * Ornament to place at the start of the field.
     */
    start?: ReactElement;

    /**
     * Ornament to place at the end of the field.
     */
    end?: ReactElement;


    /**
     * classes to apply to the wrapper. There is a div surronding the wrapper
     * so that it doesn't conflict with the layout of the component.
     */
    className?: string;

}


/**
 * Field. Container of all inputs that require a focus, disabled, or error
 * display. Assume this elements acts as a `div` without any css classes or
 * style.
 *
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>((props, ref) => {

    // Properties

    const {

        variant = 'outlined',

        label,
        shrink = false,

        hasFocus = false,
        hasValue = false,

        disabled = false,
        error = false,

        start,
        end,

        className,
        children,

        ...divProps

    } = props;

    return (
        <div

            ref={ref}
            {...divProps}

            className={classNames('lux-field', {

                'lux-field-has-label': label,
                'lux-field-shrink': shrink || (hasFocus || hasValue),

                'lux-field-has-focus': hasFocus,
                'lux-field-has-value': hasValue,

                'lux-field-outlined': variant === 'outlined',
                'lux-field-filled': variant === 'filled',
                'lux-field-inlined': variant === 'inlined',

                'lux-field-has-start': start != null,
                'lux-field-has-end': end != null,

                'lux-field-disabled': disabled,
                'lux-field-error': error

            }, className)}

        >

            <div className="lux-field-content">

                {start &&
                    <div className="lux-field-content-start ">
                        {start}
                    </div>
                }

                <div className="lux-field-content-main">
                    {label &&
                        <label className={classNames('lux-field-label')}>
                            {label}
                        </label>
                    }
                    {children}
                </div>

                {end &&
                    <div className="lux-field-content-end">
                        {end}
                    </div>
                }

                {(variant === 'outlined') &&
                    <fieldset className="lux-field-border rounded focus-within:ring focus-within:ring-primary-500 focus-within:ring-opacity-50">
                        {label &&
                            <legend>
                                <span>{label}</span>
                            </legend>
                        }
                    </fieldset>
                }

                {(variant === 'filled' || variant === 'inlined') &&
                    <div className="lux-field-border pointer-events-none rounded-t" />
                }

            </div>

        </div>
    );

});
