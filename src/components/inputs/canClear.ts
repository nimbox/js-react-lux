/**
 * Whether a field holding this value has anything to clear.
 *
 * This is the whole of the rule that decides when a clear cross is offered, so
 * that every field asks the same question of its own value. `ClearOrnament`
 * asks it of itself and draws nothing when the answer is no; a field only needs
 * to ask it directly to decide whether its end slot has to exist at all, since
 * an empty slot still carries the margin the field reserves for one.
 */
export function canClear(value: string): boolean {

    return value.length > 0;

}
