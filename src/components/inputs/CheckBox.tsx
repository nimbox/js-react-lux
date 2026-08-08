import { type DetailedHTMLProps, type InputHTMLAttributes, type ReactNode, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../utilities/cn';
import {
    controlBoxClassName, controlBoxEmptyClassName, controlBoxPeerFilledClassName,
    controlBoxPeerFocusClassName, controlBoxPeerHoverClassName, controlBoxRadius,
    controlBoxStyle, controlBoxWrapperClassName, controlLabelClassName,
    controlLabelTextClassName, controlMarkFilledClassName,
    controlMarkQuietClassName, controlMarkStyle
} from './controlBox';
import { CheckMark, MinusMark } from './controlMarks';


export interface CheckBoxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

    /**
     * Neither checked nor unchecked — some of what this stands for is, some
     * is not. Set through the ref, since React does not manage it.
     */
    indeterminate?: boolean;

    /** Draw the box in error, the way `Field` draws a field in error. */
    error?: boolean;

    /** A label beside the box, which becomes a hit target for it. */
    children?: ReactNode;

    /** Applied to the box, whose font size the `em` sizing resolves against. */
    className?: string;

}

/**
 * A checkbox this library draws rather than the browser.
 *
 * The input underneath is a plain native one — `ref`, `checked`, `onChange`,
 * `{...register('accepted')}` all mean what they mean on one. Only its
 * appearance is taken away, and drawn back on sibling layers.
 *
 * The mark follows `:checked` in CSS, so it cannot hold a stale copy of the
 * answer; `disabled` and `indeterminate` are props, so those branch here.
 * Everything is absolutely positioned for two reasons that agree: `peer-*`
 * reaches siblings only, and the wrapper must stay empty. See `controlBox.ts`.
 *
 * @example
 * ```tsx
 * <CheckBox {...register('accepted')}>I accept the terms</CheckBox>
 * ```
 */
export function CheckBox(props: CheckBoxProps) {

    // Properties

    const {

        ref,

        indeterminate = false,
        disabled = false,
        error = false,

        children,

        className,
        style,

        // Rest goes to the input

        ...inputProps

    } = props;

    // State

    const internalInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => internalInputRef.current!);

    // The browser clears `indeterminate` on a click of its own accord; a caller
    // that wants it back sets the prop again from `onChange`.
    useEffect(() => {
        if (internalInputRef.current != null) {
            internalInputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    // Render

    const box = (

        <span className={cn(controlBoxWrapperClassName, disabled && 'opacity-40', className)}
            style={{ ...controlBoxStyle, ...style }}
        >

            <input ref={internalInputRef} type="checkbox" {...inputProps}
                disabled={disabled}
                className="peer absolute inset-0 appearance-none focus:outline-none"
            />

            <span aria-hidden="true"
                className={cn(
                    controlBoxClassName, controlBoxEmptyClassName(error), 'pointer-events-none',
                    !indeterminate && controlBoxPeerFilledClassName(error),
                    !disabled && controlBoxPeerHoverClassName(error),
                    controlBoxPeerFocusClassName(error)
                )}
                style={{ borderRadius: controlBoxRadius }}
            />

            <span aria-hidden="true"
                className={cn(
                    'absolute inset-0 flex items-center justify-center pointer-events-none',
                    indeterminate
                        ? controlMarkQuietClassName(error)
                        : cn(controlMarkFilledClassName(error), 'opacity-0 peer-checked:opacity-100')
                )}
            >
                {indeterminate
                    ? <MinusMark style={controlMarkStyle} />
                    : <CheckMark style={controlMarkStyle} />
                }
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
