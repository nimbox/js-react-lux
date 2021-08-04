import { createContext, FC, useContext, useEffect, useState } from "react";
import { ConnectDragSource, ConnectDropTarget, useDrag, useDrop } from "react-dnd";


export interface KanbanContextProps {
    isActive: boolean;
    setIsActive: (isActive
        : boolean) => void;
}

export const KanbanContext = createContext<KanbanContextProps>({
    isActive: false,
    setIsActive: () => null
});

export const KanbanProvider: FC = ({ children }) => {

    const [isActive, setIsActive] = useState(true);

    return (
        <KanbanContext.Provider value={{ isActive, setIsActive }}>
            {children}
        </KanbanContext.Provider>
    );

};
export const useKanbanContext = () => useContext(KanbanContext);

//
// hooks
//



export const useColumn = (id: string): [any, ConnectDropTarget] => {


    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: 'kanban-card',
            collect: (monitor) => ({
                isOver: monitor.isOver()
            })
            // canDrop: () => false,
            // hover({ value: draggedValue }: {
            //     value: React.Key
            //     originalIndex: number
            // }) {
            //     if (draggedValue !== value) {
            //         const { index: target } = findItem(value);
            //         onChange(draggedValue, target);
            //     }
            // },
        }),
    );

    return [{ isOver }, drop];

}

export const useCard = (id: string): [any, ConnectDragSource] => {

    const context = useKanbanContext();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'kanban-card',
        item: () => ({ id }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    useEffect(() => { context.setIsActive(isDragging); }, [isDragging]);

    return ([{ isDragging, isSelfDragging: isDragging }, drag]);

};