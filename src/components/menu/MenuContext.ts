import { createContext, useContext } from 'react';


// MenuContext

export interface MenuContextProps {
    closeMenu: () => void;
}

export const MenuContext = createContext<MenuContextProps>({
    closeMenu: () => { }
});

export const useMenu = () => {

    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a Menu component');
    }

    return context;

};
