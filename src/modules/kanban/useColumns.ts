import { RefObject, useRef, useState } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { useKanbanContext } from './Kanban';
import { COLUMN_TYPE, KanbanItem } from './types';
import getHorizontalPosition from './utils/getHorizontalPosition';


export interface UseColumnsProps {
    item: KanbanItem;
    isOver: boolean; 
    canDrop: boolean;
    clientPosition?: number | null;
}

export function useColumns<C extends HTMLElement, P extends HTMLElement>(): [UseColumnsProps, RefObject<C>, RefObject<P>] {

    const context = useKanbanContext();

    const columnsRef = useRef<C>(null);
    const placeholderRef = useRef<P>(null);

    const clientOffset = useRef<XYCoord | null>(null);
    const columnScrollLeft = useRef<number>(0);

    const [clientPosition, setClientPosition] = useState<number | null>(null);

    const [{ item, isOver }, drop] = useDrop(() => ({

        accept: COLUMN_TYPE,
        hover: (item: KanbanItem, monitor) => {

            const offset = monitor.getClientOffset();
            const scrollLeft = columnScrollLeft.current;

            if (offset !== null && (
                clientOffset.current === null ||
                clientOffset.current.x !== offset.x || clientOffset.current.y !== offset.y ||
                columnsRef.current!.scrollLeft != scrollLeft
            )) {

                const position = getHorizontalPosition(item.id, columnsRef.current!, offset, placeholderRef.current!)
                setClientPosition(position);

                clientOffset.current = offset;
                columnScrollLeft.current = columnsRef.current!.scrollLeft;

            }

        },
        drop: (item: KanbanItem, monitor) => {
            if (clientPosition != null) {
                context.context!.moveColumn(item.id, clientPosition);
            }
        },
        collect: (monitor) => ({
            item: monitor.getItem<KanbanItem>(),
            isOver: monitor.isOver()
        })

    }), [context, clientPosition]);

    drop(columnsRef);

    return [{ item, isOver, canDrop : isOver && (clientPosition != null), clientPosition: isOver ? clientPosition : null }, columnsRef, placeholderRef];

}
