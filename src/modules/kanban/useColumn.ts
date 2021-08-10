import { RefObject, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useKanbanContext } from './Kanban';
import { COLUMN_TYPE, KanbanItem } from './types';


export interface UseColumnProps {
    isDragging: boolean;
}

export function useColumn<T extends HTMLElement>(id: string): [UseColumnProps, RefObject<T>] {

    const context = useKanbanContext();

    const columnRef = useRef<T>(null);
    const [{ item }, drag] = useDrag(() => ({
        type: COLUMN_TYPE,
        item: (): KanbanItem => {
            context.setIsDraggingColumn(true);
            return ({ id, sourceBoundingClientRect: columnRef.current!.getBoundingClientRect() });
        },
        collect: (monitor) => ({
            item: monitor.getItem()
        }),
        end: () => {
            context.setIsDraggingColumn(false);
        }
    }), [id, columnRef]);
    drag(columnRef);

    useEffect(() => { columnRef.current!.setAttribute('data-kanban-column-id', id); }, []);

    return ([{ isDragging: item?.id === id }, columnRef]);

};
