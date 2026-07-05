import type { ReactNode } from 'react';


// The guide constants are kept as whole literal class strings so Tailwind's
// scanner picks them up (`-top-8`, `-left-8`, … must appear verbatim in the
// source).

/** Vertical guides run 2rem past the top/bottom edges. */
const OVERSHOOT_Y = '-top-8 -bottom-8';

/** Horizontal guides run 2rem past the left/right edges. */
const OVERSHOOT_X = '-left-8 -right-8';

/**
 * A story-only overlay that traces a single child's exact box with dashed
 * guide lines, so you can SEE where the wrapped element ends.
 *
 * @remarks
 * Shrink-wraps the child (`inline-flex`, no padding of its own), so any
 * margin the child claims shows up as a gap between the visible element and
 * the lines. That makes it a spacing-neutrality check: a neutral atom
 * touches all four lines; one with a margin floats inside them. Reusable
 * across the atom stories.
 *
 * @param children - The single element whose box gets traced.
 * @param label - Optional caption printed beneath the frame.
 */
export function BoundingBox({ children, label }: { children: ReactNode; label?: string }) {

    const guide = 'pointer-events-none absolute border-dashed border-rose-400';

    return (
        <div className="relative inline-flex">
            <span className={`${guide} top-0 ${OVERSHOOT_X} border-t`} />
            <span className={`${guide} bottom-0 ${OVERSHOOT_X} border-b`} />
            <span className={`${guide} left-0 ${OVERSHOOT_Y} border-l`} />
            <span className={`${guide} right-0 ${OVERSHOOT_Y} border-r`} />
            {children}
            {label && (
                <span className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 translate-y-10 whitespace-nowrap text-[10px] font-medium tracking-wide text-rose-500">
                    {label}
                </span>
            )}
        </div>
    );

}
