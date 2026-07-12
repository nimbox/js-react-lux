import { cn } from '../../../components/utilities/cn';


/** Props for `ChatSticker`. */
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
 * Unlike `ChatImage`, it has no rounded corners or shadow — kits
 * typically render it outside the message bubble entirely, rather than
 * inside one.
 */
export function ChatSticker(props: ChatStickerProps) {

    const { url, alt = 'sticker', className } = props;

    return (
        <img

            src={url}
            alt={alt}

            className={cn('w-24 h-24 object-contain select-none', className)}

            loading="lazy"
            decoding="async"

        />
    );

}
