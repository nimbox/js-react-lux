export interface MessageAttachment {

    type: 'image' | 'audio' | 'video' | string;
    name: string;
    mime: string;
    size: number;
    filename?: string;

    url: string;
    thumbnailUrl?: string;

}
