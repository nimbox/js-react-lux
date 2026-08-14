import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Tabs } from './Tabs';


afterEach(cleanup);

const renderTabs = (props: Partial<React.ComponentProps<typeof Tabs>> = {}) => {
    const setValue = vi.fn();
    const result = render(
        <Tabs value="one" setValue={setValue} {...props}>
            <Tabs.Option value="one">One</Tabs.Option>
            <Tabs.Option value="two">Two</Tabs.Option>
            <Tabs.Option value="three">Three</Tabs.Option>
        </Tabs>
    );
    return { ...result, setValue };
};

describe('Tabs', () => {

    it('defaults to the underlined variant', () => {
        const { getByRole } = renderTabs();
        expect(getByRole('tablist')).toHaveClass('lux-tabs', 'lux-tabs-underlined');
    });

    it('applies the solid variant', () => {
        const { getByRole } = renderTabs({ variant: 'solid' });
        expect(getByRole('tablist')).toHaveClass('lux-tabs-solid');
    });

    it('applies the width classes', () => {
        const { getByRole } = renderTabs({ withFullWidth: true, withEqualWidthOptions: true });
        expect(getByRole('tablist')).toHaveClass('lux-tabs-full-width', 'lux-tabs-equal-width-options');
    });

    it('marks only the selected option', () => {
        const { getAllByRole } = renderTabs();
        const options = getAllByRole('tab');
        expect(options.map((option) => option.getAttribute('aria-selected')))
            .toEqual(['true', 'false', 'false']);
        expect(options[0]).toHaveClass('lux-tabs-option-selected');
        expect(options.map((option) => option.tabIndex)).toEqual([0, -1, -1]);
    });

    it('gives the first option the tab stop when nothing is selected', () => {
        const { getAllByRole } = renderTabs({ value: undefined });
        expect(getAllByRole('tab').map((option) => option.tabIndex)).toEqual([0, -1, -1]);
    });

    it('selects an option on click', () => {
        const { getAllByRole, setValue } = renderTabs();
        fireEvent.click(getAllByRole('tab')[1]);
        expect(setValue).toHaveBeenCalledWith('two');
    });

    it('moves selection with the arrow keys, wrapping at both ends', () => {
        const { getAllByRole, setValue } = renderTabs();
        const options = getAllByRole('tab');

        fireEvent.keyDown(options[0], { key: 'ArrowRight' });
        expect(setValue).toHaveBeenLastCalledWith('two');

        fireEvent.keyDown(options[0], { key: 'ArrowLeft' });
        expect(setValue).toHaveBeenLastCalledWith('three');
    });

    it('jumps to the first and last option with Home and End', () => {
        const { getAllByRole, setValue } = renderTabs();
        const options = getAllByRole('tab');

        fireEvent.keyDown(options[1], { key: 'End' });
        expect(setValue).toHaveBeenLastCalledWith('three');

        fireEvent.keyDown(options[1], { key: 'Home' });
        expect(setValue).toHaveBeenLastCalledWith('one');
    });

    it('keeps numeric values typed when navigating with the keyboard', () => {
        const setValue = vi.fn();
        const { getAllByRole } = render(
            <Tabs value={1} setValue={setValue}>
                <Tabs.Option value={1}>One</Tabs.Option>
                <Tabs.Option value={2}>Two</Tabs.Option>
            </Tabs>
        );
        fireEvent.keyDown(getAllByRole('tab')[0], { key: 'ArrowRight' });
        expect(setValue).toHaveBeenLastCalledWith(2);
    });

});
