import classNames from 'classnames';
import React, { ReactElement } from 'react';


export type FieldVariant = 'outlined' | 'filled' | 'inlined';

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {

    // Variant

    /**
     * Variant to display the element.
     * @default outlined
     */
    variant?: FieldVariant;

    // Ornaments

    /**
     * Label to us as placeholder or as label for the field. The position of the
     * label depends on the `shrink` state.
     */
    label?: string;

    /**
     * Ornament to place at the start of the field.
     */
    start?: ReactElement;

    /**
     * Ornament to place at the end of the field.
     */
    end?: ReactElement;

    // Display

    /**
     * Label state. When shrink is `true` the label is shown at the top left
     * location. When is `false` it is shown as the placeholder.
     */
    shrink?: boolean;

    /**
     * Force focus display. Usefull when the field is a trigger for a popper.
     * When the popper has the focus you can force ths original field to also
     * show focus. When `hasFocus` is `true`, the label is displayed in `shrink`
     * state.
     */
    focus?: boolean;

    /**
     * Show the wrapper content as disabled (currently opacity 50%).
     */
    disabled?: boolean;

    /**
     * Show the wrapper content as error (currently danger color).
     */
    error?: boolean;

    // Styling

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
        start,
        end,

        shrink = false,
        focus = false,
        disabled = false,
        error = false,

        className,

        children,

        ...divProps

    } = props;

    return (

        <div

            ref={ref}
            {...divProps}

            className={classNames('lux-crux lux-field', {

                // Crux classes

                'lux-crux-empty': children == null,

                'lux-crux-disabled': disabled,
                'lux-crux-error': error,

                // Field classes

                'lux-field-has-label': label,

                'lux-field-has-start': start != null,
                'lux-field-has-end': end != null,

                'lux-field-shrink': shrink,
                'lux-field-focus': focus,
                'lux-field-disabled': disabled,
                'lux-field-error': error,

                'lux-field-outlined': variant === 'outlined',
                'lux-field-filled': variant === 'filled',
                'lux-field-inlined': variant === 'inlined',

            }, className)}>

            {start &&
                <div className="lux-crux-start lux-field-start">
                    {start}
                </div>
            }

            <div className="lux-crux-content lux-field-content">
                {label &&
                    <label className={classNames('lux-field-label')}>
                        {label}
                    </label>
                }
                {children || <>&#8203;</>}  {/* Use a zero width space to keep the baseline when no children is present. */}
            </div>

            {end &&
                <div className="lux-crux-end lux-field-end">
                    {end}
                </div>
            }

            {(variant === 'outlined') &&
                <fieldset className="lux-field-border">
                    {label &&
                        <legend>
                            <span>{label}</span>
                        </legend>
                    }
                </fieldset>
            }

            {(variant === 'filled' || variant === 'inlined') &&
                <div className="lux-field-border" />
            }

        </div>

    );

});
