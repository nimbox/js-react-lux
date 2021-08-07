import { lookup } from "dns";
import { nextTick } from "node:process";
import { createContext, FC, PropsWithChildren, ReactElement, RefObject, useContext, useEffect, useRef, useState } from "react";
import { ConnectDragSource, ConnectDropTarget, useDrag, useDrop, XYCoord } from "react-dnd";


export interface KanbanContextProps {
    context?: any;
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
}

export const KanbanContext = createContext<KanbanContextProps>({
    isActive: false,
    setIsActive: () => undefined
});

export interface KanbanProviderProps<C> {
    context: C;
}

export const KanbanProvider = <C extends any>( {context, children}: PropsWithChildren<KanbanProviderProps<C>>): ReactElement<any, any> | null=> {

    const [isActive, setIsActive] = useState(true);

    return (
        <KanbanContext.Provider value={{ context, isActive, setIsActive }}>
            {children}
        </KanbanContext.Provider>
    );

};

export const useKanbanContext = <C extends any>() => useContext(KanbanContext);
