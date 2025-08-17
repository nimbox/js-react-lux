import { createContext, useContext } from 'react';


export interface KanbanContextProps {

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

export const useKanbanContext = () => useContext(KanbanContext);

