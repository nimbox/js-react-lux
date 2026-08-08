import { type ChangeEventHandler, type FocusEvent, type FocusEventHandler, type InputHTMLAttributes, type ReactNode, type Ref, useImperativeHandle, useRef } from 'react';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { cn } from '../utilities/cn';
import { setRefInputValue } from '../utilities/setRefInputValue';
import {
    controlBoxClassName, controlBoxEmptyClassName, controlBoxFilledClassName,
    controlBoxFocusClassName, controlBoxHoverClassName, controlBoxRadius,
    controlBoxStyle, controlBoxWrapperClassName, controlLabelClassName,
    controlLabelTextClassName, controlMarkQuietClassName, controlMarkStyle
} from './controlBox';
import { CheckMark, SlashMark } from './controlMarks';


/**
 * How a task's outcome stands.
 *
 * <ul>
 * <li>`idle` — nobody has decided yet.</li>
 * <li>`positive` — decided, and the answer was yes: done, or approved.</li>
 * <li>`negative` — decided, and the answer was no: rejected, or not
 * approved.</li>
 * </ul>
 *
 * Named for the shape of the decision rather than for any one of the words a
 * task uses for it. A box drawn for the responsible reads `negative` as
 * *rejected* and one drawn for the accountable reads it as *not approved*, and
 * the box cannot tell which it is — which is why one component serves both.
 */
export type TaskCheckBoxState = 'idle' | 'positive' | 'negative';

/** Anything that is not a decision reads as `idle`, including the empty string
 * a `reset` leaves behind. */
const toTaskCheckBoxState = (value: string): TaskCheckBoxState =>
    value === 'positive' || value === 'negative' ? value : 'idle';

/** A press fills an empty box and empties a decided one, whichever way it was
 * decided. `negative` is reached from outside, never from a press. */
const nextTaskCheckBoxState = (state: TaskCheckBoxState): TaskCheckBoxState =>
    state === 'idle' ? 'positive' : 'idle';

export interface TaskCheckBoxProps {

    ref?: Ref<HTMLInputElement>;

    /**
     * How the task stands, when the caller holds the state. A press moves
     * between `idle` and `positive`; `negative` is only ever set from outside,
     * because giving up on a task is not the same gesture as doing it.
     */
    value?: TaskCheckBoxState;

    /**
     * How the task stands to begin with, when the box holds its own state.
     *
     * @default `'idle'`
     */
    defaultValue?: TaskCheckBoxState;

    /** Called on a press, with the new state in `event.target.value`. */
    onChange?: ChangeEventHandler<HTMLInputElement>;

    /**
     * Whether this outcome is the reader's to decide. A box that is not theirs
     * is still drawn — the state is worth reading whoever you are.
     */
    disabled?: boolean;

    /** Draw the box in error, the way `Field` draws a field in error. */
    error?: boolean;

    /** A label beside the box, which becomes a hit target for it. */
    children?: ReactNode;

    /** Shown on hover. Worth setting on a disabled box too — see below. */
    'data-tooltip'?: string;

}

/**
 * The box a task's outcome is read from and decided in.
 *
 * It behaves as an `input`: `ref`, `name`, `value` / `defaultValue`, `onChange`
 * and `onBlur` mean what they mean on one, so `{...register('execution')}` is
 * all react-hook-form needs.
 *
 * No native control draws three states, so the box is a `button` and the value
 * lives in an `input` beside it that nothing can reach — no tab stop, no
 * pointer, no pixels. A press writes through `setRefInputValue`, which fires
 * the `input` event the way the browser would. The `ref` handed out is that
 * input, with `focus` sent on to the button, which is the part that can show a
 * ring.
 *
 * `data-tooltip` sits on the wrapper rather than the button because Gecko
 * suppresses mouse events on disabled controls, and a box you cannot press is
 * the one that most owes the reader a reason. Chrome resolves it from either.
 *
 * Geometry is `controlBox.ts`, and the note there on the wrapper holding
 * nothing in flow applies: button and input are both out of flow. The button
 * cannot carry the alignment itself — a button's synthesized baseline is its
 * padding edge, so the border alone offsets it by a pixel.
 *
 * @example
 * ```tsx
 * <TaskCheckBox {...register('execution')} />
 * ```
 */
export function TaskCheckBox(props: TaskCheckBoxProps & InputHTMLAttributes<HTMLInputElement>) {

    // Properties

    const {

        ref,

        name,

        value,
        defaultValue,

        onChange,
        onBlur,

        disabled = false,
        error = false,

        children,

        'data-tooltip': dataTooltip,

        // Rest goes to the input

        ...inputProps

    } = props;

    // State

    const [internalValue, handleChangeInternalValue] = useInternalizeValue('idle', defaultValue, value, onChange);
    const state = toTaskCheckBoxState(internalValue);

    const internalInputRef = useObservableValueRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => {
        // `setFocus` and `shouldFocusError` call `focus` on what they were
        // handed, and that is the invisible input. Defined rather than
        // assigned because `focus` is not always writable — jsdom's is not.
        const element = internalInputRef.current!;
        Object.defineProperty(element, 'focus', {
            configurable: true,
            value: () => buttonRef.current?.focus()
        });
        return element;
    });

    // Handlers

    const handlePress = () => setRefInputValue(internalInputRef, nextTaskCheckBoxState(state));

    // The blur that matters is the button's — the input is never focused. The
    // button carries the same `name`, which is what a form reads off the
    // target; the value it then looks for it reads off the ref.
    const handleBlur: FocusEventHandler<HTMLButtonElement> = (event) =>
        onBlur?.(event as unknown as FocusEvent<HTMLInputElement>);

    // Render

    const box = (

        <span data-tooltip={dataTooltip} className={controlBoxWrapperClassName} style={controlBoxStyle}>

            <button ref={buttonRef} type="button"
                name={name}
                role="checkbox"
                // `mixed` stands for `negative`, not `idle`: a press runs
                // between `idle` and `positive`, so an idle box is an unchecked
                // one, and `negative` is what aria has no other word for.
                aria-checked={state === 'positive' ? true : state === 'negative' ? 'mixed' : false}
                disabled={disabled}
                onClick={handlePress}
                onBlur={handleBlur}
                className={cn(
                    controlBoxClassName,
                    state === 'positive' ? controlBoxFilledClassName(error) : controlBoxEmptyClassName(error),
                    'disabled:opacity-40',
                    controlBoxHoverClassName(error),
                    controlBoxFocusClassName(error)
                )}
                style={{ borderRadius: controlBoxRadius }}
            >
                {state === 'positive' &&
                    <CheckMark style={controlMarkStyle} />
                }
                {state === 'negative' &&
                    <SlashMark className={controlMarkQuietClassName(error)} style={controlMarkStyle} />
                }
            </button>

            <input ref={internalInputRef} type="text" {...inputProps}
                tabIndex={-1}
                name={name}
                readOnly
                disabled={disabled}
                value={value}
                defaultValue={value == null ? defaultValue ?? 'idle' : undefined}
                onChange={handleChangeInternalValue}
                className="absolute left-0 top-0 w-full text-xs opacity-0 pointer-events-none"
            />

        </span>

    );

    return children == null ? box : (
        <label className={controlLabelClassName(disabled)}>
            {box}
            <span className={controlLabelTextClassName}>{children}</span>
        </label>
    );

}

/**
 * The space a `TaskCheckBox` would have taken, for an outcome a task does not
 * have — most often approval, on a task with no accountable.
 *
 * Drawn rather than omitted so every row's text starts in the same place; a
 * column that collapses on some rows is harder to read than one occasionally
 * empty. It ships here because it has to match the box exactly, and the box is
 * the only thing that knows that size.
 */
export function TaskCheckBoxSlot() {

    return (
        <span className="inline-block shrink-0" style={controlBoxStyle} />
    );

}
