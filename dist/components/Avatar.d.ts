import { FC } from 'react';
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
export declare const Avatar: FC<AvatarProps>;
