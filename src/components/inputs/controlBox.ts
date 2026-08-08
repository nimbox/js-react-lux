/**
 * The geometry and colours `CheckBox`, `Radio` and `TaskCheckBox` draw
 * themselves from. They share it because they are drawn side by side, often on
 * the same line, where a pixel of drift shows.
 *
 * Class names come out of functions taking `error` so a caller asks once and
 * gets the whole answer. Every branch returns a written-out literal: Tailwind
 * finds class names by reading source text.
 *
 * Internal — not exported from the package.
 */

/**
 * The box, and the wrapper it is drawn inside.
 *
 * That wrapper must hold **no in-flow content**: control and mark both
 * belong in absolute layers. Empty, its baseline is its bottom margin edge,
 * which is where a native checkbox puts its own; given content, the baseline
 * moves to the line box inside and drifts with the line height.
 */
export const controlBoxStyle = { width: '1.25em', height: '1.25em', verticalAlign: '-0.25em' } as const;

/** The mark inside the box. */
export const controlMarkStyle = { width: '0.85em', height: '0.85em' } as const;

/**
 * The corner, in `em` and deliberately not `rounded`. The theme's scale is
 * absolute and starts at 7px, which on a 13–22px box reads as a disc at every
 * size. A radius reads against the box it closes, and this one closes on a
 * letter.
 */
export const controlBoxRadius = '0.25em';

/**
 * The wrapper the box is drawn in.
 *
 * `shrink-0` is what stops a flex row squashing it. A flex item's automatic
 * minimum is its content, and this wrapper is deliberately empty, so that
 * minimum is zero and a greedy sibling — a full-width `Input`, say — takes the
 * lot. A native checkbox never had the problem: being replaced, its intrinsic
 * width was its own floor.
 */
export const controlBoxWrapperClassName = 'relative inline-block shrink-0';

/** The layer the box is painted on, with its mark centred. */
export const controlBoxClassName = 'absolute inset-0 flex items-center justify-center border';

/** Nothing chosen. */
export const controlBoxEmptyClassName = (error = false) =>
    error
        ? 'bg-control-bg border-danger-500'
        : 'bg-control-bg border-control-border';

/**
 * Filled in, carrying its mark against the fill.
 *
 * The mark colours differ because of a theme this library does not have yet.
 * `content` and `content-fg` are a pair, so a dark theme flips both and the
 * mark stays legible. `danger-500` is not half of a pair — it is a mid-dark
 * orange in any theme — so its mark is white in any theme, as
 * `.lux-button-danger` already has it.
 */
export const controlBoxFilledClassName = (error = false) =>
    error
        ? 'bg-danger-500 border-danger-500 text-white'
        : 'bg-content border-content text-content-fg';

/** The same fill, when the control this layer follows is checked. */
export const controlBoxPeerFilledClassName = (error = false) =>
    error
        ? 'peer-checked:bg-danger-500 peer-checked:border-danger-500 peer-checked:text-white'
        : 'peer-checked:bg-content peer-checked:border-content peer-checked:text-content-fg';

/** Hover. An errored box keeps its border — it outranks a hover. */
export const controlBoxHoverClassName = (error = false) =>
    error ? '' : 'not-disabled:hover:border-control-border-hover';

/** Hover, for a layer following the control rather than being it. */
export const controlBoxPeerHoverClassName = (error = false) =>
    error ? '' : 'peer-hover:border-control-border-hover';

/** The focus ring, in the colour of the state it rings. */
export const controlBoxFocusClassName = (error = false) =>
    error
        ? 'focus:ring-2 focus:ring-danger-500/50 focus:ring-offset-0'
        : 'focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-0';

/** The focus ring, for a layer following the control rather than being it. */
export const controlBoxPeerFocusClassName = (error = false) =>
    error
        ? 'peer-focus:ring-2 peer-focus:ring-danger-500/50 peer-focus:ring-offset-0'
        : 'peer-focus:ring-2 peer-focus:ring-primary-500/50 peer-focus:ring-offset-0';

/** A mark on a filled box, where the box does not pass its colour down. */
export const controlMarkFilledClassName = (error = false) =>
    error ? 'text-white' : 'text-content-fg';

/** A mark on an empty box, with no fill to read against. */
export const controlMarkQuietClassName = (error = false) =>
    error ? 'text-danger-500' : 'text-muted';

/**
 * A box and its label. A real `label`, so the text is a hit target and not
 * merely words next to a control.
 *
 * Left as inline flow rather than made a flex row: a flex item's
 * `vertical-align` is ignored, so the box would sit differently with a label
 * than without one, and every story here reads `<Box /> text`.
 */
export const controlLabelClassName = (disabled = false) =>
    disabled ? '' : 'cursor-pointer';

/** The label beside the box. */
export const controlLabelTextClassName = 'ml-2';
