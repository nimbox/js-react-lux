import { CircleCrossIcon } from '@nimbox/icons-react';
import { type MouseEvent, type ReactElement } from 'react';
import { consumeEvent } from '../utilities/consumeEvent';
import { canClear } from './canClear';


//
// ClearOrnament
//

export interface ClearOrnamentProps {

    /**
     * The value the field carries. The cross draws nothing while this is
     * empty.
     */
    value: string;

    /**
     * Empties the field.
     */
    onClear: () => void;

}

/**
 * The cross that empties a field, so that every field offering one offers it on
 * the same terms.
 *
 * The cross only appears once there is something to clear: on an empty field it
 * invites a press that does nothing, and reads as a value the field is failing
 * to show.
 *
 * Clearing runs on `mousedown`, not on `click`. Stopping the click is not
 * enough on its own: a field opens its popper from `onFocus` as well as from
 * `onClick`, and focus lands on mousedown — before the click a handler would
 * see is ever dispatched. A clear written against `click` therefore emptied the
 * value and immediately reopened the list on it, which is the opposite of what
 * clearing is for. Preventing the default on mousedown is what stops the field
 * taking focus at all, and the click that still follows is consumed so it never
 * reaches whatever the field itself does with clicks.
 *
 * @example
 * ```tsx
 * <ClearOrnament value={internalValue} onClear={handleClear} />
 * ```
 */
export function ClearOrnament(props: ClearOrnamentProps): ReactElement | null {

    const { value, onClear } = props;

    const handleMouseDown = (e: MouseEvent) => {
        consumeEvent(e);
        onClear();
    };

    if (!canClear(value)) { return null; }

    return (
        <CircleCrossIcon
            onMouseDown={handleMouseDown}
            onClick={consumeEvent}
            className="cursor-pointer"
        />
    );

}
