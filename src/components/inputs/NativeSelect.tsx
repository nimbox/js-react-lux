import classNames from 'classnames';
import { type ChangeEventHandler, forwardRef, type InputHTMLAttributes, type Ref, useContext } from 'react';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { AngleDownIcon } from '../../icons/components';
import { ControlContext } from './ControlContext';
import { Field, type FieldProps } from './Field';


//
// Select
//

export interface NativeSelectProps extends Omit<FieldProps, 'className'> {

    // Field

    /**
     * Class names to pass to the field.
     */
    fieldClassName?: string;

    // Select

    /** 
     * Default value (for uncontrolled). 
     */
    defaultValue?: string;

    /** 
     * Value (for controlled). 
     */
    value?: string;

    /**
     * Placeholder to show inside the select. If a placeholder is
     * set, the label will be forced to shrink state.
     */
    placeholder?: string;

    /** 
     * Change event handler (for controlled). 
     */
    onChange?: ChangeEventHandler<HTMLSelectElement>;

    // Select Styling

    /**
     * Classe names to pass to the input.
     */
    className?: string;

}


export const NativeSelect = forwardRef((
    props: NativeSelectProps & InputHTMLAttributes<HTMLSelectElement>,
    selectRef: Ref<HTMLSelectElement>
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

        withFullWidth,
        withFullHeight,

        fieldClassName,

        // Select

        onChange,

        className,

        // Rest goes to Input

        ...selectProps

    } = props;

    // Internalize `value`

    const [internalValue, handleInternalValueChange] = useInternalizeValue('', props.defaultValue, props.value, onChange);

    // State

    const context = useContext(ControlContext);
    const isError = error || context.error;

    // Render

    return (

        <Field

            variant={variant}

            label={label}
            start={start}
            end={<>{end}<AngleDownIcon className="pointer-events-none" /></>}

            shrink={shrink || props.placeholder != null || internalValue.length > 0}
            focus={focus}
            disabled={disabled}
            error={error}

            withFullWidth={withFullWidth}
            withFullHeight={withFullHeight}

            className={classNames('focus:outline-none', fieldClassName)}

        >

            <select

                ref={selectRef}
                disabled={disabled}

                onClick={() => { console.log('clicked'); }}
                onChange={handleInternalValueChange}

                className={classNames(
                    'block',
                    '-mr-[1.5em] pr-[1.5em]',
                    'bg-transparent',
                    'outline-none focus:outline-none',
                    isError ? 'placeholder-danger-500' : 'placeholder-control-placeholder',
                    'placeholder-opacity-40',
                    'appearance-none',
                    'cursor-pointer',
                    className
                )}
                style={{ width: 'calc(100% + 1.5em)'}}
                {...selectProps}

            >

                {props.children}

            </select>


        </Field>
    );

});
