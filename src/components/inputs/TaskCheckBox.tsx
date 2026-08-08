import { CheckIcon, MinusIcon } from '@nimbox/icons-react';
import { type FC } from 'react';
import { cn } from '../utilities/cn';


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
 * the box cannot tell which half of the pair it is — which is exactly why a
 * single component serves both. Naming the states `fulfilled` or `declined`
 * would have made it pick a side it does not know.
 */
export type TaskCheckBoxState = 'idle' | 'positive' | 'negative';

export interface TaskCheckBoxProps {

    /**
     * How the task stands.
     */
    state: TaskCheckBoxState;

    /**
     * Whether this outcome is the reader's to decide. A box that is not theirs
     * is still drawn — the state is worth reading whoever you are — it simply
     * cannot be pressed.
     */
    disabled?: boolean;

    /**
     * Called when the box is pressed. What the next state is, is the caller's
     * to decide: the box reports the press and redraws from the `state` it is
     * given back, so nothing here has to know the rules.
     */
    onChange?: () => void;

    /**
     * Shown on hover. Worth setting on a disabled box too — see the note on the
     * wrapper below.
     */
    'data-tooltip'?: string;

    children?: never;

}

/**
 * The box a task's outcome is read from and decided in.
 *
 * <h2>Why the tooltip is on the wrapper</h2>
 *
 * `TooltipProvider` finds a tooltip by listening for `mouseover` on `window` and
 * walking up from the target with `closest('[data-tooltip]')`, so it needs the
 * disabled box to dispatch a `mouseover` at all — and a box you cannot press is
 * the one case where the reader most needs telling why.
 *
 * Chrome does dispatch it: hovering the disabled button was measured raising
 * `mouseover` with the button as target, and the attribute resolves whether it
 * sits on the button or on this span. So in Chrome the wrapper changes nothing.
 * It is here for the engines that suppress mouse events on disabled form
 * controls, which Gecko has long done — the case this was *not* measured
 * against. A span costs nothing and takes the behaviour off that difference.
 *
 * <h2>Sizing</h2>
 *
 * In `em`, like `CheckBox`, so a row can size its boxes by setting a font size
 * rather than by knowing pixels. `vertical-align` sits it on the text baseline,
 * which is why it must stay an inline-level box: a flex item has no baseline to
 * offer when it is empty, and the empty state is the common one.
 *
 * The corner is in `em` too, and deliberately not the `rounded` utility. The
 * theme's radius scale is absolute and starts at `--radius: 0.5rem` — 7px, set
 * for controls the size of a field. On a box of 13 to 22px that is most of the
 * half-width, so the square reads as a disc, and it reads as a disc at *every*
 * size because the radius does not grow with it. The theme says as much itself:
 * a radius reads against the size of the box it closes. This box closes on a
 * letter, so its corner is measured in the same unit as the box.
 */
export const TaskCheckBox: FC<TaskCheckBoxProps> = ({ state, disabled = false, onChange, 'data-tooltip': dataTooltip }) => (

    <span data-tooltip={dataTooltip} className="inline-block" style={{ verticalAlign: '-0.25em' }}>
        <button type="button"
            disabled={disabled}
            onClick={onChange}
            className={cn(
                'inline-flex items-center justify-center align-top border',
                state === 'positive'
                    ? 'bg-content border-content text-content-fg'
                    : 'bg-control-bg border-control-border',
                'disabled:opacity-40 not-disabled:hover:border-control-border-hover',
                'focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-0'
            )}
            style={{ width: '1.25em', height: '1.25em', borderRadius: '0.25em' }}
        >
            {state === 'positive' &&
                <CheckIcon className="stroke-2" style={{ width: '0.85em', height: '0.85em' }} />
            }
            {state === 'negative' &&
                <MinusIcon className="-rotate-45 text-muted" style={{ width: '0.85em', height: '0.85em' }} />
            }
        </button>
    </span>

);

/**
 * The space a `TaskCheckBox` would have taken.
 *
 * For an outcome a task does not have — most often approval, on a task with no
 * accountable. Drawn rather than omitted so that the text of every row in a list
 * starts at the same place; a column that collapses on some rows and not others
 * is harder to read than one that is occasionally empty.
 *
 * It ships here rather than in each caller because it has to match the box's
 * size exactly, and the box is the only thing that knows that size.
 */
export const TaskCheckBoxSlot: FC<{ children?: never }> = () => (
    <span className="inline-block" style={{ width: '1.25em', height: '1.25em', verticalAlign: '-0.25em' }} />
);
