import classnames from 'classnames';
import React, { FC } from 'react';
import { ComponentSize } from './ComponentSize';
import CrossIcon from '../icons/CrossIcon';

export interface TagProps {
    size?: ComponentSize;
    onClick?: (value: any) => void;
    onDelete?: (value: any) => void;
    className?: string;
}

export const Tag: FC<TagProps> = (({ size = 'base', onClick, onDelete, className, children }) => {
    const show = !!onDelete 
    return (
        <span onClick={onClick} className={classnames('inline-flex flex-row max-w-full items-baseline px-2 py-0 border border-primary-700 rounded-l-2xl rounded-r truncate', className)}>
            { show && <span className="self-center top-1/2 -m-1 pr-2"><CrossIcon onClick={onDelete} className="h-2 w-2 stroke-current stroke-2" /></span>}
            <span className={classnames('self-auto truncate', {
                'text-xs': size === 'sm',
                'text-base': size === 'base',
                'text-lg': size === 'lg',
                })}>
                    {children}
            </span>
        </span>
    );
});