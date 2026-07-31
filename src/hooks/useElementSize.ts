import { useLayoutEffect, useState, type RefObject } from 'react';


export interface ElementSize {
    width: number;
    height: number;
}


/**
 * The measured size of an element, kept current as it resizes.
 *
 * Watches the element rather than the window, which is the difference that
 * matters: content in a splitter pane, a drawer or a collapsing section changes
 * size while the window does not, and anything sizing itself from `useViewport`
 * misses exactly those moments. Drawing code can depend on the returned object
 * and be re-run whenever the box it draws into actually changes.
 *
 * Takes the ref rather than handing one back, so a caller that already has one —
 * to draw into, to scroll, to measure — keeps using it.
 *
 * Zero on the first render, and again whenever the element is unmounted, so
 * guard against drawing into an empty box.
 */
export function useElementSize(ref: RefObject<Element | null>): ElementSize {

    const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

    useLayoutEffect(() => {

        const element = ref.current;
        if (element == null) { return; }

        // Same object back when nothing moved: the observer fires for changes
        // that round to the same box, and a fresh object every time would make
        // any effect depending on this re-run forever.

        const measure = () => {
            const { width, height } = element.getBoundingClientRect();
            setSize(current => (current.width === width && current.height === height) ? current : { width, height });
        };

        measure();

        if (typeof ResizeObserver === 'undefined') { return; }

        const observer = new ResizeObserver(measure);
        observer.observe(element);
        return () => observer.disconnect();

    }, [ref]);

    return size;

}
