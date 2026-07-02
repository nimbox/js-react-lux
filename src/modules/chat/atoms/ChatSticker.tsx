import classNames from 'classnames';


// ChatSticker
//
// The design-system sticker atom for chat. A sticker floats free — no bubble, no
// background, no shadow — so it is its own atom rather than a styled `ChatImage`.
// Prop-driven: a kit hands it a resolved `url`.

export interface ChatStickerProps {

    url: string;
    size: number; // bytes — carried through with the url; not displayed yet
    alt?: string;

    className?: string;

}

export function ChatSticker(props: ChatStickerProps) {

    const { url, alt = 'sticker', className } = props;

    return (
        <img

            src={url}
            alt={alt}

            className={classNames('w-24 h-24 object-contain select-none', className)}

            loading="lazy"
            decoding="async"

        />
    );

}
