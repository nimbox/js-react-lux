import classNames from 'classnames';
import React, { ReactElement } from 'react';


//
// Field
//

export type FieldVariant = 'outlined' | 'filled' | 'inlined' | 'plain';

export interface FieldProps {

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
     * Force the field to be at full width. 
     */
    withFullWidth?: boolean;

    /**
     * Force the field to be at full height.
     */
    withFullHeight?: boolean;

    /**
     * Classes to apply to the field container.
     */
    className?: string;

}


/**
 * Field. Container of all inputs. Assume this elements acts as a `div` without
 * any css classes or style.
 *
 * A field has three types of adornments, a label that can be shrinked, and a
 * start or end element to place on boths sides of the child element. The start
 * and end adornments are placed using the `crux` layout.
 *
 * There are four parameters that affect the display of the field:
 *
 * - **`shrink`**: When `true` the label is placed at the top left location.
 *   When `false` it is placed as the placeholder.
 * - **`focus`**: When `true` the field is hilighted as focused. Usually when a
 *   field is focused the label must be placed in `shrink` state, but the
 *   component does not do this for you. When using this make sure that
 *   `shrink={hasFocus || hasValue}`.
 * - **`disabled`**: When `true` the field shows as disabled.
 * - **`error`**: When `true` the field shows as error.
 *
 * Focus is automaticaly applied when any children is in focus using the pseudo
 * class `:focus-within`, so no need to control `focus` for simple input
 * elements.
 *
 * In terms of styling there are two parameters and the className. The
 * parameters are:
 *
 * - **`withFullWidth`**: When `true` the field is at full width. It just adds a
 *   `w-full` to the base container. You must add the `w-full` to the child
 *   element to fully occupy the whole width.
 * - **`withFullHeight`**: When `true` the field is at full height. It just adds
 *   a `h-full` to the base container. You must add the `h-full` to the child
 *   element to fully occupy the whole height.
 *
 * The `className` is placed at the base container and it can interact with the
 * layout of the field. Use only for styling font sizes and colors.
 */
export const Field = React.forwardRef((
    props: FieldProps & React.HTMLAttributes<HTMLDivElement>,
    divRef: React.Ref<HTMLDivElement>
) => {

    // Properties

    const {

        // Field

        variant = 'outlined',

        label,
        start,
        end,

        shrink = false,
        focus = false,
        disabled = false,
        error = false,

        withFullWidth = false,
        withFullHeight = false,
        className,

        children,

        ...divProps

    } = props;

    return (

        <div

            ref={divRef}

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
                'lux-field-inlined': variant === 'inlined'

            }, {
                'w-full': withFullWidth,
                'h-full': withFullHeight
            }, className)}

            {...divProps}

        >

            {start &&
                <div className="lux-crux-start lux-field-start">
                    {start}
                </div>
            }

            <div className={classNames('lux-crux-content lux-field-content', {
                'w-full': withFullWidth,
                'h-full': withFullHeight
            })}>
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
