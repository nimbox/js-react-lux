/** Props for {@link ChatAudio}. */
export interface ChatAudioProps {

    /**
     * Resolved, ready-to-play audio source. The kit resolves it; the chat base
     * never reaches into a message's attachments to find one.
     */
    url: string;

    /** Source size in bytes, when known. Not displayed yet. */
    size?: number;

    /**
     * Channel-reported clip length, in seconds. Reserved for future use: the
     * native control already surfaces the duration once metadata loads, so it
     * is not rendered here.
     */
    duration?: number;

    /** Extra CSS classes merged onto the `<audio>` element. */
    className?: string;

}

/**
 * The design-system audio atom for chat — a native `<audio>` player for a
 * resolved source.
 *
 * @remarks
 * Prop-driven: a kit hands it a resolved {@link ChatAudioProps.url | url},
 * which the native `<audio controls>` element plays and — once its metadata
 * loads — labels with the browser's own duration readout. The chat base stays
 * byte-blind: the browser decodes, never the proxy.
 *
 * Spacing-neutral by design — it claims no outer margin, so vertical rhythm is
 * the parent's (the message bubble's) to own.
 */
export function ChatAudio(props: ChatAudioProps) {

    const { url, className } = props;

    return (
        <audio controls className={className}>
            <source src={url} />
            Your browser does not support the audio element.
        </audio>
    );

}
