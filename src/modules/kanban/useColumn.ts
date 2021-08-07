import { RefObject, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useKanbanContext } from './Kanban';
import { KanbanItem } from './types';


export function useColumn(id: string): [any, RefObject<any>] {

    const context = useKanbanContext();

    const columnRef = useRef<HTMLElement>(null);
    const [{ item }, drag] = useDrag(() => ({
        type: 'kanban-column',
        item: (): KanbanItem => ({ id, sourceBoundingClientRect: columnRef.current!.getBoundingClientRect() }),
        collect: (monitor) => ({
            item: monitor.getItem()
        })
    }), [id, columnRef]);
    drag(columnRef);

    useEffect(() => { columnRef.current!.setAttribute('data-kanban-column-id', id); }, []);

    return ([{ isDragging: item?.id === id, item }, columnRef]);

};
