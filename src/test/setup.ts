// Registers @testing-library/jest-dom matchers (toBeInTheDocument,
// toHaveClass, …) on Vitest's `expect` and augments its type declarations.
import '@testing-library/jest-dom/vitest';

// jsdom does not implement scrollIntoView; several components call it during
// keyboard navigation. Provide a no-op so those paths don't throw under test.
if (typeof Element !== 'undefined') {
    Element.prototype.scrollIntoView = () => { };
}

// jsdom implements no layout, and so no ResizeObserver. Components that
// observe their own size must not throw under test; they simply never get
// a measurement, which is already the case for every rect jsdom reports.
if (typeof globalThis.ResizeObserver === 'undefined') {

    class TestResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }

    globalThis.ResizeObserver = TestResizeObserver as unknown as typeof ResizeObserver;

}

// jsdom does not implement PointerEvent either. Without it Testing Library
// falls back to a plain Event, which drops `clientX`/`clientY`, so a drag
// under test would always read a delta of zero. A MouseEvent subclass carries
// the coordinates and is enough for the pointer capture API we call through
// optional chaining.
if (typeof window !== 'undefined' && window.PointerEvent == null) {

    class TestPointerEvent extends MouseEvent {

        public readonly pointerId: number;

        constructor(type: string, options: PointerEventInit = {}) {
            super(type, options);
            this.pointerId = options.pointerId ?? 0;
        }

    }

    window.PointerEvent = TestPointerEvent as unknown as typeof PointerEvent;

}
