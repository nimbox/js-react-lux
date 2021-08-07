import { RefObject, useRef, useState } from "react";
import { useDrop, XYCoord } from "react-dnd";
import { useKanbanContext } from "./Kanban";
import { KanbanItem } from "./types";
import getPosition from "./utils/getPosition";


export function useCards(columnId: string): [any, RefObject<any>, RefObject<any>] {

    const context = useKanbanContext();

    const columnRef = useRef<HTMLElement>(null);
    const placeholderRef = useRef<HTMLElement>(null);

    const clientOffset = useRef<XYCoord | null>(null);
    const columnScrollTop = useRef<number>(0);

    const [clientPosition, setClientPosition] = useState<number | null>(null);

    const [{ isOver, item }, drop] = useDrop(() => ({

        accept: 'kanban-card',
        hover: (item: KanbanItem, monitor) => {

            const offset = monitor.getClientOffset();
            const scrollTop = columnScrollTop.current;

            if (offset !== null && (
                clientOffset.current === null ||
                clientOffset.current.x !== offset.x || clientOffset.current.y !== offset.y ||
                columnRef.current!.scrollTop != scrollTop
            )) {

                const position = getPosition(item.id, columnRef.current!, offset, placeholderRef.current!)
                setClientPosition(position);

                clientOffset.current = offset;
                columnScrollTop.current = columnRef.current!.scrollTop;

            }

        },
        drop: (item: KanbanItem, monitor) => {
            context.context!.moveCard(item.id, columnId, clientPosition);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            item: monitor.getItem()
        })

    }), [columnId, context, clientPosition]);

    drop(columnRef);

    return [{ isOver, item: isOver ? item : null, clientPosition: isOver ? clientPosition : null }, columnRef, placeholderRef];

}
