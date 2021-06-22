import classnames from 'classnames';
import React, { FC, SVGProps, useMemo, useState } from 'react';
import tinycolor from 'tinycolor2';


export const Cross: FC<SVGProps<SVGSVGElement> & { showCross: boolean; crossColor: string; circleColor: string; }> = ({ showCross, crossColor, circleColor, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em" height="1em"
        viewBox="0 0 32 32"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="16" cy="16" r="14" fill={circleColor} />
        {showCross && <path d="M10 10L22 22M22 10L10 22" stroke={crossColor} strokeWidth="0.25em" />}
    </svg>
);

export interface TagProps {

    color?: string;
    background?: string;

    onClick?: (e: any) => void;
    onDelete?: () => void;

}

export const Tag: FC<TagProps> = ({ color: propertyColor = '#906090', background: propertyBackground, onClick, onDelete, children }) => {

    const color = useMemo(() => (!propertyBackground ? (tinycolor(propertyColor).isDark() ? 'white' : 'black') : propertyColor), [propertyColor, propertyBackground]);
    const backgroundColor = useMemo(() => !propertyBackground ? propertyColor : propertyBackground, [propertyColor, propertyBackground]);

    const crossBackgroundColor = useMemo(() => tinycolor(backgroundColor).darken(5).toString(), [backgroundColor]);
    const crossBackgroundHoverColor = useMemo(() => tinycolor(crossBackgroundColor).darken(10).toString(), [crossBackgroundColor]);
    const [hoverColor, setHoverColor] = useState(crossBackgroundColor);

    return (
        <span
            className='inline-flex flex-row items-baseline max-w-full rounded rounded-full'
            style={{ lineHeight: '1', paddingLeft: '0.25em', paddingTop: '0.125em', paddingRight: '0.5em', paddingBottom: '0.125em', color, backgroundColor }}
        >
            <Cross
                showCross={!!onDelete}
                onMouseEnter={() => setHoverColor(crossBackgroundHoverColor)}
                onMouseLeave={() => setHoverColor(crossBackgroundColor)}
                onClick={() => onDelete && onDelete()}
                crossColor={color}
                circleColor={onDelete ? hoverColor : crossBackgroundColor}
                className="block flex-none self-center cursor-pointer"
                style={{ marginRight: '0.125em' }}
            />
            <span
                onClick={!onDelete ? onClick : undefined}
                className={classnames(
                    'block flex-1 max-w-full truncate',
                    { 'hover:underline cursor-pointer': onClick && !onDelete }
                )}
                style={{ height: '1.2em', lineHeight: '1.2em' }}
            >
                {children}
            </span>
        </span>
    );

};
