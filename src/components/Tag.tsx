import classnames from 'classnames';
import React, { FC, useMemo, useState } from 'react';
import tinycolor from 'tinycolor2';


export const Cross: FC<React.SVGProps<SVGSVGElement> & { show: boolean }> = ({ show, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth={'0.25em'}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        {show && <path d="M10 10L22 22M22 10L10 22" />}
    </svg>
);

export interface TagProps {

    color?: string;

    onClick?: (e: any) => void;
    onDelete?: (e: React.UIEvent<HTMLElement>) => void;

    className?: string;

}

export const Tag: FC<TagProps> = ({ color: backgroundColor = 'red', onClick, onDelete, className, children }) => {

    const color = useMemo(() => tinycolor(backgroundColor).isDark() ? 'white' : 'black', [backgroundColor]);
    const crossBackgroundColor = useMemo(() => tinycolor(backgroundColor).darken(5).toString(), [backgroundColor]);
    const crossBackgroundHoverColor = useMemo(() => tinycolor(crossBackgroundColor).darken(10).toString(), [crossBackgroundColor]);
    const [hoverColor, setHoverColor] = useState(crossBackgroundColor);

    return (
        <span
            className={classnames(
                'inline-flex flex-row items-baseline py-0.5 max-w-full rounded rounded-full',
                className
            )}
            style={{ paddingLeft: '0.25em', paddingRight: '0.5em', color, backgroundColor }}
        >
            <Cross
                show={!!onDelete}
                onMouseEnter={() => setHoverColor(crossBackgroundHoverColor)}
                onMouseLeave={() => setHoverColor(crossBackgroundColor)}
                onClick={(e: any) => onDelete(e)}
                className="flex-none self-center stroke-current rounded rounded-full cursor-pointer"
                style={{ marginRight: '0.15em', backgroundColor: onDelete ? hoverColor : crossBackgroundColor }}
            />
            <span
                onClick={!onDelete ? onClick : undefined}
                className={classnames('inline-block max-w-full truncate', { 'hover:underline cursor-pointer': onClick && !onDelete })}
                style={{ height: '1.2em', lineHeight: '1.2em' }}
            >
                {children}
            </span>
        </span>
    )

};
