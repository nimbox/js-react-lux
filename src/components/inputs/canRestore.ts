/**
 * Whether a field holding this value has anything to restore.
 *
 * The sibling of `canClear`, and the whole of the rule that decides when a
 * restore ornament is offered, so that every field asks the same question. A
 * field is worth restoring when it no longer holds the value it came with;
 * `RestoreOrnament` asks it of itself and draws nothing when the answer is no,
 * and a field asks it directly to decide whether its end slot has to exist at
 * all, since an empty slot still carries the margin the field reserves for one.
 */
export function canRestore(value: string, original: string): boolean {

    return value !== original;

}
