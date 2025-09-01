export interface MessageAttachment {

    type: string;

    name: string;
    mime: string;
    size: number;
    filename?: string;

    width?: number;
    height?: number;
    duration?: number;

    url: string;
    thumbnailUrl?: string;

}
