import { type RefObject, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { COLUMN_TYPE, type KanbanColumnItem } from './types';


export interface UseColumnDropProps {
    onDrop?: (item: KanbanColumnItem) => void;
}

export interface UseColumnDropCollectedProps {
    item: KanbanColumnItem;
    isOver: boolean;
}

export function useColumnDrop<C extends HTMLElement>({ onDrop }: UseColumnDropProps): [RefObject<C | null>, UseColumnDropCollectedProps] {

    const dropRef = useRef<C | null>(null);
    const [{ item, isOver }, drop] = useDrop(() => ({
        accept: COLUMN_TYPE,
        ...(onDrop && { drop: (item: KanbanColumnItem) => onDrop(item) }),
        collect: (monitor) => ({
            item: monitor.getItem<KanbanColumnItem>(),
            isOver: monitor.isOver()
        })
    }));
    drop(dropRef);

    return [dropRef, { item, isOver }];

}
