import { arrow, autoUpdate, flip, FloatingArrow, FloatingPortal, offset, shift, useClick, useDismiss, useFloating, useInteractions, type Placement } from '@floating-ui/react';
import classNames from 'classnames';
import { useRef, useState, type ReactElement, type ReactNode } from 'react';
import { MenuContext, useMenu } from './MenuContext';
import React from 'react';


// Menu

export interface MenuProps {

    trigger: ReactElement;

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
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: handleOpenChange,
        strategy: 'fixed',
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

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click, dismiss
    ]);

    // Render

    return (
        <>

            {React.cloneElement(trigger, { ref: refs.setReference, ...getReferenceProps() })}

            {isOpen &&
                <FloatingPortal id="modal" >
                    <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles} >
                        <div className="py-1 bg-control-bg border border-control-border rounded shadow min-w-48">

                            <MenuContext.Provider value={{ closeMenu: () => setIsOpen(false) }}>
                                {children}
                            </MenuContext.Provider>

                            {withArrow && (
                                <FloatingArrow
                                    ref={arrowRef}
                                    context={context}
                                    strokeWidth={1}
                                    className="fill-control-bg [&>path:first-of-type]:stroke-control-border"
                                />
                            )}

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

    const { closeMenu } = useMenu();

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
            closeMenu();
        }
    };

    return (
        <div className="px-1">
            <button
                className={classNames(
                    'w-full px-4 py-2 text-left flex items-center gap-2 rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors',
                    {
                        'opacity-50 cursor-not-allowed': disabled,
                        'cursor-pointer': !disabled
                    },
                    className
                )}
                disabled={disabled}
                onClick={disabled ? undefined : handleClick}
            >
                {icon && (
                    <div className="flex-shrink-0 w-4 h-4">
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
