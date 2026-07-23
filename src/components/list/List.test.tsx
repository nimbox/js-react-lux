import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { List } from './List';


afterEach(cleanup);

function Harness({ onChoose }: { onChoose?: (value: string) => void }) {
    return (
        <List tabIndex={0} data-testid="list">
            <List.Header>Header</List.Header>
            <List.Item onClick={() => onChoose?.('a')}>A</List.Item>
            <List.Item disabled onClick={() => onChoose?.('b')}>B</List.Item>
            <List.Separator />
            <List.Item onClick={() => onChoose?.('c')}>C</List.Item>
        </List>
    );
}

const ACTIVE = 'bg-gray-100';

describe('List', () => {

    it('ArrowDown activates the first enabled item (skipping header/separator)', () => {
        render(<Harness />);
        fireEvent.keyDown(screen.getByTestId('list'), { key: 'ArrowDown' });
        expect(screen.getByText('A')).toHaveClass(ACTIVE);
    });

    it('skips disabled items while navigating', () => {
        render(<Harness />);
        const list = screen.getByTestId('list');
        fireEvent.keyDown(list, { key: 'ArrowDown' }); // A
        fireEvent.keyDown(list, { key: 'ArrowDown' }); // B is disabled -> C
        expect(screen.getByText('C')).toHaveClass(ACTIVE);
        expect(screen.getByText('B')).not.toHaveClass(ACTIVE);
    });

    it('hover (delegated mousemove) activates exactly the pointed-at item', () => {
        render(<Harness />);
        // Hover is a single delegated mousemove on the container; moving over C
        // activates C and nothing else.
        fireEvent.mouseMove(screen.getByText('C'));
        expect(screen.getByText('C')).toHaveClass(ACTIVE);
        expect(screen.getByText('A')).not.toHaveClass(ACTIVE);
    });

    it('Enter chooses the active item and prevents default (never submits a form)', () => {
        const onChoose = vi.fn();
        render(<Harness onChoose={onChoose} />);
        const list = screen.getByTestId('list');
        fireEvent.keyDown(list, { key: 'ArrowDown' }); // A active
        const notPrevented = fireEvent.keyDown(list, { key: 'Enter' });
        expect(onChoose).toHaveBeenCalledWith('a');
        expect(notPrevented).toBe(false); // default was prevented
    });

    it('Tab chooses the active item but does NOT prevent default (focus can move)', () => {
        const onChoose = vi.fn();
        render(<Harness onChoose={onChoose} />);
        const list = screen.getByTestId('list');
        fireEvent.keyDown(list, { key: 'ArrowDown' }); // A active
        const notPrevented = fireEvent.keyDown(list, { key: 'Tab' });
        expect(onChoose).toHaveBeenCalledWith('a');
        expect(notPrevented).toBe(true); // default NOT prevented — Tab moves focus on
    });

});
