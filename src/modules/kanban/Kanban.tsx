import { createContext, FC, useContext, useState } from 'react';


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

export const KanbanProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {

    const [isDraggingColumn, setIsDraggingColumn] = useState(false);
    const [isDraggingCard, setIsDraggingCard] = useState(false);

    return (
        <KanbanContext.Provider value={{ isDraggingColumn, setIsDraggingColumn, isDraggingCard, setIsDraggingCard }}>
            {children}
        </KanbanContext.Provider>
    );

};

export const useKanbanContext = () => useContext(KanbanContext);
