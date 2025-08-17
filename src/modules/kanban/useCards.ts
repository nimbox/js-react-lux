import { type RefObject, useRef, useState } from 'react';
import { useDrop, type XYCoord } from 'react-dnd';
import { CARD_TYPE, type KanbanCardItem, type MoveCardCallback } from './types';
import { getVerticalIndex } from './utils/getVerticalIndex';


export interface UseCardsProps {
    moveCard?: MoveCardCallback;
}

export interface UseCardsCollectedProps {
    isOver: boolean;
    canDrop: boolean;
    placeholderIndex?: number | null;
    item: KanbanCardItem;
}

export function useCards<C extends HTMLElement, P extends HTMLElement>(columnId: string, { moveCard = () => null }: UseCardsProps = {}): [RefObject<C>, RefObject<P>, UseCardsCollectedProps] {

    const cardsRef = useRef<C>(null);
    const placeholderRef = useRef<P>(null);

    const clientOffset = useRef<XYCoord | null>(null);
    const cardsScrollTop = useRef<number>(0);

    const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);

    const [{ item, isOver }, drop] = useDrop(() => ({

        accept: CARD_TYPE,

        hover: (item: KanbanCardItem, monitor) => {

            const offset = monitor.getClientOffset();
            const scrollTop = cardsScrollTop.current;

            if (offset !== null && (
                clientOffset.current === null ||
                clientOffset.current.x !== offset.x || clientOffset.current.y !== offset.y ||
                cardsRef.current!.scrollTop !== scrollTop
            )) {

                const index = getVerticalIndex(item.id, cardsRef.current!, offset, placeholderRef.current!);
                setPlaceholderIndex(index);

                clientOffset.current = offset;
                cardsScrollTop.current = cardsRef.current!.scrollTop;

            }

        },

        drop: (item: KanbanCardItem) => {
            if (placeholderIndex != null) {
                moveCard(item.id, columnId, placeholderIndex);
            }
        },

        collect: (monitor) => ({
            item: monitor.getItem<KanbanCardItem>(),
            isOver: monitor.isOver()
        })

    }), [columnId, moveCard, placeholderIndex]);

    drop(cardsRef);

    return [cardsRef, placeholderRef, { item, isOver, canDrop: isOver && (placeholderIndex != null), placeholderIndex: isOver ? placeholderIndex : null }];

}
