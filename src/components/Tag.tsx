import classnames from 'classnames';
import React, { FC, SVGProps, useMemo, useState } from 'react';
import tinycolor from 'tinycolor2';


//
// Tag
//

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
    backgroundColor?: string;

    onDelete?: (e: React.MouseEvent) => void;

    containerClassName?: string;
    className?: string;

    children?: React.ReactNode;

}

export const Tag: FC<TagProps> = (props) => {

    // Properties

    const {

        color: propertyColor = '#906090',
        backgroundColor: propertyBackgroundColor,

        onDelete,

        containerClassName,

        children,
        className,

        ...spanProps

    } = props;

    // State

    const color = useMemo(() =>
    (!propertyBackgroundColor ?
        (tinycolor(propertyColor).isDark() ? 'white' : 'black') :
        propertyColor),
        [propertyColor, propertyBackgroundColor]);
    const backgroundColor = useMemo(() =>
        !propertyBackgroundColor ?
            propertyColor :
            propertyBackgroundColor,
        [propertyColor, propertyBackgroundColor]);

    const crossBackgroundColor = useMemo(() =>
        tinycolor(backgroundColor).darken(5).toString(),
        [backgroundColor]);
    const crossBackgroundHoverColor = useMemo(() =>
        tinycolor(crossBackgroundColor).darken(10).toString(),
        [crossBackgroundColor]);
    const [hoverColor, setHoverColor] = useState(crossBackgroundColor);

    // Render

    return (
        <span
            className={classnames("inline-flex flex-row items-baseline max-w-full rounded-full", containerClassName)}
            style={{ lineHeight: '1', paddingLeft: '0.25em', paddingTop: '0.125em', paddingRight: '0.5em', paddingBottom: '0.125em', color, backgroundColor }}
        >

            <Cross

                showCross={!!onDelete}

                onMouseEnter={() => setHoverColor(crossBackgroundHoverColor)}
                onMouseLeave={() => setHoverColor(crossBackgroundColor)}

                onClick={(e) => onDelete?.(e)}

                crossColor={color}
                circleColor={onDelete ? hoverColor : crossBackgroundColor}

                className="block flex-none self-center cursor-pointer"
                style={{ marginRight: '0.125em' }}

            />

            <span
                className={classnames('block flex-shrink min-w-0 max-w-full', className)}
                style={{ height: '1.2em', lineHeight: '1.2em' }}
                {...spanProps}
            >
                {children}
            </span>

        </span>
    );

};
