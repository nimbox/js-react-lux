import { RefObject, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { CARD_TYPE, KanbanItem } from './types';


export interface UseCardDropProps {
    onDrop?: (item: KanbanItem) => void;
}

export interface UseCardDropCollectedProps {
    item: KanbanItem;
    isOver: boolean;
}

export function useCardDrop<C extends HTMLElement>({ onDrop }: UseCardDropProps): [RefObject<C>, UseCardDropCollectedProps] {

    const dropRef = useRef<C>(null);
    const [{ item, isOver }, drop] = useDrop(() => ({
        accept: CARD_TYPE,
        ...(onDrop && { drop: (item: KanbanItem) => onDrop(item) }),
        collect: (monitor) => ({
            item: monitor.getItem<KanbanItem>(),
            isOver: monitor.isOver(),
        })
    }));
    drop(dropRef);

    return [dropRef, { item, isOver }];

}
