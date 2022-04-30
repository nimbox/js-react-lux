import classnames from 'classnames';
import React, { FC, LegacyRef, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { DragIcon } from '../icons/components';


export interface SortableProps {
    onChange: (source: number, target: number) => void;
    className?: string;
}

interface SortableItemProps {
    type: string;
    findItem: (value: React.Key) => { child: React.ReactChild | React.ReactFragment | React.ReactPortal, index: number };
    onChange: (value: React.Key, target: number) => void;
    onUpdate: (source: number, target: number) => void;

}

export const Sortable: FC<SortableProps> = (({ onChange, className, children }) => {

    const [childrenArray, setChildrenArray] = useState<(React.ReactChild | React.ReactFragment | React.ReactPortal)[]>([]);
    useEffect(() => setChildrenArray(React.Children.toArray(children)), [setChildrenArray, children]);
    const [type] = useState(uuidv4());

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
        }, [findItem, setChildrenArray]);

    return (
        <ul className={className}>
            {childrenArray.map((element) => {
                if (React.isValidElement(element)) {
                    return <SortableItem type={type} onChange={moveItem} findItem={findItem} onUpdate={onChange} >{element}</SortableItem>;
                } else {
                    return null;
                }
            })}
        </ul>
    );
});

const SortableItem: FC<SortableItemProps> = (({ type, onChange, findItem, onUpdate, children }) => {

    const [isDragging, isOver, ref, refPreview] = useDraggable((children as any).key, type, onChange, findItem, onUpdate);
    const [, drop] = useDrop(() => ({ accept: type }));
    const [hover, setHover] = useState(false);

    return (
        <li ref={drop} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div ref={(refPreview as LegacyRef<HTMLDivElement> | undefined)} className={classnames(
                'relative ',
                {})}>
                <div className="">
                    {React.cloneElement(children as ReactElement, {
                        style: { opacity: isOver ? 0 : 1 }
                    })}
                </div>
                <div ref={(ref as LegacyRef<HTMLDivElement> | undefined)} className={classnames(
                    'absolute  top-1/2 left-0 cursor-move')} >
                    {(hover && !isDragging) && <DragIcon className={classnames(
                        'stroke-current stroke-1')} />}
                </div>
            </div>
        </li>
    );
});

const useDraggable =
    (value: React.Key, type: string,
        onChange: (value: React.Key, target: number) => void,
        findItem: (value: React.Key) => { child: React.ReactChild | React.ReactFragment | React.ReactPortal, index: number },
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

        const [{ isOver }, drop]: any = useDrop(
            () => ({
                accept: type,
                collect(monitor: any) {
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
            }) as any,
            [findItem, onChange],
        );

        drag(drop(ref));
        preview(drop(refPreview));

        return [isDragging, isOver, ref, refPreview];

    }



