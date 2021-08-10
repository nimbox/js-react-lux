import { lookup } from "dns";
import { nextTick } from "node:process";
import { createContext, FC, PropsWithChildren, ReactElement, RefObject, useContext, useEffect, useRef, useState } from "react";
import { ConnectDragSource, ConnectDropTarget, useDrag, useDragDropManager, useDrop, XYCoord } from "react-dnd";


export interface KanbanContextProps {

    context?: any;

    isDraggingColumn: boolean;
    setIsDraggingColumn: (isDraggingColumn: boolean) => void;

    isDraggingCard: boolean;
    setIsDraggingCard: (isDraggingCard: boolean) => void;

}

export const KanbanContext = createContext<KanbanContextProps>({

    isDraggingColumn: false,
    setIsDraggingColumn: () => undefined,

    isDraggingCard: false,
    setIsDraggingCard: () => undefined

});

export interface KanbanProviderProps<C> {
    context: C;
}

export const KanbanProvider = <C extends any>( {context, children}: PropsWithChildren<KanbanProviderProps<C>>): ReactElement<any, any> | null=> {

    const [isDraggingColumn, setIsDraggingColumn] = useState(false);
    const [isDraggingCard, setIsDraggingCard] = useState(false);

    const manager = useDragDropManager();

    return (
        <KanbanContext.Provider value={{ context, isDraggingColumn, setIsDraggingColumn, isDraggingCard, setIsDraggingCard }}>
            {children}
        </KanbanContext.Provider>
    );

};

export const useKanbanContext = <C extends any>() => useContext(KanbanContext);
