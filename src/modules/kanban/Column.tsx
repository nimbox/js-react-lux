import { FC, useContext } from 'react';
import { KanbanContext } from './Kanban';


export interface ColumnProps {
    id: string;
    className?: string;
}

export const Column: FC<ColumnProps> = ({ id, className, children }) => {

    const { isDragging } = useContext(KanbanContext);

    return (
        <div className={className}>
            {children}
            {isDragging ? 'isDragging' : 'not'}
        </div>
    );

};
