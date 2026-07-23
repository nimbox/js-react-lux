import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Menu } from './Menu';


afterEach(cleanup);

function renderMenu() {
    return render(
        <Menu trigger={<button>Open</button>}>
            <Menu.Item label="First" />
            <Menu.Divider />
            <Menu.Item label="Second" />
        </Menu>
    );
}

describe('Menu', () => {

    it('is closed initially and marks the trigger with a menu popup', () => {
        renderMenu();
        expect(screen.queryByRole('menu')).toBeNull();
        expect(screen.getByText('Open')).toHaveAttribute('aria-haspopup', 'menu');
    });

    it('opens on trigger click and exposes menu / menuitem roles', () => {
        renderMenu();
        fireEvent.mouseDown(screen.getByText('Open'));
        expect(screen.getByRole('menu')).toBeInTheDocument();
        expect(screen.getAllByRole('menuitem')).toHaveLength(2);
    });

    it('activates a single item with the ArrowDown key', () => {
        renderMenu();
        fireEvent.mouseDown(screen.getByText('Open'));
        const items = screen.getAllByRole('menuitem');
        // Keydown bubbles from the item to the List container that owns navigation.
        fireEvent.keyDown(items[0], { key: 'ArrowDown' });
        expect(items[0]).toHaveClass('bg-gray-100');
        expect(items[1]).not.toHaveClass('bg-gray-100');
    });

});
