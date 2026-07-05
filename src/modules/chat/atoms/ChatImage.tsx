import classNames from 'classnames';


/** Props for {@link ChatImage}. */
export interface ChatImageProps {

    /**
     * Resolved, ready-to-display image source. The kit resolves it; the
     * chat base never reaches into a message's attachments to find one.
     */
    url: string;

    /** Source size in bytes, when known. Not displayed. */
    size?: number;

    /** Alt text. Defaults to `'image'`. */
    alt?: string;

    /** Click handler — a kit wires this to open a full-size viewer. */
    onClick?: () => void;

    /** Extra CSS classes merged onto the `<img>` element. */
    className?: string;

}

/**
 * The design-system image atom for chat — a resolved image, sized to fit
 * a bubble.
 *
 * @remarks
 * Presentational and prop-driven: a kit (or the app) hands it a resolved
 * {@link ChatImageProps.url | url}; the chat base never reaches into a
 * message's attachments to find one.
 *
 * Spacing-neutral by design — it claims no outer margin, so vertical rhythm
 * is the parent's (the message bubble's) to own.
 */
export function ChatImage(props: ChatImageProps) {

    const { url, alt = 'image', onClick, className } = props;

    return (
        <img

            src={url}
            alt={alt}

            onClick={onClick}
            className={classNames('w-auto h-auto max-h-[256px] max-w-full object-contain rounded shadow', className)}

            loading="lazy"
            decoding="async"

        />
    );

}
