import { RefreshIcon } from '@nimbox/icons-react';
import { type MouseEvent, type ReactElement } from 'react';
import { consumeEvent } from '../utilities/consumeEvent';
import { canRestore } from './canRestore';


//
// RestoreOrnament
//

export interface RestoreOrnamentProps {

    /**
     * The value the field carries. The ornament draws nothing while this equals
     * `original`.
     */
    value: string;

    /**
     * What the field falls back to — the value it held before anyone changed it.
     */
    original: string;

    /**
     * Puts `original` back.
     */
    onRestore: () => void;

}

/**
 * The ornament that puts a field back to the value it came with, so that every
 * field offering one offers it on the same terms.
 *
 * The sibling of `ClearOrnament`, and the difference is what the two mean rather
 * than how they behave: a clear empties a field, a restore returns it to a value
 * that already exists somewhere else — a default, a name a channel supplied, a
 * setting inherited from a parent. A field with a meaningful fallback wants this
 * one; a field whose empty state *is* the fallback wants the cross.
 *
 * Named for the job and not the glyph, as `ClearOrnament` is: `RefreshIcon` also
 * stands for "give me another random one" in `SwatchPicker`, and an ornament
 * named after it would cover two unrelated acts.
 *
 * It appears only once there is something to restore, for the reason the cross
 * has: an ornament that does nothing invites a press that does nothing.
 *
 * Restoring runs on `mousedown`, matching `ClearOrnament` — see the note there
 * for why an ornament inside a field cannot wait for the click. Consuming the
 * mousedown is what stops the field taking focus, and the click that still
 * follows is consumed so it never reaches whatever the field does with clicks.
 *
 * @example
 * ```tsx
 * <RestoreOrnament value={name} original={channelName} onRestore={handleRestore} />
 * ```
 */
export function RestoreOrnament(props: RestoreOrnamentProps): ReactElement | null {

    const { value, original, onRestore } = props;

    const handleMouseDown = (e: MouseEvent) => {
        consumeEvent(e);
        onRestore();
    };

    if (!canRestore(value, original)) { return null; }

    return (
        <RefreshIcon
            onMouseDown={handleMouseDown}
            onClick={consumeEvent}
            className="cursor-pointer"
        />
    );

}
