import React, { type FC, type SVGProps, useMemo } from 'react';
import tinycolor from 'tinycolor2';
import { cn } from './utilities/cn';


//
// Tag
//

/**
 * The dot at the head of a tag.
 *
 * Always drawn, and decorative by default — it is what gives a tag its shape at
 * the left edge. `Tag` hands it either the near-background colour it normally
 * wears or, with `withSolidDot`, the text colour, which makes it the one part of
 * the chip a caller can use to say something about the tag it holds.
 */
export const TagDot: FC<SVGProps<SVGSVGElement> & { fill: string }> = ({ fill, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em" height="1em"
        viewBox="0 0 32 32"
        {...props}
    >
        <circle cx="16" cy="16" r="14" fill={fill} />
    </svg>
);

/**
 * The delete control at the tail of a tag.
 *
 * A bare cross with no disc behind it, sitting at the opposite end from the dot.
 * The two used to be one glyph — the dot *became* a cross once the tag was
 * deletable — which meant a tag could show a dot or offer a delete but never
 * both. Separating them is what lets the dot carry a meaning of its own.
 *
 * Hover is opacity rather than a darker disc: there is no disc left to darken,
 * and the cross is already drawn in the text colour, so the only headroom it has
 * is how present it is.
 */
export const TagCross: FC<SVGProps<SVGSVGElement> & { stroke: string }> = ({ stroke, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em" height="1em"
        viewBox="0 0 32 32"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M10 10L22 22M22 10L10 22" stroke={stroke} strokeWidth="0.25em" />
    </svg>
);

export interface TagProps {

    color?: string;
    backgroundColor?: string;

    /**
     * Draws the dot in the text colour rather than the near-background one.
     *
     * An emphasis with no meaning of its own — the caller decides what a solid
     * dot says. A boolean rather than a colour because the effective text colour
     * is resolved in here: with no `backgroundColor`, `color` becomes white or
     * black by darkness, and a caller passing its own dot colour would have to
     * reproduce that rule to stay legible.
     */
    withSolidDot?: boolean;

    onClick?: (e: React.MouseEvent) => void;
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

        withSolidDot = false,

        onClick,
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

    const dotColor = useMemo(() =>
        tinycolor(backgroundColor).darken(5).toString(),
        [backgroundColor]);

    // Render

    return (
        <span
            className={cn('inline-flex flex-row items-baseline max-w-full rounded-full', containerClassName)}
            style={{
                lineHeight: '1',
                // `0.15em` and not `0.125em`, so the chip is `0.15 + 1.2 + 0.15`
                // = exactly `1.5em` — one line box at the default line height.
                //
                // The old `1.45em` was three quarters of a pixel short of a
                // line, which sounds like nothing and is not: a field shrinks
                // to fit its contents, so a field holding chips sat that much
                // shallower than a field holding text, and drew its underline
                // that much higher. Beside a `RadioBar` — whose options *are*
                // line boxes — the two rules landed on different device pixels
                // and read as misaligned. A chip that occupies exactly one line
                // is also just what a chip set inline in a paragraph should do.
                paddingTop: '0.15em',
                paddingBottom: '0.15em',
                paddingLeft: '0.25em',
                // A glyph at both ends wants the same room at both ends. Without
                // a cross the tail is just text, which needs the wider gutter to
                // clear the rounded corner.
                paddingRight: onDelete ? '0.25em' : '0.5em',
                color,
                backgroundColor
            }}
        >

            <TagDot

                fill={withSolidDot ? color : dotColor}

                className="block flex-none self-center"
                style={{ marginRight: '0.125em' }}

            />

            <span
                className={cn('block shrink min-w-0 max-w-full', onClick && 'cursor-pointer', className)}
                style={{ height: '1.2em', lineHeight: '1.2em' }}
                onClick={onClick}
                {...spanProps}
            >
                {children}
            </span>

            {onDelete &&
                <TagCross

                    stroke={color}

                    onClick={onDelete}

                    className="block flex-none self-center cursor-pointer opacity-70 hover:opacity-100"
                    style={{ marginLeft: '0.125em' }}

                />
            }

        </span>
    );

};
