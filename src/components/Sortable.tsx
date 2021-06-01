import classnames from 'classnames';
import React, { FC, LegacyRef, ReactElement, useCallback, useRef, useState } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { DragIcon } from '../icons';
import { ComponentScale, controlIconSmallMarginPositiveSize } from './ComponentScale';


export interface SortableProps {
    onChange: (source: number, target: number) => void;
    scale?: ComponentScale;
}

interface SortableItemProps {
    type: string;
    onChange: (value: React.Key, target: number) => void;
    findItem: (id: string) => { index: number };
    onUpdate: (source: number, target: number) => void;
    scale?: ComponentScale;
}

export const Sortable: FC<SortableProps> = (({ onChange, scale = 'base', children }) => {

    const d = React.Children.toArray(children);
    const [childrenArray, setChildrenArray] = useState(d);
    const [key] = useState(uuidv4());

    const findItem = useCallback(
        (value: React.Key) => {
            const child = childrenArray.filter((c) => (c as ReactElement).key === value)[0]
            return {
                child,
                index: childrenArray.indexOf(child),
            }
        },
        [childrenArray],
    )
    const moveItem = useCallback(
        (value: React.Key, target: number) => {
            const { index } = findItem(value);
            setChildrenArray(prevState => {
                const coppiedStateArray = [...prevState];
                const prevItem = coppiedStateArray.splice(index, 1);
                coppiedStateArray.splice(target, 0, prevItem[0]);
                return coppiedStateArray;
            })
        }, [findItem, childrenArray, setChildrenArray]);

    return (
        <>
            {childrenArray.map((element) => {
                if (React.isValidElement(element)) {
                    return <SortableItem type={key} onChange={moveItem} findItem={findItem} onUpdate={onChange} scale={scale}>{element}</SortableItem>;
                }
            })}
        </>
    );
});

const SortableItem: FC<SortableItemProps> = (({ type, onChange, findItem, onUpdate, scale = 'base', children }) => {

    const [isDragging, isOver, ref, refPreview] = useDraggable((children as ReactElement).key, type, onChange, findItem, onUpdate);
    const [, drop] = useDrop(() => ({ accept: type }));

    return (
        <div ref={drop}>
            <div ref={(refPreview as LegacyRef<HTMLDivElement> | undefined)} className={classnames(
                'relative group',
                { '-ml-3 pl-3': scale === 'xs', '-ml-4 pl-4': scale === 'sm', '-ml-5 pl-5': scale === 'base', '-ml-6 pl-6': scale === 'lg' })}>
                <div className="">
                    {React.cloneElement(children as ReactElement, {
                        style: { opacity: isOver ? 0 : 1 }
                    })}
                </div>
                <div ref={(ref as LegacyRef<HTMLDivElement> | undefined)} className={classnames(
                    'absolute invisible group-hover:visible top-0 left-0')} >
                    {!isDragging && <DragIcon className={classnames(
                        controlIconSmallMarginPositiveSize[scale || 'base'],
                        'stroke-current stroke-1')} />}
                </div>
            </div>
        </div>
    );
});

const useDraggable =
    (value: any, type: string,
        onChange: (value: React.Key, target: number) => void,
        findItem: (id: string) => { index: number },
        onUpdate: (source: number, target: number) => void) => {

        const ref = useRef(null);
        const refPreview = useRef(null);

        const originalIndex = findItem(value).index;
        const [{ isDragging }, drag, preview] = useDrag(
            () => ({
                type: type,
                item: { value, originalIndex },
                collect: (monitor) => ({
                    isDragging: monitor.isDragging(),
                }),
                end: (item, monitor) => {
                    const { value: droppedId, originalIndex } = item;
                    const didDrop = monitor.didDrop();
                    if (!didDrop) {
                        onChange(droppedId, originalIndex);
                    } else {
                        const { index: target } = findItem(droppedId);
                        onUpdate(originalIndex, target);
                    }
                },
            }),
            [value, originalIndex, onChange],
        )

        const [{ isOver }, drop] = useDrop(
            () => ({
                accept: type,
                collect(monitor) {
                    return {
                        isOver: monitor.isOver()
                    }
                },
                canDrop: () => false,
                hover({ value: draggedValue }: {
                    value: React.Key
                    originalIndex: number
                }) {
                    if (draggedValue !== value) {
                        const { index: target } = findItem(value);
                        onChange(draggedValue, target);
                    }
                },
            }),
            [findItem, onChange],
        );

        drag(drop(ref));
        preview(drop(refPreview));

        return [isDragging, isOver, ref, refPreview];
    }



