import { useEffect, useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";


export const useDraggable = (value: any, index: number, type: string, onDraggable: (dragIndex: number, hoverIndex: number) => void) => {

    const ref = useRef(null);
    const [{ isOver }, drop] = useDrop({
        accept: type,
        collect(monitor) {
            return {
                isOver: monitor.isOver()
            }
        },
        hover(item, monitor: DropTargetMonitor) {
            
            monitor.isOver({shallow:true});
            
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;

            // Get horizontal middle
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Get pixels to the left
            const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

            const upwards = dragIndex > hoverIndex && hoverClientY > hoverMiddleY;
            const downwards = dragIndex < hoverIndex && hoverClientY < hoverMiddleY;
            const leftwards = dragIndex > hoverIndex && hoverClientX > hoverMiddleX;
            const rightwards = dragIndex < hoverIndex && hoverClientX < hoverMiddleX;

            if (upwards && !isOver && (leftwards || rightwards)) {
                console.log("up ",hoverClientY, "midle ",hoverMiddleY);
                return;
            }

            if (downwards && !isOver && (leftwards || rightwards)) {
                console.log("down ",hoverClientY, "midle ",hoverMiddleY);
                return;
            }
            // Time to actually perform the action
            onDraggable(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: type,
        item: () => {
            return { value, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return [ref, isDragging, isOver];

}