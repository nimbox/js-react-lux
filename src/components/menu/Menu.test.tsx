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

    it('moves the active item with the ArrowDown key', () => {
        renderMenu();
        const trigger = screen.getByText('Open');
        fireEvent.mouseDown(trigger);
        const menu = screen.getByRole('menu');
        fireEvent.keyDown(menu, { key: 'ArrowDown' });
        const items = screen.getAllByRole('menuitem');
        expect(items[0]).toHaveAttribute('tabindex', '0');
    });

});
