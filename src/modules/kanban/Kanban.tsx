import { createContext, FC, useContext, useEffect, useState } from "react";
import { ConnectDragSource, useDrag } from "react-dnd";


export interface KanbanContextProps {
    isDragging: boolean;
    setIsDragging: (isDragging: boolean) => void;
}

export const KanbanContext = createContext<KanbanContextProps>({
    isDragging: false,
    setIsDragging: (isDragging) => null
});

export const KanbanProvider: FC = ({ children }) => {

    const [isDragging, setIsDragging] = useState(true);

    return (
        <KanbanContext.Provider value={{ isDragging, setIsDragging }}>
            {children}
        </KanbanContext.Provider>
    );

};
export const useKanbanContext = () => useContext(KanbanContext);

//
// hooks
//

export const useCard = (id: string): [any, ConnectDragSource] => {

    const context = useKanbanContext();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'kanban-card',
        item: () => ({ id }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    useEffect(() => { context.setIsDragging(isDragging); }, [isDragging]);

    return ([{ isDragging, isSelfDragging: isDragging }, drag]);

};