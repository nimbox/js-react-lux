import { type DetailedHTMLProps, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utilities/cn';
import {
    controlBoxClassName, controlBoxEmptyClassName, controlBoxPeerFilledClassName,
    controlBoxPeerFocusClassName, controlBoxPeerHoverClassName, controlBoxStyle,
    controlBoxWrapperClassName, controlLabelClassName, controlLabelTextClassName,
    controlMarkFilledClassName, controlMarkStyle
} from './controlBox';
import { DotMark } from './controlMarks';


export interface RadioProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

    /** Draw the box in error, the way `Field` draws a field in error. */
    error?: boolean;

    /** A label beside the box, which becomes a hit target for it. */
    children?: ReactNode;

    /** Applied to the box, whose font size the `em` sizing resolves against. */
    className?: string;

}

/**
 * A radio button this library draws rather than the browser.
 *
 * The input underneath is a plain native one — `ref`, `checked`, `onChange`,
 * `{...register('colour')}` spread across the group all mean what they mean on
 * one. Only its appearance is taken away, and drawn back on sibling layers.
 *
 * Built like `CheckBox` and for the same reasons, differing only in being round
 * and carrying a dot. There is no `indeterminate` counterpart: `:indeterminate`
 * matches every radio in a group with nothing chosen, so styling it would light
 * up every untouched group on the page.
 *
 * @example
 * ```tsx
 * <Radio value="daily" {...register('frequency')}>Every day</Radio>
 * ```
 */
export function Radio(props: RadioProps) {

    // Properties

    const {

        ref,

        disabled = false,
        error = false,

        children,

        className,
        style,

        // Rest goes to the input

        ...inputProps

    } = props;

    // Render

    const box = (

        <span className={cn(controlBoxWrapperClassName, disabled && 'opacity-40', className)}
            style={{ ...controlBoxStyle, ...style }}
        >

            <input ref={ref} type="radio" {...inputProps}
                disabled={disabled}
                className="peer absolute inset-0 appearance-none focus:outline-none"
            />

            <span aria-hidden="true"
                className={cn(
                    controlBoxClassName, controlBoxEmptyClassName(error),
                    'rounded-full pointer-events-none',
                    controlBoxPeerFilledClassName(error),
                    !disabled && controlBoxPeerHoverClassName(error),
                    controlBoxPeerFocusClassName(error)
                )}
            />

            <span aria-hidden="true"
                className={cn(
                    'absolute inset-0 flex items-center justify-center pointer-events-none',
                    controlMarkFilledClassName(error), 'opacity-0 peer-checked:opacity-100'
                )}
            >
                <DotMark style={controlMarkStyle} />
            </span>

        </span>

    );

    return children == null ? box : (
        <label className={controlLabelClassName(disabled)}>
            {box}
            <span className={controlLabelTextClassName}>{children}</span>
        </label>
    );

}
