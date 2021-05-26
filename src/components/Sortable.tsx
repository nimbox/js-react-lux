import classnames from 'classnames';
import React, { FC, PropsWithChildren, ReactElement, useState, ValidationMap, WeakValidationMap } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDraggable } from '../hooks/useDraggable';
import { DragIcon } from '../icons';
import { ComponentScale } from './ComponentScale';


export interface SortableProps {
    onChange: (dragIndex: number, hoverIndex: number) => void;
    scale?: ComponentScale;
}

interface DraggableItemProps {
    index: number;
    scale?: ComponentScale;
    onChange: (dragIndex: number, hoverIndex: number) => void;
}

export const DraggableItem: FC<DraggableItemProps> = (({ index, onChange, scale, children }) => {

    const [ref, isDragging, isOver] = useDraggable((children as ReactElement).key, index, (children as ReactElement).type.displayName, onChange);
    const [hover, setHover] = useState(false);

    return (
        <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={classnames(
            'flex flex-row items-baseline')}>
            <span className={classnames('',
                { 'w-3': scale === 'xs', 'w-4': scale === 'sm' || scale === 'base', 'w-5': scale === 'lg' })}>
                {hover &&
                    <DragIcon className={classnames(
                        { 'h-3 w-3': scale === 'xs', 'h-4 w-4': scale === 'sm' || scale === 'base', 'h-5 w-5': scale === 'lg' },
                        'stroke-current stroke-1')} />
                }
            </span>
            <span className="">
                {React.cloneElement(children as ReactElement, {
                    ref: ref,
                    style: { opacity: isOver ? 0 : 1 },
                })}
            </span>
        </span>

    );

});

export const Sortable: FC<SortableProps> = (({ onChange, scale, children }) => {

    const d = React.Children.toArray(children);
    return (
        <DndProvider backend={HTML5Backend}>
            {d.map((element, index) => {
                if (React.isValidElement(element)) {
                    return <DraggableItem index={index} onChange={onChange} >{element}</DraggableItem>;
                }
            })}
        </DndProvider>
    );
});



