import classNames from 'classnames';
import { FC, ReactElement } from 'react';


export type FieldVariant = 'outlined' | 'filled' | 'inlined';

export interface FieldProps {

    variant?: FieldVariant;

    label?: string;
    shrink?: boolean;

    hasFocus?: boolean;
    hasValue?: boolean;

    disabled?: boolean;
    error?: boolean;

    start?: ReactElement;
    end?: ReactElement;

    className?: string;

}


/**
 * Field. this is the documentation.
 * 
 * @param props 
 * @returns 
 */
export const Field: FC<FieldProps> = (props) => {

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

        children

    } = props;

    return (
        <div className={classNames('lux-field', {

            'lux-field-has-label': label,
            'lux-field-shrink': shrink || (hasFocus || hasValue),

            'lux-field-has-focus': hasFocus,
            'lux-field-has-value': hasValue,

            'lux-field-outlined': variant === 'outlined',
            'lux-field-filled': variant === 'filled',
            'lux-field-inlined': variant === 'inlined',

            'lux-field-has-start': start != null,
            'lux-field-has-end': end != null,

            'lux-field-has-disabled': disabled,
            'lux-field-has-error': error

        }, className)}>

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

};
