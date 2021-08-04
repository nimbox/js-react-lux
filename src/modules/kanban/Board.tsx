import { FC, useContext } from "react";
import { KanbanContext } from "./Kanban";


export interface BoardProps {
    className?: string;
}

export const Board: FC<BoardProps> = ({ className, children }) => {

    const { isActive: isDragging } = useContext(KanbanContext);

    return (
        <div className={className}>
            {children} {isDragging ? 'IS' : 'NOT'}
        </div>
    );

};
