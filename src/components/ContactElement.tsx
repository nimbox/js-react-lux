import { FC, useState } from "react";
import classnames from "classnames";
import { useDraggable } from "../hooks/useDraggable";
import { ComponentScale } from "./ComponentScale";
import { MessageIcon } from "../icons";
import { Button } from "./Buttons";
import DragIcon from "../icons/DragIcon";


export interface ContactElementProps {
    value: any;
    type?: string;
    locus?: string;
    render: string;
    index: number;
    isDraggable: boolean;
    onChange: (dragIndex: number, hoverIndex: number) => void;
    scale?: ComponentScale;
    className?: string;
}


export const ContactElement: FC<ContactElementProps> = ({ value, type, locus, render, index, onChange, isDraggable, scale, className, ...props }) => {

    const [ref] = useDraggable(value, index, 'contactElement', onChange);
    const [hover, setHover] = useState(false);
    let Icon = MessageIcon;
    switch (type) {
        case 'message': Icon = MessageIcon;
            break;
        case 'phone': Icon = MessageIcon;
            break;
        case 'address': Icon = MessageIcon;
            break;
    }

    return isDraggable ?
        (
            <span ref={ref} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={classnames(
                'flex flex-row max-w-full items-baseline py-0 truncate ',
                className)} >
                <span className={classnames(
                    'self-center flex flex-row items-center justify-center')}>
                    <span className={classnames(
                        { 'w-3': scale === 'xs', 'w-4': scale === 'sm' || scale === 'base', 'w-5': scale === 'lg' })}>
                        {hover &&
                            <DragIcon className={classnames(
                                { 'h-3 w-3': scale === 'xs', 'h-4 w-4': scale === 'sm' || scale === 'base', 'h-5 w-5': scale === 'lg' },
                                'stroke-current stroke-1')} />
                        }
                    </span>
                    <Icon className={classnames(
                        { 'h-3 w-3': scale === 'xs', 'h-4 w-4': scale === 'sm' || scale === 'base', 'h-5 w-5': scale === 'lg' },
                        'stroke-current stroke-1')} />
                </span>
                <Button link scale={scale} className='truncate'>
                    {render}
                </Button>
            </span>
        )
        :
        (
            <span className={classnames(
                'flex flex-row max-w-full items-baseline py-0 truncate ',
                className)} >
                <span className={classnames(
                    'self-center flex flex-row items-center justify-center')}>
                    <Icon className={classnames(
                        { 'h-3 w-3': scale === 'xs', 'h-4 w-4': scale === 'sm' || scale === 'base', 'h-5 w-5': scale === 'lg' },
                        'stroke-current stroke-1')} />
                </span>
                <Button link scale={scale} className='truncate'>
                    {render}
                </Button>
            </span>
        )
        ;
};
