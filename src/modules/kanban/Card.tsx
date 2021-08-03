import { FC, useContext, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { KanbanContext } from "./Kanban";


export interface CardProps {
    id: string;
    className?: string;
}

export const Card: FC<CardProps> = ({ id, className, children }) => {

    const dragRef = useRef<HTMLDivElement>(null);

    const context = useContext(KanbanContext);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'kanban-card',
        item: () => ({ id, height: dragRef.current?.getBoundingClientRect().height }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    useEffect(() => { context.setIsDragging(isDragging); }, [isDragging]);

    // render

    drag(dragRef);

    return (
        <div ref={dragRef} className={className}>
            {children} {isDragging ? 'IS' : 'NOT'}
        </div>
    );

};
