import { cleanup, fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useOnOutsideClick } from './useOnOutsideClick';


afterEach(cleanup);

function Harness({ onOutsideClick }: { onOutsideClick: () => void }) {
    const [inside, setInside] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(true, onOutsideClick, inside);
    return (
        <div>
            <div ref={setInside} data-testid="inside">inside</div>
            <div data-testid="outside">outside</div>
        </div>
    );
}

describe('useOnOutsideClick', () => {

    it('fires only for clicks outside the registered elements', () => {
        const onOutsideClick = vi.fn();
        const { getByTestId } = render(<Harness onOutsideClick={onOutsideClick} />);

        fireEvent.mouseDown(getByTestId('inside'));
        expect(onOutsideClick).not.toHaveBeenCalled();

        fireEvent.mouseDown(getByTestId('outside'));
        expect(onOutsideClick).toHaveBeenCalledTimes(1);
    });

    it('subscribes the listener once and does not re-subscribe on re-render', () => {
        // Regression: the rest `elements` array was a new reference each render
        // and was listed in the effect deps, so the global mousedown listener
        // was torn down and re-added on every render.
        const addSpy = vi.spyOn(document, 'addEventListener');
        const countMouseDown = () =>
            addSpy.mock.calls.filter(([type]) => type === 'mousedown').length;

        const { rerender } = render(<Harness onOutsideClick={() => { }} />);
        const afterMount = countMouseDown();

        // Re-render with a brand-new callback identity; the listener must not
        // be added again.
        rerender(<Harness onOutsideClick={() => { }} />);
        expect(countMouseDown()).toBe(afterMount);

        addSpy.mockRestore();
    });

    it('always invokes the latest callback without re-subscribing', () => {
        const first = vi.fn();
        const second = vi.fn();
        const { getByTestId, rerender } = render(<Harness onOutsideClick={first} />);

        rerender(<Harness onOutsideClick={second} />);
        fireEvent.mouseDown(getByTestId('outside'));

        expect(first).not.toHaveBeenCalled();
        expect(second).toHaveBeenCalledTimes(1);
    });

});
