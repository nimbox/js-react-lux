import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useChat } from '../ChatContext';


// ChatAudio
//
// The design-system audio atom for chat. Prop-driven: a kit hands it
// a resolved `url` and, when the channel reported one, a `duration`
// (seconds). The duration shows immediately (before the blob loads);
// when it is absent the atom falls back to the element's own metadata
// on load — so the browser decodes, never the proxy. The chat base
// stays byte-blind.

export interface ChatAudioProps {

    url: string;
    size: number; // bytes — carried through with the url; not displayed yet
    duration?: number;

    className?: string;

}

export function ChatAudio(props: ChatAudioProps) {

    const { url, duration, className } = props;
    const { formatDuration } = useChat();

    const audioRef = useRef<HTMLAudioElement>(null);
    const [resolvedDuration, setResolvedDuration] = useState<number | undefined>(duration);

    useEffect(() => {
        setResolvedDuration(duration);
    }, [duration, url]);

    // Fall back to the element's own duration only 
    // when the channel didn't report one.

    const handleLoadedMetadata = () => {
        if (resolvedDuration == null) {
            const elementDuration = audioRef.current?.duration;
            if (elementDuration != null && Number.isFinite(elementDuration)) {
                setResolvedDuration(elementDuration);
            }
        }
    };

    return (
        <div className={classNames('my-2 flex items-center gap-2', className)}>
            <audio ref={audioRef} controls className="max-w-xs" onLoadedMetadata={handleLoadedMetadata}>
                <source src={url} />
                Your browser does not support the audio element.
            </audio>
            {resolvedDuration != null && (
                <span className="flex-none text-xs text-gray-500">{formatDuration(resolvedDuration)}</span>
            )}
        </div>
    );

}
