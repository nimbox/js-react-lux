import { RefObject, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useKanbanContext } from './Kanban';
import { CARD_TYPE, KanbanItem } from './types';


export function useCard(id: string): [any, RefObject<any>] {

    const context = useKanbanContext();

    const cardRef = useRef<HTMLElement>(null);
    const [{ item, isDragging }, drag] = useDrag(() => ({
        type: CARD_TYPE,
        item: (): KanbanItem => ({ id, sourceBoundingClientRect: cardRef.current!.getBoundingClientRect() }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            item: monitor.getItem()
        })
    }), [id, cardRef]);
    drag(cardRef);

    useEffect(() => { cardRef.current!.setAttribute('data-kanban-card-id', id); }, []);

    return ([{ isDragging: item?.id === id, item }, cardRef]);

};
