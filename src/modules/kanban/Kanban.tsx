import { createContext, FC, RefObject, useContext, useEffect, useRef, useState } from "react";
import { ConnectDragSource, ConnectDropTarget, useDrag, useDrop, XYCoord } from "react-dnd";


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



export const useColumn = (id: string): [any, RefObject<any>] => {

    const dropRef = useRef<HTMLElement>(null);

    const clientOffset = useRef<XYCoord | null>(null);
    const [clientPosition, setClientPosition] = useState<number | null>(null);

    const [{ isOver }, drop] = useDrop(() => ({

        accept: 'kanban-card',
        hover: (item, monitor) => {

            const offset = monitor.getClientOffset();

            if (offset !== null && (clientOffset.current === null || clientOffset.current.x !== offset.x || clientOffset.current.y !== offset.y) ) {
                
                clientOffset.current = offset;

                console.log('setting offset', offset);
                console.log('   ', dropRef.current!.offsetHeight, dropRef.current!.clientTop, dropRef.current!.offsetTop , dropRef.current!.scrollTop  );
                console.log('start');
        
        
        
                Array.from(dropRef.current!.children!).forEach(child => {
                        console.log(child.getBoundingClientRect());
                });

                console.log('XXXXX',  dropRef.current!.children.length);

                setClientPosition(offset!.y);
            }

        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
        
    }));

    drop(dropRef);
    
    return [{ isOver, clientPosition }, dropRef];

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