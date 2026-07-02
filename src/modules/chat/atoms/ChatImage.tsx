import classNames from 'classnames';


// ChatImage
//
// The design-system image atom for chat. Presentational and
// prop-driven — a kit (or the app) hands it a resolved `url`; the
// chat base never reaches into a message's attachments to find one.

export interface ChatImageProps {

    url: string;
    size: number; // bytes — carried through with the url; not displayed yet
    alt?: string;

    onClick?: () => void;
    className?: string;

}

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
