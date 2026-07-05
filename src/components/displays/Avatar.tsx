import React from 'react';
import type { FC } from 'react';
import tinycolor from 'tinycolor2';


//
// Avatar
//

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement & HTMLImageElement> {

    /**
     * Default color used to display the avatar.
     */
    color: string;

    /**
     * Default backgroundColor used to display the avatar.
     */
    backgroundColor?: string;

    //

    /**
     * Image source to display inside the avatar.  It no image is provided the
     * initials with colors are used.
     */
    src?: string;


    /** Image sources with different sizes to display inside the avatar. If no
     * image is provided the initials with colores are used. */
    srcSet?: string;

    /**
     * Provides alternative information for an image if a user for some reason
     * cannot view it (because of slow connection, an error in the src
     * attribute, or if the user uses a screen reader).
     */
    alt?: string;

    /**
     * When `true` (the default), the avatar reserves space to align its own
     * baseline with surrounding text, so it can sit inline in a sentence
     * (see below). Set to `false` when the avatar is composed into a
     * flex/grid layout instead — e.g. next to a message bubble or a
     * conversation row — where that reservation only introduces unwanted
     * vertical offset.
     */
    inline?: boolean;

}

/**
 * An icon or figure representing a particular person or concept. The avatar
 * does not have a name. It is only the image or initials that represent the
 * person. To include the name, use the `<span>` tag, together with a non
 * breaking space (`<Avatar>RM</Avatar>&nbsp;Ricardo`).
 *
 * An `Avatar`:
 * * Has the common atributes of a `<span>` and an `<img>`.
 * * Maintains the baseline when `inline` (the default) is `true`.
 * *
 */
export const Avatar: FC<AvatarProps> = (props) => {

    // Properties

    const {

        color,
        backgroundColor,

        src,
        srcSet,
        alt,

        inline = true,

        children,

        ...rest

    } = props;

    // State

    const c = backgroundColor ? color : tinycolor(color).isDark() ? 'white' : 'black';
    const bg = backgroundColor ? backgroundColor : color;

    const icon = src
        ? <img src={src} srcSet={srcSet} alt={alt} loading="lazy" decoding="async" {...rest} />
        : <span style={{ fontSize: '0.75em', lineHeight: 0 }} {...rest}>{children}</span>;

    // Render

    if (!inline) {
        return (
            <span
                className="flex justify-center items-center rounded-full overflow-hidden"
                style={{ width: '1.5em', height: '1.5em', color: c, backgroundColor: bg }}
            >
                {icon}
            </span>
        );
    }

    return (
        <span className="lux-crux lux-crux-empty">
            <span className="lux-crux-start">
                <span
                    className="flex justify-center items-center rounded-full overflow-hidden"
                    style={{ width: '1.5em', height: '1.5em', color: c, backgroundColor: bg }}
                >
                    {icon}
                </span>
            </span>
            <span className="lux-crux-content">
                &#8203;  {/* Use a zero width space to keep the baseline. */}
            </span>
        </span>
    );

};
