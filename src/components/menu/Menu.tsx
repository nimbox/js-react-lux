import { arrow, autoUpdate, flip, FloatingList, FloatingPortal, offset, shift, useClick, useDismiss, useFloating, useInteractions, useListItem, useListNavigation, useRole, type Placement } from '@floating-ui/react';
import classNames from 'classnames';
import React, { useRef, useState, type ReactElement, type ReactNode } from 'react';
import { ControlArrow } from '../floating/ControlArrow';
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
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) { setActiveIndex(null); }
        onOpenChange?.(open);
    };

    const arrowRef = useRef<SVGSVGElement>(null);
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

    // Keyboard navigation and menu semantics. `elementsRef`/`labelsRef` are
    // populated by each `Menu.Item` through `useListItem` (via `FloatingList`).

    const elementsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);

    const click = useClick(context, { toggle: true, event: 'mousedown' });
    const dismiss = useDismiss(context, {
        outsidePress: true,
        outsidePressEvent: 'pointerdown',
        escapeKey: true
    });
    const role = useRole(context, { role: 'menu' });
    const listNavigation = useListNavigation(context, {
        listRef: elementsRef,
        activeIndex,
        onNavigate: setActiveIndex,
        loop: true
    });

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
        click, dismiss, role, listNavigation
    ]);

    // Render

    return (
        <>

            {React.cloneElement(trigger, { ref: refs.setReference, ...getReferenceProps() })}

            {isOpen &&
                <FloatingPortal id="modal" >
                    <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles} >
                        <div className="py-1 bg-control-bg border border-control-border rounded shadow min-w-48">

                            <MenuContext.Provider value={{ closeMenu: () => setIsOpen(false), activeIndex, getItemProps }}>
                                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                                    {children}
                                </FloatingList>
                            </MenuContext.Provider>

                            {withArrow && <ControlArrow ref={arrowRef} context={context} />}

                        </div>
                    </div>
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

    const { closeMenu, activeIndex, getItemProps } = useMenu();
    const { ref, index } = useListItem({ label: disabled ? null : label });
    const isActive = activeIndex === index;

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
            closeMenu();
        }
    };

    return (
        <div className="px-1">
            <button
                ref={ref}
                role="menuitem"
                tabIndex={isActive ? 0 : -1}
                className={classNames(
                    'w-full px-4 py-2 text-left flex items-center gap-2 rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors',
                    {
                        'opacity-50 cursor-not-allowed': disabled,
                        'cursor-pointer': !disabled
                    },
                    className
                )}
                disabled={disabled}
                {...getItemProps({ onClick: disabled ? undefined : handleClick })}
            >
                {icon && (
                    <div className="shrink-0 w-4 h-4">
                        {icon}
                    </div>
                )}
                <span className="flex-1">{label}</span>
            </button>
        </div>
    );

}

// MenuDivider

interface MenuDividerProps {
    className?: string;
}

function MenuDivider(props: MenuDividerProps) {

    const { className } = props;

    return (
        <div className={classNames('border-t border-control-border my-1', className)} />
    );

}

// Slots

Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
