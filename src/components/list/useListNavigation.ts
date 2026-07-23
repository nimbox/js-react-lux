import React, { useRef, useState } from 'react';


export interface ListNavigation {

    /** Ref to attach to the list container element. */
    containerRef: React.RefObject<HTMLDivElement | null>;

    /** Id of the currently active row, or `null`. */
    activeId: string | null;

    /** Keyboard navigation: Arrow up/down, Home/End, Enter (choose), Escape (clear). */
    onKeyDown: (event: React.KeyboardEvent) => void;

    /** Delegated hover: sets the active row from the row under the pointer. */
    onMouseMove: (event: React.MouseEvent) => void;

    /** Clear the active row. */
    reset: () => void;

}

/**
 * Single-active-row navigation for an element-driven list — the
 * companion hook to `List`. It reads the rows straight from
 * `containerRef` in document order (rows mark themselves with
 * `data-list-item` and a stable `data-id`), so there is no index
 * registration to keep in sync. Keyboard and hover both drive the one
 * active row, identified by id rather than DOM focus, so it works
 * whether focus is on the list or on a separate input that forwards
 * its key events.
 */
export function useListNavigation(): ListNavigation {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Enabled rows in document order, read fresh from the DOM
    // (navigation only runs on keypress, so this is cheap and always
    // in sync).

    const enabledItems = () => Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>('[data-list-item]:not([data-disabled="true"])') ?? []
    );

    const activate = (element: HTMLElement | undefined) => {
        if (element == null) { return; }
        setActiveId(element.dataset.id ?? null);
        element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    };

    const move = (delta: 1 | -1) => {
        const items = enabledItems();
        if (items.length === 0) { return; }
        const current = items.findIndex(element => element.dataset.id === activeId);
        const next = current === -1
            ? (delta > 0 ? 0 : items.length - 1)
            : (current + delta + items.length) % items.length;
        activate(items[next]);
    };

    const onKeyDown = (event: React.KeyboardEvent) => {

        switch (event.key) {

            case 'ArrowDown': event.preventDefault(); move(1); break;
            case 'ArrowUp': event.preventDefault(); move(-1); break;
            case 'Home': event.preventDefault(); activate(enabledItems()[0]); break;
            case 'End': { event.preventDefault(); const items = enabledItems(); activate(items[items.length - 1]); break; }

            case 'Enter':
                // Choose and stay — preventDefault so Enter never
                // also submits a surrounding form. Choosing routes
                // through the row's own click, so keyboard and mouse
                // selection share exactly one path.
                if (activeId != null) {
                    event.preventDefault();
                    chooseActive();
                }
                break;

            case 'Tab':
                // Choose but let focus move on (Tab forward /
                // Shift+Tab back): do NOT preventDefault. A no-op
                // when nothing is active.
                chooseActive();
                break;

            case 'Escape':
                setActiveId(null);
                break;

        }

    };

    const onMouseMove = (event: React.MouseEvent) => {
        const item = (event.target as HTMLElement).closest<HTMLElement>('[data-list-item]');
        if (item != null && item.getAttribute('data-disabled') !== 'true') {
            const id = item.dataset.id ?? null;
            if (id !== activeId) { setActiveId(id); }
        }
    };

    const chooseActive = () => {
        if (activeId != null) {
            enabledItems().find(element => element.dataset.id === activeId)?.click();
        }
    };

    const reset = () => setActiveId(null);

    return { containerRef, activeId, onKeyDown, onMouseMove, reset };

}
