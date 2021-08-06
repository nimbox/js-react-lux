import { RefObject, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useKanbanContext } from './Kanban';
import { KanbanItem } from './types';


export function useCard(id: string): [any, RefObject<any>] {

    const context = useKanbanContext();

    const cardRef = useRef<HTMLElement>(null);
    const [{ item, isDragging }, drag, preview] = useDrag(() => ({
        type: 'kanban-card',
        item: (): KanbanItem => ({ id, sourceBoundingClientRect: cardRef.current!.getBoundingClientRect() }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            item: monitor.getItem()
        })
    }), [id, cardRef]);
    drag(cardRef);

    useEffect(() => { context.setIsActive(isDragging); }, [isDragging]);
    useEffect(() => { cardRef.current!.setAttribute('data-kanban-card-id', id); }, []);

    return ([{ isDragging, isSelfDragging: isDragging, item }, cardRef]);

};
