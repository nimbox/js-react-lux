import { type RefObject, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useKanbanContext } from './KanbanContext';
import { CARD_TYPE, type KanbanCardItem } from './types';


export interface UseCardProps {
    isDragging: boolean;
}

export function useCard<T extends HTMLElement>(id: string): [RefObject<T | null>, UseCardProps] {

    const context = useKanbanContext();

    const cardRef = useRef<T | null>(null);
    const [{ item }, drag] = useDrag(() => ({

        type: CARD_TYPE,

        item: (): KanbanCardItem => {
            context.setIsDraggingCard(true);
            return ({ id, sourceBoundingClientRect: cardRef.current!.getBoundingClientRect() });
        },

        collect: (monitor) => ({
            item: monitor.getItem()
        }),

        end: () => {
            context.setIsDraggingCard(false);
        }

    }), [id]);

    drag(cardRef);
    useEffect(
        () => { cardRef.current!.setAttribute('data-kanban-card-id', id); },
        [id]
    );

    return ([cardRef, { isDragging: item?.id === id }]);

}
