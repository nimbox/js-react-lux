import { RefObject, useRef, useState } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { useKanbanContext } from './Kanban';
import { CARD_TYPE, KanbanItem } from './types';
import getVerticalPosition from './utils/getVerticalPosition';


export interface UseCardsProps {
    item: KanbanItem;
    isOver: boolean; 
    canDrop: boolean;
    clientPosition?: number | null;
}

export function useCards<C extends HTMLElement, P extends HTMLElement>(columnId: string): [UseCardsProps, RefObject<C>, RefObject<P>] {

    const context = useKanbanContext();

    const cardsRef = useRef<C>(null);
    const placeholderRef = useRef<P>(null);

    const clientOffset = useRef<XYCoord | null>(null);
    const columnScrollTop = useRef<number>(0);

    const [clientPosition, setClientPosition] = useState<number | null>(null);

    const [{ item, isOver }, drop] = useDrop(() => ({

        accept: CARD_TYPE,
        hover: (item: KanbanItem, monitor) => {

            const offset = monitor.getClientOffset();
            const scrollTop = columnScrollTop.current;

            if (offset !== null && (
                clientOffset.current === null ||
                clientOffset.current.x !== offset.x || clientOffset.current.y !== offset.y ||
                cardsRef.current!.scrollTop != scrollTop
            )) {

                const position = getVerticalPosition(item.id, cardsRef.current!, offset, placeholderRef.current!)
                setClientPosition(position);

                clientOffset.current = offset;
                columnScrollTop.current = cardsRef.current!.scrollTop;

            }

        },
        drop: (item: KanbanItem, monitor) => {
            if (clientPosition != null) {
                context.context!.moveCard(item.id, columnId, clientPosition);
            }
        },
        collect: (monitor) => ({
            item: monitor.getItem<KanbanItem>(),
            isOver: monitor.isOver(),
        })

    }), [columnId, context, clientPosition]);

    drop(cardsRef);

    return [{ item, isOver, canDrop: isOver && (clientPosition != null), clientPosition: isOver ? clientPosition : null }, cardsRef, placeholderRef];

}
