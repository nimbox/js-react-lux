import classnames from 'classnames';
import React, { FC, useContext } from 'react';
import tinycolor from 'tinycolor2';
import CrossIcon from '../icons/CrossIcon';
import { ComponentScale, controlSize, controlText } from './ComponentScale';
import { Context } from './controls/Control';


export interface TagProps {
    scale?: ComponentScale;
    color?: string;
    onClick?: (value: any) => void;
    onDelete?: (value: any) => void;
    className?: string;
}

export const Tag: FC<TagProps> = (({ scale, color: backgroundColor, onClick, onDelete, className, children, ...props }) => {

    const show = !!onDelete
    const context = useContext(Context);
    const color = backgroundColor ? tinycolor(backgroundColor).isDark() ? 'white' : 'black' : '';

    return (
        <span {...props} onClick={onClick} style={{ color: color, backgroundColor: backgroundColor }} className={classnames(
            'inline-flex flex-row max-w-full items-baseline py-0 border border-control-border rounded-l-2xl rounded-r truncate',
            className)}>
            {show &&
                <span className={classnames(
                    'self-center rounded-full flex flex-shrink-0 items-center justify-center ',
                    controlSize[scale || context.scale || 'base'])}>
                    <CrossIcon onClick={onDelete} className={classnames(scale === 'xs' ? 'h-3 w-3' : 'h-4 w-4', 'stroke-current stroke-2 ')} />
                </span>}
            <span className={classnames(
                'self-auto truncate',
                controlText[scale || context.scale || 'base'],
                !show ? {
                    'px-2': scale === 'xs',
                    'px-2.5': scale === 'sm',
                    'px-3': scale === 'base' || scale === 'lg',
                } : 'pr-0.5',
            )}>
                {children}
            </span>
        </span>
    );
});