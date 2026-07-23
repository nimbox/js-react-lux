import { arrow, autoUpdate, flip, FloatingFocusManager, FloatingPortal, offset, shift, useClick, useDismiss, useFloating, useInteractions, useRole, type Placement } from '@floating-ui/react';
import React, { useRef, useState, type ReactElement, type ReactNode } from 'react';
import { ControlArrow } from '../floating/ControlArrow';
import { List } from '../list/List';
import { cn } from '../utilities/cn';
import { MenuContext, useMenu } from './MenuContext';


// Menu

export interface MenuProps {

    trigger: ReactElement<Record<string, unknown>>;

    withArrow?: boolean;
    withPlacement?: Placement;

    children: ReactNode;

    onOpenChange?: (open: boolean) => void;

}

export function Menu(props: MenuProps) {

    const {
        trigger,
        withPlacement, withArrow,
        children,
        onOpenChange
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        onOpenChange?.(open);
    };

    const arrowRef = useRef<SVGSVGElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Positioning, trigger and dismissal stay with floating-ui; the list itself
    // (rows, single active row, keyboard + hover navigation) is owned by `List`.
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: handleOpenChange,
        placement: withPlacement,
        middleware: [
            offset(4 + (withArrow ? 7 + 2 : 0)),
            shift({ padding: 8 }),
            flip(),
            withArrow ? arrow({ element: arrowRef, padding: 8 }) : null
        ],
        whileElementsMounted: autoUpdate
    });

    const click = useClick(context, { toggle: true, event: 'mousedown' });
    const dismiss = useDismiss(context, {
        outsidePress: true,
        outsidePressEvent: 'pointerdown',
        escapeKey: true
    });
    const role = useRole(context, { role: 'menu' });

    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

    // Render

    return (
        <>

            {React.cloneElement(trigger, { ref: refs.setReference, ...getReferenceProps() })}

            {isOpen &&
                <FloatingPortal id="modal" >
                    {/* Focus moves into the list on open (so arrow keys navigate
                        it instead of scrolling the page) and returns to the trigger
                        on close. `modal={false}` lets Tab-to-choose move focus out. */}
                    <FloatingFocusManager context={context} modal={false} initialFocus={listRef}>
                        <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles} className="outline-none" >

                            <List
                                ref={listRef}
                                tabIndex={-1}
                                className="bg-control-bg border border-control-border rounded shadow min-w-48 outline-none"
                            >
                                <MenuContext.Provider value={{ closeMenu: () => setIsOpen(false) }}>
                                    {children}
                                </MenuContext.Provider>
                            </List>

                            {withArrow && <ControlArrow ref={arrowRef} context={context} />}

                        </div>
                    </FloatingFocusManager>
                </FloatingPortal>
            }

        </>

    );

}


// MenuItem

export interface MenuItemProps {

    icon?: ReactElement;
    label: string;
    disabled?: boolean;

    onClick?: () => void;

    className?: string;

}

function MenuItem(props: MenuItemProps) {

    const {
        icon, label, disabled = false,
        onClick,
        className
    } = props;

    const { closeMenu } = useMenu();

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
            closeMenu();
        }
    };

    return (
        <List.Item
            as="button"
            type="button"
            role="menuitem"
            tabIndex={-1}
            disabled={disabled}
            onClick={handleClick}
            className={cn('flex items-center gap-2 text-left', className)}
        >
            {icon && (
                <div className="shrink-0 w-4 h-4">
                    {icon}
                </div>
            )}
            <span className="flex-1">{label}</span>
        </List.Item>
    );

}


// MenuDivider

interface MenuDividerProps {
    className?: string;
}

function MenuDivider(props: MenuDividerProps) {
    return <List.Separator className={props.className} />;
}


// Slots

Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
