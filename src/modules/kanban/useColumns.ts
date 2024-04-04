import { RefObject, useRef, useState } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { COLUMN_TYPE, KanbanColumnItem, MoveColumnCallback } from './types';
import { getHorizontalIndex } from './utils/getHorizontalIndex';


export interface UseColumnsProps {
    moveColumn?: MoveColumnCallback;
}

export interface UseColumnsCollectedProps {
    isOver: boolean;
    canDrop: boolean;
    placeholderIndex?: number | null;
    item: KanbanColumnItem;
}

export function useColumns<C extends HTMLElement, P extends HTMLElement>({ moveColumn = () => null }: UseColumnsProps = {}): [RefObject<C>, RefObject<P>, UseColumnsCollectedProps] {

    const columnsRef = useRef<C>(null);
    const placeholderRef = useRef<P>(null);

    const clientOffset = useRef<XYCoord | null>(null);
    const columnScrollLeft = useRef<number>(0);

    const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);

    const [{ item, isOver }, drop] = useDrop(() => ({

        accept: COLUMN_TYPE,

        hover: (item: KanbanColumnItem, monitor) => {

            const offset = monitor.getClientOffset();
            const scrollLeft = columnScrollLeft.current;

            if (offset !== null && (
                clientOffset.current === null ||
                clientOffset.current.x !== offset.x || clientOffset.current.y !== offset.y ||
                columnsRef.current!.scrollLeft !== scrollLeft
            )) {

                const index = getHorizontalIndex(item.id, columnsRef.current!, offset, placeholderRef.current!);
                setPlaceholderIndex(index);

                clientOffset.current = offset;
                columnScrollLeft.current = columnsRef.current!.scrollLeft;

            }

        },

        drop: (item: KanbanColumnItem) => {
            if (placeholderIndex != null) {
                moveColumn(item.id, placeholderIndex);
            }
        },

        collect: (monitor) => ({
            item: monitor.getItem<KanbanColumnItem>(),
            isOver: monitor.isOver()
        })

    }), [moveColumn, placeholderIndex]);
    drop(columnsRef);

    return [columnsRef, placeholderRef, { item, isOver, canDrop: isOver && (placeholderIndex != null), placeholderIndex: isOver ? placeholderIndex : null }];

}
