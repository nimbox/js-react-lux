import classNames from 'classnames';


// ChatVideo
//
// The design-system video atom for chat. Prop-driven — a kit hands it
// a resolved `url` (and optional `poster`); the chat base never
// reaches into a message's attachments to find one.

export interface ChatVideoProps {

    url: string;
    size: number; // bytes — carried through with the url; not displayed yet
    poster?: string;

    className?: string;

}

export function ChatVideo(props: ChatVideoProps) {

    const { url, poster, className } = props;

    return (
        <div className={classNames('relative my-2 min-w-16 min-h-16', className)}>
            <video controls poster={poster} className="max-w-64 max-h-64 rounded shadow">
                <source src={url} />
                Your browser does not support the video tag.
            </video>
        </div>
    );

}
