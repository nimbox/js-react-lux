// Core kit — content views
//
// The core kit binds the chat base to a small, channel-neutral
// content vocabulary. Each message `type` the kit renders has a tiny
// view shape; a consumer maps its own domain into these and gets the
// kit's instances for free.
//
// The rule that keeps this a *kit* and not a domain dump: a view here
// may never grow a channel-specific field. The day it needs one, that
// type belongs to the consumer (rendered through the base registry),
// not to the core kit.

export interface TextView {
    text: string;
}

export interface ImageView {
    url: string;
    size: number; // bytes — present whenever there is a url
    caption?: string;
    alt?: string;
}

export interface AudioView {
    url: string;
    size: number; // bytes — present whenever there is a url
    duration?: number;
}

export interface VideoView {
    url: string;
    size: number; // bytes — present whenever there is a url
    caption?: string;
    poster?: string;
}

export interface DocumentView {
    url: string;
    size: number; // bytes — present whenever there is a url
    filename?: string;
    caption?: string;
}

export type CoreContent = TextView | ImageView | AudioView | VideoView | DocumentView;
