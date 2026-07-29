import React, { Children, isValidElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utilities/cn';
import { parseSize, resizePanes, setLeadingSize, useSplitterSizes, type PaneOptions, type PaneSize } from './useSplitterSizes';

export type { PaneSize } from './useSplitterSizes';


//
// Splitter
//

/**
 * Thickness of a divider track, in pixels. Zero by default: the
 * divider reserves no layout space, so the panes touch and the handle
 * floats over the seam.
 */
const DIVIDER_SIZE = 0;

/** How far one arrow keypress moves a boundary, in pixels. */
const KEYBOARD_STEP = 16;

/** Everything a gesture needs, snapshotted when the pointer goes down. */
interface DragSnapshot {

    index: number;
    pointerId: number;

    startCoordinate: number;

    /** Stored sizes to restore to when the gesture is cancelled. */
    startSizes: PaneSize[];

    /** Measured pixel sizes the whole gesture resolves against. */
    pixelSizes: number[];

}

export interface SplitterProps extends React.HTMLAttributes<HTMLDivElement> {

    ref?: React.Ref<HTMLDivElement>;

    /** 
     * Axis the panes are laid out along. `horizontal` places them
     * side by side.
     */
    direction?: 'horizontal' | 'vertical';

    /** Controlled sizes, one per pane. Each carries its own unit. */
    sizes?: PaneSize[];

    /**
     * Initial sizes when uncontrolled. Defaults to the panes' own
     * declared sizes — an even split for panes that declare none.
     */
    defaultSizes?: PaneSize[];

    /** Callback to invoke when the sizes change. */
    onSizesChange?: (sizes: PaneSize[]) => void;

    /** Store the layout under this key so it survives a reload. */
    persistenceKey?: string;

    /** Freeze every divider. */
    disabled?: boolean;

    /**
     * Extra classes for the dividers' visible bar. A `bg-*` here
     * becomes the divider's resting color; the hover, focus and
     * dragging colors still win over it.
     */
    dividerClassName?: string;

    /** The panes to render. */
    children?: React.ReactNode;

}

/**
 * A row or column of panes with a draggable divider between each
 * adjacent pair. Every size carries its own unit: a pane sized in `fr`
 * takes a share of the space and keeps its proportion as the container
 * resizes, while one sized in `px` holds that many pixels and lets the
 * others absorb the change — a `"120px"` sidebar stays 120px on a wider
 * window.
 *
 * @remarks
 * The container is a CSS grid, and a stored size is very nearly the track
 * it becomes: `"3fr"` renders as `minmax(0, 3fr)`, `"120px"` as
 * `minmax(0, 120px)`. The `minmax(0, …)` earns its keep in both cases —
 * an `fr` track otherwise has a `min-content` floor and a pane with wide
 * content would refuse to shrink, and a `px` track would refuse to yield
 * when the pinned panes together ask for more room than there is.
 *
 * The dividers take no space and paint nothing at rest, so the panes
 * touch: the grab area and the bar that fades in on hover both float over
 * the seam. Put a border on a pane when a permanent seam is wanted.
 *
 * @example
 * ```tsx
 * <Splitter direction="horizontal" persistenceKey="workspace/columns">
 *     <Splitter.Pane defaultSize="120px" minimumSize={80} collapsible><Navigator /></Splitter.Pane>
 *     <Splitter.Pane><Editor /></Splitter.Pane>
 *     <Splitter.Pane defaultSize="240px"><Inspector /></Splitter.Pane>
 * </Splitter>
 * ```
 */
export function Splitter(props: SplitterProps) {

    // Properties

    const {
        ref,
        direction = 'horizontal',
        sizes,
        defaultSizes,
        onSizesChange,
        persistenceKey,
        disabled = false,
        dividerClassName,
        className,
        style,
        children,
        ...divProps
    } = props;

    const { t } = useTranslation();

    const isHorizontal = direction === 'horizontal';

    // Pane options come from the children's props rather than from the
    // DOM: the track template needs them on the very first render, before
    // any pane element exists to read them off.

    const panes = Children.toArray(children).filter(isValidElement);
    const paneOptions = panes.map(readPaneOptions);
    const [currentSizes, setSizes] = useSplitterSizes({ panes: paneOptions, sizes, defaultSizes, onSizesChange, persistenceKey });

    const containerRef = useRef<HTMLDivElement | null>(null);
    const dragRef = useRef<DragSnapshot | null>(null);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [paneSizes, setPaneSizes] = useState<number[]>([]);

    const setRefs = (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') { ref(node); }
        else if (ref != null) { (ref as React.RefObject<HTMLDivElement | null>).current = node; }
    };

    // Measurement — the panes' current pixel sizes, read straight from the
    // DOM in document order. The `:scope >` qualifier keeps a nested
    // splitter's panes out of the result.

    const measure = useCallback((): number[] | null => {

        const container = containerRef.current;
        if (container == null) { return null; }

        const elements = Array.from(container.querySelectorAll<HTMLElement>(':scope > [data-splitter-pane]'));
        if (elements.length < 2) { return null; }

        return elements.map((element) => {
            const rect = element.getBoundingClientRect();
            return isHorizontal ? rect.width : rect.height;
        });

    }, [isHorizontal]);

    // The ARIA values report a real ratio, which stored sizes cannot give
    // once pinned panes are in play: a pane holding 120 pixels and one
    // holding a 0.5 share are not comparable numbers. So the panes are
    // measured, and observed, purely to keep those values honest.

    useLayoutEffect(() => {

        const container = containerRef.current;
        if (container == null) { return; }

        const update = () => {
            const measured = measure();
            if (measured == null) { return; }
            setPaneSizes((previous) => (
                previous.length === measured.length && previous.every((size, index) => size === measured[index])
                    ? previous
                    : measured
            ));
        };

        update();

        if (typeof ResizeObserver === 'undefined') { return; }
        const observer = new ResizeObserver(update);
        observer.observe(container);
        container.querySelectorAll<HTMLElement>(':scope > [data-splitter-pane]').forEach((pane) => observer.observe(pane));
        return () => observer.disconnect();

    }, [measure, panes.length]);

    // Drag — the snapshot lives in a ref rather than state because the
    // handlers must read an authoritative value synchronously. State
    // would lag a render behind, so a burst of moves in one frame would
    // all resolve against the same stale geometry.

    const endDrag = useCallback(() => {
        dragRef.current = null;
        setDraggingIndex(null);
    }, []);

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>, index: number) => {

        if (disabled) { return; }
        const pixelSizes = measure();
        if (pixelSizes == null) { return; }

        event.currentTarget.setPointerCapture?.(event.pointerId);
        dragRef.current = {
            index,
            pointerId: event.pointerId,
            startCoordinate: isHorizontal ? event.clientX : event.clientY,
            startSizes: currentSizes,
            pixelSizes
        };
        setDraggingIndex(index);

    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {

        const drag = dragRef.current;
        if (drag == null) { return; }

        const coordinate = isHorizontal ? event.clientX : event.clientY;
        setSizes(resizePanes(drag.pixelSizes, drag.index, coordinate - drag.startCoordinate, paneOptions));

    };

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {

        const drag = dragRef.current;
        if (drag == null) { return; }

        if (event.currentTarget.hasPointerCapture?.(drag.pointerId)) {
            event.currentTarget.releasePointerCapture(drag.pointerId);
        }
        endDrag();

    };

    // Escape cancels an in-flight drag. It listens on the window because
    // the pointer, not the keyboard, owns the gesture — the divider need
    // not be the focused element.

    useEffect(() => {

        if (draggingIndex == null) { return; }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') { return; }
            const drag = dragRef.current;
            if (drag == null) { return; }
            setSizes(drag.startSizes);
            endDrag();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [draggingIndex, endDrag, setSizes]);

    const toggleCollapse = (index: number, pixelSizes: number[]) => {

        const available = pixelSizes[index] + pixelSizes[index + 1];
        const leading = paneOptions[index];
        const trailing = paneOptions[index + 1];

        // Expanding restores the pane to its minimum — the smallest size
        // at which it is usable — or to half the pair when it declared no
        // minimum.

        if (leading.collapsible) {
            const expanded = Math.min(leading.minimumSize || available / 2, available);
            setSizes(setLeadingSize(pixelSizes, index, pixelSizes[index] === 0 ? expanded : 0, paneOptions));
        } else if (trailing.collapsible) {
            const expanded = Math.min(trailing.minimumSize || available / 2, available);
            setSizes(setLeadingSize(pixelSizes, index, pixelSizes[index + 1] === 0 ? available - expanded : available, paneOptions));
        }

    };

    // Keyboard — the arrows along the axis nudge the boundary, Home/End
    // drive it to the extremes and Enter toggles a collapsible
    // neighbour. Everything commits through the same maths as the drag.

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {

        if (disabled) { return; }
        const pixelSizes = measure();
        if (pixelSizes == null) { return; }

        const available = pixelSizes[index] + pixelSizes[index + 1];
        const nudge = (delta: number) => setSizes(resizePanes(pixelSizes, index, delta, paneOptions));

        const decreaseKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
        const increaseKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

        switch (event.key) {

            case decreaseKey:
                event.preventDefault();
                nudge(-KEYBOARD_STEP);
                break;

            case increaseKey:
                event.preventDefault();
                nudge(KEYBOARD_STEP);
                break;

            case 'Home':
                event.preventDefault();
                nudge(-available);
                break;

            case 'End':
                event.preventDefault();
                nudge(available);
                break;

            case 'Enter':
                event.preventDefault();
                toggleCollapse(index, pixelSizes);
                break;

        }

    };

    // Double click restores the two panes around the divider to an even
    // share of the space they already occupy, leaving every other pane
    // untouched.

    const handleDoubleClick = (index: number) => {

        if (disabled) { return; }
        const pixelSizes = measure();
        if (pixelSizes == null) { return; }

        setSizes(setLeadingSize(pixelSizes, index, (pixelSizes[index] + pixelSizes[index + 1]) / 2, paneOptions));

    };

    // Render — a stored size already carries its unit, so it drops
    // straight into the track with no branch on the pane's kind.
    //
    // `minmax(0, …)` rather than the bare size: on an `fr` track the zero
    // floor replaces a `min-content` floor that would stop a pane with
    // wide content from shrinking, and on a `px` track it lets the track
    // give way when the pinned panes together ask for more than the
    // container has, instead of overflowing it. The stored size is
    // untouched by that squeeze, so a pane springs back as soon as the
    // room returns.

    const tracks = panes.flatMap((_, index) => {
        const track = `minmax(0, ${currentSizes[index]})`;
        return index === 0 ? [track] : [`${DIVIDER_SIZE}px`, track];
    });

    return (
        <div
            ref={setRefs}
            data-splitter=""
            className={cn(
                'grid h-full w-full',
                draggingIndex != null && cn('select-none', isHorizontal ? 'cursor-col-resize' : 'cursor-row-resize'),
                className
            )}
            style={{ [isHorizontal ? 'gridTemplateColumns' : 'gridTemplateRows']: tracks.join(' '), ...style }}
            {...divProps}
        >
            {panes.map((pane, index) => (
                <React.Fragment key={pane.key ?? index}>
                    {index > 0 && (
                        <SplitterDivider
                            direction={direction}
                            disabled={disabled}
                            isDragging={draggingIndex === index - 1}
                            value={percentageOfPair(paneSizes, index - 1)}
                            label={t('splitter.divider', { defaultValue: 'Resize panes' })}
                            className={dividerClassName}
                            onPointerDown={(event) => handlePointerDown(event, index - 1)}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                            onDoubleClick={() => handleDoubleClick(index - 1)}
                            onKeyDown={(event) => handleKeyDown(event, index - 1)}
                        />
                    )}
                    {pane}
                </React.Fragment>
            ))}
        </div>
    );

}


//
// Splitter.Pane — one resizable region. Declares its own limits; the
// splitter reads them off the DOM when a gesture starts.
//

export interface SplitterPaneProps extends React.HTMLAttributes<HTMLDivElement> {

    ref?: React.Ref<HTMLDivElement>;

    /**
     * Size the pane starts on, and the unit decides how it behaves.
     * `"240px"` pins the pane: it holds those pixels as the container
     * resizes and the other panes absorb the change. `"3fr"` gives it
     * three shares of whatever the pinned panes leave over. Omit it for
     * a single share.
     *
     * Either way this is a starting size, not a lock — dragging sets a
     * new one in the same unit.
     */
    defaultSize?: PaneSize;

    /** Smallest size, in pixels, the pane may be dragged to. */
    minimumSize?: number;

    /** Let the pane snap shut when dragged past its minimum. */
    collapsible?: boolean;

    children?: React.ReactNode;

}

export function SplitterPane({ ref, defaultSize, minimumSize = 0, collapsible = false, className, children, ...divProps }: SplitterPaneProps) {

    // The splitter reads these options off the props, not the DOM — it
    // needs them on the first render, before any pane element exists.
    // They are mirrored as data attributes anyway: they make a layout
    // legible in devtools and give stylesheets something to hook onto.

    return (
        <div
            ref={ref}
            data-splitter-pane=""
            data-pinned={parseSize(defaultSize ?? '')?.unit === 'px' ? '' : undefined}
            data-default-size={defaultSize}
            data-minimum-size={minimumSize}
            data-collapsible={collapsible ? '' : undefined}
            className={cn('min-w-0 min-h-0 overflow-hidden', className)}
            {...divProps}
        >
            {children}
        </div>
    );

}


//
// SplitterDivider — the boundary control. Private: a divider only makes
// sense between two panes, so the splitter places them itself.
//

interface SplitterDividerProps extends React.HTMLAttributes<HTMLDivElement> {
    direction: 'horizontal' | 'vertical';
    disabled: boolean;
    isDragging: boolean;
    /** The leading pane's share of the adjacent pair, as a percentage. */
    value: number;
    label: string;
}

function SplitterDivider({ direction, disabled, isDragging, value, label, className, ...divProps }: SplitterDividerProps) {

    const isHorizontal = direction === 'horizontal';

    return (
        <div
            role="separator"
            tabIndex={disabled ? undefined : 0}
            aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label}
            aria-disabled={disabled || undefined}
            data-splitter-divider=""
            data-dragging={isDragging ? '' : undefined}
            className={cn(
                'group relative z-10 touch-none select-none outline-none',
                !disabled && (isHorizontal ? 'cursor-col-resize' : 'cursor-row-resize')
            )}
            {...divProps}
        >
            {/* The grab area. The divider track has no width, so this
                straddles the seam to give the pointer something to aim at.
                Sized in pixels rather than spacing units: it is a hit
                target, so it must not ride the root font size.
                `touch-action` is not an inherited property, so it needs its
                own `touch-none` or a touch drag scrolls the page. */}
            <div className={cn('absolute touch-none', isHorizontal ? 'inset-y-0 -inset-x-[4px]' : 'inset-x-0 -inset-y-[4px]')} />

            {/* The visible bar, transparent until the divider is touched.
                It is absolutely positioned, so revealing it never moves the
                panes. The colors are variant classes, which outrank a
                caller's plain `bg-*` on specificity — that is what lets
                `dividerClassName` set a resting color without a Tailwind
                class merger. */}
            <div
                className={cn(
                    'absolute transition-colors',
                    isHorizontal ? 'inset-y-0 -inset-x-px' : 'inset-x-0 -inset-y-px',
                    !disabled && 'group-hover:bg-primary-500 group-focus-visible:bg-primary-500 group-data-[dragging]:bg-primary-500',
                    className
                )}
            />
        </div>
    );

}


//
// Utilities
//

/**
 * What a pane declares about how it may be sized. The only place a
 * `PaneSize` is taken apart — everything downstream works in the numbers
 * this yields, or passes the strings through untouched.
 */
function readPaneOptions(pane: React.ReactElement): PaneOptions {

    const { defaultSize, minimumSize, collapsible } = pane.props as SplitterPaneProps;

    // An unreadable size is treated as if the pane declared none. The
    // `PaneSize` type turns away the common mistakes — a bare `"200"`, a
    // number, another unit — but a template literal type is not a parser,
    // and forms like `"-3px"` or `"200 px"` still reach here.
    const parsed = defaultSize != null ? parseSize(defaultSize) : null;

    return {
        pinned: parsed?.unit === 'px',
        defaultSize: parsed?.value ?? null,
        minimumSize: minimumSize ?? 0,
        collapsible: collapsible ?? false
    };

}

/**
 * The leading pane's share of its adjacent pair, as a whole percentage.
 * Reads measured pixels, so it stays meaningful when one of the pair is
 * pinned and the other is not. Falls back to an even split until the
 * panes have been measured.
 */
function percentageOfPair(pixelSizes: number[], index: number) {

    const leading = pixelSizes[index];
    const trailing = pixelSizes[index + 1];
    if (leading == null || trailing == null) { return 50; }

    const total = leading + trailing;
    return total > 0 ? Math.round((leading / total) * 100) : 0;

}


Splitter.Pane = SplitterPane;
