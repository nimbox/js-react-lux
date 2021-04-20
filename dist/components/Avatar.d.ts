import { FC } from 'react';
import { ComponentSize } from './ComponentSize';
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
export declare const CircleSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
};
export declare const CircleOffset: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
};
/**
 * Avatar. Representation of a user in the system.
 */
export declare const Avatar: FC<Props>;
