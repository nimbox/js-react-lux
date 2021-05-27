import classnames from 'classnames';
import { XYCoord } from "dnd-core";
import React, { FC, ReactElement, useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { DragIcon } from '../icons';
import { ComponentScale, controlIconSmallMarginPositiveSize, controlIconSmallMarginSize } from './ComponentScale';


export interface SortableProps {
    onChange: (dragIndex: number, hoverIndex: number) => void;
    scale?: ComponentScale;
}

interface SortableItemProps {
    index: number;
    type: string;
    onChange: (dragIndex: number, hoverIndex: number) => void;
    scale?: ComponentScale;
}

const SortableItem: FC<SortableItemProps> = (({ index, type, onChange, scale, children }) => {

    const [ref, refPreview, isDragging, isOver] = useDraggable((children as ReactElement).key, index, type, onChange);

    return (
        <div className={classnames(
            'relative group')}>
            <div className="">
                {React.cloneElement(children as ReactElement, {
                    style: { opacity: isOver ? 0 : 1 },
                    ref: refPreview
                })}
            </div>
            <div ref={ref as React.RefObject<HTMLDivElement>} className={classnames(
                'absolute invisible group-hover:visible top-0 left-0',
                { '-ml-3': scale === 'xs', '-ml-4': scale === 'sm', '-ml-5': scale === 'base', '-ml-6': scale === 'lg' })} >
                <DragIcon className={classnames(
                    controlIconSmallMarginPositiveSize[scale || 'base'],
                    'stroke-current stroke-1')} />
            </div>
        </div>
    );

});

const type = uuidv4();

export const Sortable: FC<SortableProps> = (({ onChange, scale, children }) => {

    const d = React.Children.toArray(children);
    console.log("children  ",children);
    return (
        <>
            {d.map((element, index) => {
                if (React.isValidElement(element)) {
                    return <SortableItem index={index} type={type} onChange={onChange} scale={scale}>{element}</SortableItem>;
                }
            })}
        </>
    );
});

const useDraggable = (value: any, index: number, type: string, onDraggable: (dragIndex: number, hoverIndex: number) => void) => {

    const ref = useRef(null);
    const refPreview = useRef(null);
    const [{ isOver }, drop] = useDrop({
        accept: type,
        collect(monitor) {
            return {
                isOver: monitor.isOver()
            }
        },
        hover(item: any, monitor: DropTargetMonitor) {

            monitor.isOver({ shallow: true });

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

            const upwards = dragIndex > hoverIndex && hoverClientY > hoverMiddleY;
            const downwards = dragIndex < hoverIndex && hoverClientY < hoverMiddleY;

            if (upwards && !isOver) {
                console.log("up ", hoverClientY, "midle ", hoverMiddleY);
                return;
            }

            if (downwards && !isOver) {
                console.log("down ", hoverClientY, "midle ", hoverMiddleY);
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
    const [{ isDragging }, drag, preview] = useDrag({
        type: type,
        item: () => {
            return { value, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));
    preview(drop(refPreview));

    return [ref, refPreview, isDragging, isOver];

}



