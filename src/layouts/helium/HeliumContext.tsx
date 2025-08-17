import { createContext, useContext } from 'react';


export interface ContextProps {

    isCompact: boolean;

    showNavigator: boolean;
    setShowNavigator: (show: boolean) => void;

    showMainSide: boolean;
    setShowMainSide: (show: boolean) => void;

}

export const HeliumContext = createContext<ContextProps>({

    isCompact: false,

    showNavigator: true,
    setShowNavigator: () => null,

    showMainSide: true,
    setShowMainSide: () => null

});

export const useHelium = () => useContext(HeliumContext);

