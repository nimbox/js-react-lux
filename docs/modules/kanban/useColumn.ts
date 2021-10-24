import { RefObject, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useKanbanContext } from './Kanban';
import { COLUMN_TYPE, KanbanColumnItem } from './types';


export interface UseColumnProps {
    isDragging: boolean;
}

export function useColumn<T extends HTMLElement>(id: string): [RefObject<T>, UseColumnProps] {

    const context = useKanbanContext();

    const columnRef = useRef<T>(null);
    const [{ item }, drag] = useDrag(() => ({

        type: COLUMN_TYPE,

        item: (): KanbanColumnItem => {
            context.setIsDraggingColumn(true);
            return ({ id, sourceBoundingClientRect: columnRef.current!.getBoundingClientRect() });
        },

        collect: (monitor) => ({
            item: monitor.getItem()
        }),

        end: () => {
            context.setIsDraggingColumn(false);
        }

    }), [id]);

    drag(columnRef);
    useEffect(
        () => { columnRef.current!.setAttribute('data-kanban-column-id', id); },
        [id]
    );

    return ([columnRef, { isDragging: item?.id === id }]);

};
