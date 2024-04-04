import { RefObject, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { CARD_TYPE, KanbanCardItem } from './types';


export interface UseCardDropProps {
    onDrop?: (item: KanbanCardItem) => void;
}

export interface UseCardDropCollectedProps {
    item: KanbanCardItem;
    isOver: boolean;
}

export function useCardDrop<C extends HTMLElement>({ onDrop }: UseCardDropProps): [RefObject<C>, UseCardDropCollectedProps] {

    const dropRef = useRef<C>(null);
    const [{ item, isOver }, drop] = useDrop(() => ({
        accept: CARD_TYPE,
        ...(onDrop && { drop: (item: KanbanCardItem) => onDrop(item) }),
        collect: (monitor) => ({
            item: monitor.getItem<KanbanCardItem>(),
            isOver: monitor.isOver()
        })
    }));
    drop(dropRef);

    return [dropRef, { item, isOver }];

}
