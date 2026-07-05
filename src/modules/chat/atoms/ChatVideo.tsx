import classNames from 'classnames';


/** Props for `ChatVideo`. */
export interface ChatVideoProps {

    /**
     * Resolved, ready-to-play video source. The kit resolves it; the chat
     * base never reaches into a message's attachments to find one.
     */
    url: string;

    /** Source size in bytes, when known. Not displayed. */
    size?: number;

    /** Poster image shown before playback starts. */
    poster?: string;

    /** Extra CSS classes merged onto the outer element. */
    className?: string;

}

/**
 * The design-system video atom for chat — a native `<video>` player for a
 * resolved source.
 */
export function ChatVideo(props: ChatVideoProps) {

    const { url, poster, className } = props;

    return (
        <div className={classNames('relative min-w-16 min-h-16', className)}>
            <video controls poster={poster} className="max-w-64 max-h-64 rounded shadow">
                <source src={url} />
                Your browser does not support the video tag.
            </video>
        </div>
    );

}
