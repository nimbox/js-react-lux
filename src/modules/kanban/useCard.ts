import { RefObject, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useKanbanContext } from './Kanban';
import { CARD_TYPE, KanbanCardItem } from './types';


export interface UseCardProps {
    isDragging: boolean;
}

export function useCard<T extends HTMLElement>(id: string): [RefObject<T>, UseCardProps] {

    const context = useKanbanContext();

    const cardRef = useRef<T>(null);
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
    useEffect(() => { cardRef.current!.setAttribute('data-kanban-card-id', id); }, []);

    return ([cardRef, { isDragging: item?.id === id }]);

};
