import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PersistentState } from '../../persistent/PersistentState';
import { Splitter, type PaneSize } from './Splitter';


afterEach(cleanup);

// jsdom lays nothing out, so every rect is zero. The splitter reads the
// panes' sizes from the DOM when a gesture starts, so a test stubs those
// rects to give the gesture a geometry to resolve against.

function stubPaneSizes(widths: number[]) {

    const panes = Array.from(document.querySelectorAll<HTMLElement>('[data-splitter-pane]'));
    panes.forEach((pane, index) => {
        pane.getBoundingClientRect = () => ({ width: widths[index], height: widths[index] }) as DOMRect;
    });

}

// The rendered grid template is what the splitter actually produces, and
// the only honest assertion in jsdom: `aria-valuenow` is derived from
// measured pixels, which jsdom never supplies.

const template = () => (document.querySelector<HTMLElement>('[data-splitter]'))?.style.gridTemplateColumns;

const flexible = (size: number) => `minmax(0, ${size}fr)`;

// A pinned track is `minmax(0, Npx)`, not a bare `Npx`: it holds at N when
// there is room and gives way when the pinned panes over-commit.
const pinned = (size: number) => `minmax(0, ${size}px)`;

function Harness({ collapsible = false, onSizesChange }: { collapsible?: boolean, onSizesChange?: (sizes: PaneSize[]) => void }) {
    return (
        <Splitter onSizesChange={onSizesChange}>
            <Splitter.Pane minimumSize={100} collapsible={collapsible}>A</Splitter.Pane>
            <Splitter.Pane minimumSize={100}>B</Splitter.Pane>
        </Splitter>
    );
}

const divider = () => screen.getByRole('separator');

function drag(delta: number) {
    fireEvent.pointerDown(divider(), { pointerId: 1, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(divider(), { pointerId: 1, clientX: delta, clientY: delta });
}

describe('Splitter', () => {

    it('places a divider between each adjacent pair and none at the edges', () => {
        render(
            <Splitter>
                <Splitter.Pane>A</Splitter.Pane>
                <Splitter.Pane>B</Splitter.Pane>
                <Splitter.Pane>C</Splitter.Pane>
            </Splitter>
        );
        expect(screen.getAllByRole('separator')).toHaveLength(2);
    });

    it('starts on an even split and gives the dividers no layout space', () => {
        render(<Harness />);
        // Equal `fr` shares — relative units, so 1fr/1fr is the even split.
        expect(template()).toBe(`${flexible(1)} 0px ${flexible(1)}`);
    });

    it('dragging the divider moves the boundary and reports the new sizes', () => {
        const onSizesChange = vi.fn();
        render(<Harness onSizesChange={onSizesChange} />);
        stubPaneSizes([400, 400]);
        drag(80);
        // The payload says what its numbers mean, with no reference to the children.
        expect(onSizesChange).toHaveBeenCalledWith(['0.6fr', '0.4fr']);
        expect(template()).toBe(`${flexible(0.6)} 0px ${flexible(0.4)}`);
    });

    it('clamps the drag at the pane minimum', () => {
        render(<Harness />);
        stubPaneSizes([400, 400]);
        drag(-400);
        // A stops at its 100px minimum out of the pair's 800px.
        expect(template()).toBe(`${flexible(0.125)} 0px ${flexible(0.875)}`);
    });

    it('snaps a collapsible pane shut once dragged past its minimum', () => {
        render(<Harness collapsible />);
        stubPaneSizes([400, 400]);
        drag(-400);
        expect(template()).toBe(`${flexible(0)} 0px ${flexible(1)}`);
    });

    it('holds a collapsible pane at its minimum until the threshold is crossed', () => {
        render(<Harness collapsible />);
        stubPaneSizes([400, 400]);
        // Lands A on 90px — past its 100px minimum but inside the 24px
        // collapse threshold, so it holds at the minimum.
        drag(-310);
        expect(template()).toBe(`${flexible(0.125)} 0px ${flexible(0.875)}`);
    });

    it('Escape restores the sizes the drag started from', () => {
        render(<Harness />);
        stubPaneSizes([400, 400]);
        drag(200);
        expect(template()).toBe(`${flexible(0.75)} 0px ${flexible(0.25)}`);
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(template()).toBe(`${flexible(1)} 0px ${flexible(1)}`);
    });

    it('the arrow keys along the axis nudge the boundary', () => {
        render(<Harness />);
        stubPaneSizes([400, 400]);
        fireEvent.keyDown(divider(), { key: 'ArrowRight' });
        expect(template()).toBe(`${flexible(0.52)} 0px ${flexible(0.48)}`);
    });

    it('End drives the leading pane to its maximum', () => {
        render(<Harness />);
        stubPaneSizes([400, 400]);
        fireEvent.keyDown(divider(), { key: 'End' });
        // B keeps its 100px minimum out of the pair's 800px.
        expect(template()).toBe(`${flexible(0.875)} 0px ${flexible(0.125)}`);
    });

    it('Enter toggles a collapsible pane shut and back to its minimum', () => {
        render(<Harness collapsible />);
        stubPaneSizes([400, 400]);
        fireEvent.keyDown(divider(), { key: 'Enter' });
        expect(template()).toBe(`${flexible(0)} 0px ${flexible(1)}`);

        stubPaneSizes([0, 800]);
        fireEvent.keyDown(divider(), { key: 'Enter' });
        expect(template()).toBe(`${flexible(0.125)} 0px ${flexible(0.875)}`);
    });

    it('double clicking the divider evens out the pair', () => {
        render(<Harness />);
        stubPaneSizes([200, 600]);
        fireEvent.doubleClick(divider());
        expect(template()).toBe(`${flexible(0.5)} 0px ${flexible(0.5)}`);
    });

    it('ignores every gesture when disabled', () => {
        const onSizesChange = vi.fn();
        render(
            <Splitter disabled onSizesChange={onSizesChange}>
                <Splitter.Pane>A</Splitter.Pane>
                <Splitter.Pane>B</Splitter.Pane>
            </Splitter>
        );
        stubPaneSizes([400, 400]);
        drag(80);
        fireEvent.keyDown(divider(), { key: 'ArrowRight' });
        expect(onSizesChange).not.toHaveBeenCalled();
        expect(divider()).not.toHaveAttribute('tabindex');
    });

    it('exposes the divider as a focusable separator with a value range', () => {
        render(<Harness />);
        expect(divider()).toHaveAttribute('aria-orientation', 'vertical');
        expect(divider()).toHaveAttribute('tabindex', '0');
        expect(divider()).toHaveAttribute('aria-valuemin', '0');
        expect(divider()).toHaveAttribute('aria-valuemax', '100');
        expect(divider()).toHaveAttribute('aria-valuenow');
    });

    it('restores a persisted layout, and falls back to an even split when it no longer fits', () => {

        PersistentState.getInstance().set('test/splitter', ['0.25fr', '0.75fr']);
        render(<Splitter persistenceKey="test/splitter"><Splitter.Pane>A</Splitter.Pane><Splitter.Pane>B</Splitter.Pane></Splitter>);
        expect(template()).toBe(`${flexible(0.25)} 0px ${flexible(0.75)}`);
        cleanup();

        // A pane has been added since the layout was stored.
        render(
            <Splitter persistenceKey="test/splitter">
                <Splitter.Pane>A</Splitter.Pane>
                <Splitter.Pane>B</Splitter.Pane>
                <Splitter.Pane>C</Splitter.Pane>
            </Splitter>
        );
        expect(template()).toBe(`${flexible(1)} 0px ${flexible(1)} 0px ${flexible(1)}`);

    });

});

describe('Splitter pinned panes', () => {

    it('gives a pinned pane a pixel track and lets the rest share the leftover', () => {
        render(
            <Splitter>
                <Splitter.Pane defaultSize="120px">A</Splitter.Pane>
                <Splitter.Pane>B</Splitter.Pane>
                <Splitter.Pane defaultSize="240px">C</Splitter.Pane>
            </Splitter>
        );
        expect(template()).toBe(`${pinned(120)} 0px ${flexible(1)} 0px ${pinned(240)}`);
    });

    it('dragging a pinned pane sets a new pixel size that sticks', () => {
        render(
            <Splitter>
                <Splitter.Pane defaultSize="120px">A</Splitter.Pane>
                <Splitter.Pane>B</Splitter.Pane>
                <Splitter.Pane defaultSize="240px">C</Splitter.Pane>
            </Splitter>
        );
        stubPaneSizes([120, 640, 240]);
        fireEvent.pointerDown(screen.getAllByRole('separator')[0], { pointerId: 1, clientX: 0 });
        fireEvent.pointerMove(screen.getAllByRole('separator')[0], { pointerId: 1, clientX: 80 });
        expect(template()).toBe(`${pinned(200)} 0px ${flexible(1)} 0px ${pinned(240)}`);
    });

    it('growing a pinned pane leaves the other flexible panes on the pixels they had', () => {
        render(
            <Splitter>
                <Splitter.Pane defaultSize="120px">A</Splitter.Pane>
                <Splitter.Pane>B</Splitter.Pane>
                <Splitter.Pane>C</Splitter.Pane>
            </Splitter>
        );
        stubPaneSizes([120, 280, 600]);
        fireEvent.pointerDown(screen.getAllByRole('separator')[0], { pointerId: 1, clientX: 0 });
        fireEvent.pointerMove(screen.getAllByRole('separator')[0], { pointerId: 1, clientX: 80 });
        // A took 80px from B. C's share rose from 600/880 to 600/800, which
        // is exactly the rise needed to keep it on 600px once the leftover
        // shrank by the same 80px.
        expect(template()).toBe(`${pinned(200)} 0px ${flexible(0.25)} 0px ${flexible(0.75)}`);
    });

    it('discards a persisted layout whose units no longer match the panes', () => {

        // Written while both panes were flexible; the first has since been
        // pinned. Reading "0.25fr" as pixels — or as a share — would both
        // lay out something the caller never asked for.
        PersistentState.getInstance().set('test/splitter-units', ['0.25fr', '0.75fr']);

        render(
            <Splitter persistenceKey="test/splitter-units">
                <Splitter.Pane defaultSize="180px">A</Splitter.Pane>
                <Splitter.Pane>B</Splitter.Pane>
            </Splitter>
        );

        expect(template()).toBe(`${pinned(180)} 0px ${flexible(1)}`);

    });

});

describe('Splitter per-pane defaultSize', () => {

    it('reads a flexible pane\'s defaultSize as a share of the leftover', () => {
        render(
            <Splitter>
                <Splitter.Pane defaultSize="1fr">A</Splitter.Pane>
                <Splitter.Pane defaultSize="3fr">B</Splitter.Pane>
            </Splitter>
        );
        expect(template()).toBe(`${flexible(1)} 0px ${flexible(3)}`);
    });

    it('lets the parent defaultSizes win over the panes own declarations', () => {
        render(
            <Splitter defaultSizes={['5fr', '5fr']}>
                <Splitter.Pane defaultSize="1fr">A</Splitter.Pane>
                <Splitter.Pane defaultSize="3fr">B</Splitter.Pane>
            </Splitter>
        );
        expect(template()).toBe(`${flexible(5)} 0px ${flexible(5)}`);
    });

});
