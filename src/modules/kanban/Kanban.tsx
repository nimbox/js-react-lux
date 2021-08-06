import { lookup } from "dns";
import { nextTick } from "node:process";
import { createContext, FC, RefObject, useContext, useEffect, useRef, useState } from "react";
import { ConnectDragSource, ConnectDropTarget, useDrag, useDrop, XYCoord } from "react-dnd";


export interface KanbanContextProps<C> {

    context?: C;

    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
    onMoveCard: (cardId: string, columnId: string, position: number) => void | Promise<void>;


}

export const KanbanContext = createContext<KanbanContextProps<C>>({
    isActive: false,
    setIsActive: () => undefined,
    onMoveCard: (cardId: string, columnId: string, position: number) => Promise.resolve(undefined)
});

export interface KanbanProviderProps<C> {
    context: C;
}

export const KanbanProvider: FC<KanbanProviderProps<C>> = <C,>({ context, children }) => {

    const [isActive, setIsActive] = useState(true);

    return (
        <KanbanContext.Provider value={{ context, isActive, setIsActive }}>
            {children}
        </KanbanContext.Provider>
    );

};
export const useKanbanContext = () => useContext(KanbanContext);

//
// hooks
//




//
// utilities
//
