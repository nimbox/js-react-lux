import classnames from 'classnames';
import React, { FC } from 'react';
import tinycolor from 'tinycolor2';



//
// Avatar
//

export interface AvatarProps {

    /** Default text used to display inside the avatar. */
    initials: string;

    /** Default color used to display the avatar. */
    color: string;

    /** Default backgroundColor used to display the avatar. */
    backgroundColor?: string;

    /** Image source to display inside the avatar.  It no image is provided the initials with colors are used. */
    src?: string;

    /** Simple tooltip to show when hovering over the avatar. */
    tip?: string;

}

/**
 * Avatar. Representation of a user in the system.
 */
export const Avatar: FC<AvatarProps> = ({ src, initials, color, backgroundColor }) => {

    const c = backgroundColor ? color : tinycolor(color).isDark() ? 'white' : 'black';
    const bg = backgroundColor ? backgroundColor : color;

    if (src) {
        return (
            <span
                className="inline-flex flex-row justify-center content-center rounded-full overflow-hidden"
                style={{
                    width: '1.5em',
                    verticalAlign: '10%'
                }}
            >
                <span
                    className="w-full bg-center bg-cover"
                    style={{ fontSize: '0.5em', backgroundImage: `url(${src})` }}>&nbsp;</span>
            </span>
        );
    } else {
        return (
            <span
                className="inline-flex flex-row justify-center content-center rounded-full overflow-hidden"
                style={{
                    width: '1.5em',
                    verticalAlign: '10%',
                    color: c, backgroundColor: bg
                }}
            >
                <span style={{ fontSize: '0.5em' }}>{initials}</span>
            </span>
        );
    }

};
