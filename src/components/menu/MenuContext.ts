import { createContext, useContext, type HTMLProps } from 'react';


// MenuContext

export interface MenuContextProps {
    closeMenu: () => void;
    activeIndex: number | null;
    getItemProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
}

export const MenuContext = createContext<MenuContextProps>({
    closeMenu: () => { },
    activeIndex: null,
    getItemProps: () => ({})
});

export const useMenu = () => {

    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a Menu component');
    }

    return context;

};
