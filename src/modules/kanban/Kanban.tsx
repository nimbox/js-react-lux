import React, { type FC, useState } from 'react';
import { KanbanContext } from './KanbanContext';


export const KanbanProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {

    const [isDraggingColumn, setIsDraggingColumn] = useState(false);
    const [isDraggingCard, setIsDraggingCard] = useState(false);

    return (
        <KanbanContext.Provider value={{ isDraggingColumn, setIsDraggingColumn, isDraggingCard, setIsDraggingCard }}>
            {children}
        </KanbanContext.Provider>
    );

};
