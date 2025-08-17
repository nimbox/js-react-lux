import classNames from 'classnames';
import React, { type ReactElement, type ReactNode, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { Popper, type PopperPlacement } from '../Popper';
import { MenuContext, useMenu } from './MenuContext';


// Menu

export interface MenuProps {

    trigger: ReactElement;

    withArrow?: boolean;
    withPlacement?: PopperPlacement;

    className?: string;

    children: ReactNode;

}

export function Menu(props: MenuProps) {

    const {
        trigger,
        withPlacement, withArrow,
        className,
        children
    } = props;

    const [show, setShow] = useState(false);
    const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
    const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);

    useOnOutsideClick(show, () => setShow(false), triggerRef, popperRef);

    // Render

    return (
        <>

            {React.cloneElement(trigger, {
                ref: setTriggerRef,
                onClick: (e: React.MouseEvent) => {
                    if (trigger.props.onClick) {
                        trigger.props.onClick(e);
                    }
                    setShow(!show);
                }
            })}

            {show && (
                <Popper

                    ref={setPopperRef}
                    reference={triggerRef!}

                    withPlacement={withPlacement}
                    withArrow={withArrow}

                    className={classNames(
                        'py-1 bg-control-bg border border-control-border rounded shadow min-w-48',
                        className
                    )}
                >
                    <MenuContext.Provider value={{ closeMenu: () => setShow(false) }}>
                        {children}
                    </MenuContext.Provider>
                </Popper>
            )}

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
