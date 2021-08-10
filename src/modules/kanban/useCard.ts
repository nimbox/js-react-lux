import { RefObject, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useKanbanContext } from './Kanban';
import { CARD_TYPE, KanbanItem } from './types';


export interface UseCardProps {
    isDragging: boolean;
}

export function useCard<T extends HTMLElement>(id: string): [UseCardProps, RefObject<T>] {

    const context = useKanbanContext();

    const cardRef = useRef<T>(null);
    const [{ item }, drag] = useDrag(() => ({
        type: CARD_TYPE,
        item: (): KanbanItem => {
            context.setIsDraggingCard(true);
            return ({ id, sourceBoundingClientRect: cardRef.current!.getBoundingClientRect() });
        },
        collect: (monitor) => ({
            item: monitor.getItem()
        }),
        end: () => {
            context.setIsDraggingCard(false);
        }
    }), [id, cardRef]);
    drag(cardRef);

    useEffect(() => { cardRef.current!.setAttribute('data-kanban-card-id', id); }, []);

    return ([{ isDragging: item?.id === id }, cardRef]);

};
