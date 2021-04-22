import classnames from 'classnames';
import React, { FC } from 'react';
import CrossIcon from '../icons/CrossIcon';
import { ComponentScale } from './ComponentSize';


export interface TagProps {
    scale: ComponentScale;
    color?: string;
    onClick?: (value: any) => void;
    onDelete?: (value: any) => void;
    className?: string;
}

export const Tag: FC<TagProps> = (({ scale = 'base', color, onClick, onDelete, className, children, ...props}) => {
    const show = !!onDelete
    return (
        <span {...props} onClick={onClick} style={{ backgroundColor: color }} className={classnames(
            'inline-flex flex-row max-w-full items-baseline pr-1 py-0 border border-control-border rounded-l-2xl rounded-r truncate', 
            className)}>
            <span className={classnames("self-center rounded-full",{
                'h-4 w-4': scale === 'xs',
                'h-5 w-5': scale === 'sm',
                'h-6 w-6': scale === 'base',
                'h-7 w-7': scale === 'lg'}, "flex flex-shrink-0 items-center justify-center")}>
                { show && <CrossIcon onClick={() => onDelete} className={classnames( "h-3 w-3 stroke-current stroke-2")} />}
            </span>
            <span className={classnames('self-auto truncate', {
                'text-xs': scale === 'xs',
                'text-sm': scale === 'sm',
                'text-base': scale === 'base',
                'text-lg': scale === 'lg',
            })}>
                {children}
            </span>
        </span>
    );
});