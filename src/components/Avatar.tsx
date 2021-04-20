import classnames from 'classnames';
import React, { FC } from 'react';
import tinycolor from 'tinycolor2';
import { ComponentSize } from './ComponentSize';



//
// Avatar
//

export interface Props {

    /** Default text used to display inside the avatar. */
    initials: string;

    /** Default color used to display the avatar. */
    color: string;

    /** Image source to display inside the avatar.  It no image is provided the initials with colors are used. */
    src?: string;

    /** Simple tooltip to show when hovering over the avatar. */
    tip?: string;

    /** Size used to display the avatar. */
    size: ComponentSize;

    /** Size used to display the avatar. */
    className?: string;

}

export const CircleSize = {
    'xs': 'text-1xs w-5 h-5',
    'sm': 'text-xs w-6 h-6',
    'base': 'text-sm w-7 h-7',
    'lg': 'w-8 h-8'
};

export const CircleOffset = {
    'xs': '-0.625em',
    'sm': '-0.625em',
    'base': '-0.625em',
    'lg': '-0.625em'
}

/**
 * Avatar. Representation of a user in the system.
 */
export const Avatar: FC<Props> = ({ src, initials, color: backgroundColor, size: textSize = 'base', className, children }) => {

    const color = tinycolor(backgroundColor).isDark() ? 'white' : 'black';


    if (src) {
        return (
            <img src={src} alt={initials} className={classnames('inline-block', CircleSize[textSize], 'rounded-full overflow-hidden')} style={{ verticalAlign: CircleOffset[textSize] }}/>
        );
    } else {
        return (
            <span className={classnames('inline-block', CircleSize[textSize], 'rounded-full overflow-hidden')} style={{ verticalAlign: CircleOffset[textSize] }}>
                <span className={classnames('w-full h-full inline-flex justify-center items-center', className)} style={{ color: color, backgroundColor: backgroundColor }}>
                    <span className="leading-4">{initials}</span>
                </span>
            </span>
        );
    }

};
