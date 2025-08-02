export interface AvatarData {

    /** 
     * Default color used to display the avatar. 
     */
    color: string;

    /** 
     * Default backgroundColor used to display the avatar. 
     */
    backgroundColor?: string;

    /** 
     * Image source to display inside the avatar. If no image is provided the
     * initials with colors are used. 
     */
    src?: string;

    /** 
     * Image sources with different sizes to display inside the avatar. If no
     * image is provided the initials with colors are used. 
     */
    srcSet?: string;

    /**
     * Provides alternative information for an image if a user for some reason
     * cannot view it (because of slow connection, an error in the src
     * attribute, or if the user uses a screen reader).
     */
    alt?: string;

    /**
     * Initials to display when no image is provided.
     */
    initials?: string;

}
