import classNames from 'classnames';


/** Props for {@link ChatSticker}. */
export interface ChatStickerProps {

    /**
     * Resolved, ready-to-display sticker source. The kit resolves it; the
     * chat base never reaches into a message's attachments to find one.
     */
    url: string;

    /** Source size in bytes, when known. Not displayed. */
    size?: number;

    /** Alt text. Defaults to `'sticker'`. */
    alt?: string;

    /** Extra CSS classes merged onto the `<img>` element. */
    className?: string;

}

/**
 * The design-system sticker atom for chat — a small image that floats free.
 *
 * @remarks
 * A sticker has no bubble, background, or shadow, so it is its own atom
 * rather than a styled {@link ChatImage}. Prop-driven: a kit hands it a
 * resolved {@link ChatStickerProps.url | url}.
 *
 * Spacing-neutral by design — it claims no outer margin, so vertical rhythm
 * is the parent's (the message bubble's) to own.
 */
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
