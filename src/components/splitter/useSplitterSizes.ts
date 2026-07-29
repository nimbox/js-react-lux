import { useCallback, useMemo } from 'react';
import { useInternalize } from '../../hooks/useInternalize';
import { PersistentState } from '../../persistent/PersistentState';


/**
 * How far past its minimum a collapsible pane must be dragged before it
 * snaps shut, in pixels. Large enough that a jittery pointer never
 * triggers it, small enough that the gesture still feels immediate.
 */
export const COLLAPSE_THRESHOLD = 24;

/**
 * A pane size that carries its own unit. `"240px"` pins the pane to 240
 * pixels; `"3fr"` gives it three shares of whatever the pinned panes
 * leave over. Because the unit rides along with the value, a size stays
 * unambiguous everywhere it travels — a change callback, local storage,
 * a controlled `sizes` array.
 */
export type PaneSize = `${number}px` | `${number}fr`;

/** A `PaneSize` taken apart. */
export interface ParsedSize {
    value: number;
    unit: 'px' | 'fr';
}

const SIZE_PATTERN = /^(\d*\.?\d+)(px|fr)$/;

/** Read a `PaneSize`, or `null` when the string is not one. */
export function parseSize(size: string): ParsedSize | null {

    const match = SIZE_PATTERN.exec(size.trim());
    if (match == null) { return null; }

    const value = Number(match[1]);
    if (!Number.isFinite(value)) { return null; }

    return { value, unit: match[2] as 'px' | 'fr' };

}

const pixels = (value: number): PaneSize => `${value}px`;
const shares = (value: number): PaneSize => `${value}fr`;

/** What one pane declares about how it may be sized. */
export interface PaneOptions {

    /**
     * Whether the pane is measured in pixels rather than as a share of
     * the space the pinned panes leave over — that is, whether its
     * declared size was given in `px`.
     */
    pinned: boolean;

    /** The value of the pane's declared size, or `null` when it declares none. */
    defaultSize: number | null;

    /** Smallest size, in pixels, the pane may be dragged to. */
    minimumSize: number;

    /** Whether the pane may snap shut when dragged past its minimum. */
    collapsible: boolean;

}


//
// Sizing maths — pure functions over pixel sizes, shared by the pointer
// drag, the keyboard nudges and the double-click reset so every gesture
// resolves a boundary the exact same way.
//
// A stored size means one of two things depending on its pane: pixels for
// a pinned pane, a relative share of the leftover space for a flexible
// one. Keeping pinned panes in pixels is what lets CSS grid hold them
// steady while the container resizes.
//

/**
 * The layout a set of panes starts on before anyone has dragged. A pane
 * that declares no size takes a single share, which is what makes an
 * undeclared row an even split.
 */
export function initialSizes(options: PaneOptions[]): PaneSize[] {

    return options.map((pane) => pane.pinned
        ? pixels(pane.defaultSize ?? 0)
        : shares(pane.defaultSize ?? 1));

}

/**
 * Turn measured pixel sizes back into stored sizes: pinned panes keep
 * their pixels, flexible panes become shares of the space left over.
 *
 * @remarks
 * Dividing the flexible panes by their own total — rather than by the
 * whole container — is what keeps the untouched panes still. When a
 * pinned pane grows by 80px the leftover shrinks by exactly 80px too, so
 * every other flexible pane's share rises by the amount needed to land on
 * the same pixel size it already had.
 */
export function toStoredSizes(pixelSizes: number[], options: PaneOptions[]): PaneSize[] {

    const flexibleTotal = pixelSizes.reduce(
        (total, size, index) => options[index].pinned ? total : total + size,
        0
    );

    return pixelSizes.map((size, index) => {
        if (options[index].pinned) { return pixels(Math.max(0, size)); }
        return shares(flexibleTotal > 0 ? size / flexibleTotal : 1);
    });

}

/**
 * Sanitize a caller-supplied or persisted layout, degrading to the panes'
 * own declared layout rather than rendering a broken grid.
 *
 * @remarks
 * The unit check is what makes a persisted layout safe to restore. A
 * stored `"0.5fr"` against a pane that now declares `"240px"` describes a
 * splitter that no longer exists, and reading it as pixels — or as a
 * share — would both be wrong. Rejecting it costs the reader their saved
 * layout once; accepting it would lay out the wrong thing forever.
 */
export function normalizeSizes(sizes: PaneSize[] | undefined, options: PaneOptions[]): PaneSize[] {

    if (sizes == null || sizes.length !== options.length) { return initialSizes(options); }

    const isValid = sizes.every((size, index) => {
        const parsed = parseSize(size);
        return parsed != null && (parsed.unit === 'px') === options[index].pinned;
    });

    return isValid ? sizes : initialSizes(options);

}

/**
 * The pixel size the pane before divider `index` takes when its boundary
 * moves by `delta`, honouring both neighbours' minimums and the collapse
 * snap.
 */
export function resolveLeadingSize(pixelSizes: number[], index: number, delta: number, options: PaneOptions[]): number {

    const available = pixelSizes[index] + pixelSizes[index + 1];
    const desired = pixelSizes[index] + delta;

    const leading = options[index];
    const trailing = options[index + 1];

    // A collapsible neighbour snaps shut once the drag pushes it a full
    // threshold past its minimum; dragging back out lands it on the
    // minimum again, so the pane never rests at an unusable size.

    if (leading.collapsible && desired < leading.minimumSize - COLLAPSE_THRESHOLD) { return 0; }
    if (trailing.collapsible && available - desired < trailing.minimumSize - COLLAPSE_THRESHOLD) { return available; }

    // The bounds are clamped against each other so a pair too small to
    // honour both minimums degrades to a sensible split instead of
    // producing a negative size.

    const lower = Math.min(leading.minimumSize, available);
    const upper = Math.max(lower, available - trailing.minimumSize);
    return Math.min(upper, Math.max(lower, desired));

}

/**
 * Move the boundary at `index` so the pane before it takes exactly
 * `leadingSize` pixels. Only the two adjacent panes change; every other
 * pane keeps the pixels it had, which is what makes the result stable
 * across a long drag.
 */
export function setLeadingSize(pixelSizes: number[], index: number, leadingSize: number, options: PaneOptions[]): PaneSize[] {

    const next = [...pixelSizes];
    const available = next[index] + next[index + 1];
    next[index] = leadingSize;
    next[index + 1] = available - leadingSize;
    return toStoredSizes(next, options);

}

/** Move the boundary at `index` by `delta` pixels. */
export function resizePanes(pixelSizes: number[], index: number, delta: number, options: PaneOptions[]): PaneSize[] {

    return setLeadingSize(pixelSizes, index, resolveLeadingSize(pixelSizes, index, delta, options), options);

}


//
// useSplitterSizes
//

export interface SplitterSizesOptions {

    /** One entry per pane, in document order. */
    panes: PaneOptions[];

    /** Controlled sizes, one per pane. */
    sizes?: PaneSize[];

    /** Initial sizes when uncontrolled. */
    defaultSizes?: PaneSize[];

    onSizesChange?: (sizes: PaneSize[]) => void;

    /** Key to store the layout under in the shared `PersistentState`. */
    persistenceKey?: string;

}

/**
 * The single source of truth for a `Splitter`'s layout, returned as
 * stored sizes plus a commit function.
 *
 * @remarks
 * The starting layout comes from the first of: the stored layout for
 * `persistenceKey`, `defaultSizes`, the panes' own declared sizes.
 * Persistence goes through `PersistentState` directly rather than
 * `usePersistentState` because that hook subscribes to cross-tab
 * `storage` events, which would yank the layout out from under an
 * in-flight drag.
 *
 * A persisted layout that no longer describes the panes — a pane added,
 * removed, or switched between `px` and `fr` — is discarded by
 * `normalizeSizes` rather than misread.
 */
export function useSplitterSizes(options: SplitterSizesOptions): [PaneSize[], (sizes: PaneSize[]) => void] {

    const { panes, sizes, defaultSizes, onSizesChange, persistenceKey } = options;

    const persistentState = useMemo(() => PersistentState.getInstance(), []);

    const storedSizes = useMemo(
        () => (persistenceKey != null ? persistentState.get<PaneSize[] | null>(persistenceKey, null) : null),
        [persistenceKey, persistentState]
    );

    const handleChange = useCallback((next: PaneSize[]) => {
        if (persistenceKey != null) { persistentState.set(persistenceKey, next); }
        onSizesChange?.(next);
    }, [persistenceKey, persistentState, onSizesChange]);

    // `useInternalize` prefers its `defaultValue` over its
    // `initialValue`, so the stored layout is passed as the default and
    // the panes' declared sizes as the fallback.

    const [rawSizes, setRawSizes] = useInternalize<PaneSize[]>(
        initialSizes(panes),
        storedSizes ?? defaultSizes,
        sizes,
        handleChange
    );

    return [normalizeSizes(rawSizes, panes), setRawSizes];

}
