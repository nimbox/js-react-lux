import React, { createContext, useContext, useId, useImperativeHandle, useMemo } from 'react';
import { cn } from '../utilities/cn';
import { useListNavigation } from './useListNavigation';


//
// List
//

interface ListContextValue {
    activeId: string | null;
}

const ListContext = createContext<ListContextValue | null>(null);

const useListContext = () => {
    const context = useContext(ListContext);
    if (context == null) {
        throw new Error('List.Item, List.Header and List.Separator must be used within a <List>');
    }
    return context;
};

export interface ListHandle {

    /** Forward a key event from an external focused control (e.g. a search input). */
    onKeyDown: (event: React.KeyboardEvent) => void;

    /** Clear the active row. */
    reset: () => void;

}

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {

    ref?: React.Ref<HTMLDivElement>;

    /**
     * Imperative handle exposing the navigation. Wire `onKeyDown` to
     * whatever holds focus when it is not the list itself (a chooser
     * forwards its input's key events here).
     */
    handleRef?: React.Ref<ListHandle>;

    children?: React.ReactNode;

}

/**
 * An element-driven list of rows where exactly one row is active at a
 * time. The list owns the single active row and its keyboard + hover
 * navigation itself, with no external dependency: rows mark
 * themselves with `data-list-item` and a stable `data-id`, and the
 * list reads them from the DOM in document order when it needs to
 * navigate. The DOM is the source of truth for order, so there is no
 * index registration to keep in sync.
 *
 * Because the highlight follows the active row (identified by id, not
 * DOM focus), the list works whether focus is on the list itself (a
 * menu) or on a separate input (a combobox/chooser) that forwards its
 * key events through `handleRef`.
 */
export function List({ ref, handleRef, children, className, onKeyDown: onKeyDownProp, onMouseMove: onMouseMoveProp, ...divProps }: ListProps) {

    const navigation = useListNavigation();

    // The list handles keyboard/hover through the navigation hook,
    // then forwards to any consumer handlers. The keydown handler is
    // also exposed via `handleRef` so a separate focused control (a
    // chooser's input) can drive it.

    const handleKeyDown = (event: React.KeyboardEvent) => {
        navigation.onKeyDown(event);
        onKeyDownProp?.(event as React.KeyboardEvent<HTMLDivElement>);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        navigation.onMouseMove(event);
        onMouseMoveProp?.(event);
    };

    useImperativeHandle(handleRef, () => ({
        onKeyDown: handleKeyDown,
        reset: navigation.reset
    }));

    const setRefs = (node: HTMLDivElement | null) => {
        navigation.containerRef.current = node;
        if (typeof ref === 'function') { ref(node); }
        else if (ref != null) { (ref as React.RefObject<HTMLDivElement | null>).current = node; }
    };

    const context = useMemo(() => ({ activeId: navigation.activeId }), [navigation.activeId]);

    // Render

    return (
        <ListContext.Provider value={context}>
            <div ref={setRefs} onKeyDown={handleKeyDown} onMouseMove={handleMouseMove} className={cn('px-[0.25em] py-[0.25em]', className)} {...divProps}>
                {children}
            </div>
        </ListContext.Provider>
    );

}


//
// List.Item — the shared styled, active-aware row. Single source of
// the row look and of the active/disabled colors (change them here).
//

export interface ListItemProps extends React.HTMLAttributes<HTMLElement> {

    ref?: React.Ref<HTMLElement>;

    /** Host element. Menus use `button`; the row is a `div` by default. */
    as?: React.ElementType;

    /** Button type when `as="button"` (buttons default to `submit`). */
    type?: 'button' | 'submit' | 'reset';

    disabled?: boolean;

    children?: React.ReactNode;

}

export function ListItem({ ref, as = 'div', disabled = false, className, children, onClick, ...rest }: ListItemProps) {

    const { activeId } = useListContext();
    const id = useId();
    const isActive = activeId === id;

    const Component = as;

    return (
        <Component
            ref={ref}
            data-list-item=""
            data-id={id}
            data-disabled={disabled ? 'true' : undefined}
            aria-disabled={disabled || undefined}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
                if (!disabled) { onClick?.(event); }
            }}
            className={cn(
                'w-full px-[1em] py-[0.5em] rounded-lg outline-none',
                {
                    'bg-gray-100': isActive && !disabled,
                    'opacity-50 cursor-not-allowed': disabled,
                    'cursor-pointer': !disabled
                },
                className
            )}
            {...rest}
        >
            {children}
        </Component>
    );

}


//
// List.Header — an inert group label. Not a list item, skipped by navigation.
//

export interface ListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: React.ReactNode;
}

export function ListHeader({ ref, className, children, ...rest }: ListHeaderProps) {
    return (
        <div ref={ref} className={cn('px-[1em] py-[0.25em] text-[0.75em] text-muted select-none', className)} {...rest}>
            {children}
        </div>
    );
}


//
// List.Separator — an inert divider. Not a list item, skipped by navigation.
//

export interface ListSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
}

export function ListSeparator({ ref, className, ...rest }: ListSeparatorProps) {
    return <div ref={ref} role="separator" className={cn('-mx-[0.25em] my-[0.25em] border-t border-control-border', className)} {...rest} />;
}


List.Item = ListItem;
List.Header = ListHeader;
List.Separator = ListSeparator;
