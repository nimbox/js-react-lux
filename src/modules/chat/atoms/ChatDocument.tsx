import { FileIcon } from '@nimbox/icons-react';
import classNames from 'classnames';
import { mediaSize } from '../utils/mediaSize';


/** Props for `ChatDocument`. */
export interface ChatDocumentProps {

    /**
     * Resolved, downloadable file source. The kit resolves it; the chat
     * base never reaches into a message's attachments to find one. When
     * absent, the tile renders as a plain (non-link) placeholder.
     */
    url?: string;

    /** Source size in bytes, formatted via `mediaSize`. */
    size?: number;

    /** Display name shown on the tile. */
    filename?: string;

    /** Extra CSS classes merged onto the tile. */
    className?: string;

}

/**
 * The design-system document/file atom for chat — a download tile for a
 * resolved file.
 *
 * @remarks
 * Renders an `<a download>` tile when a url is given, or a plain tile
 * otherwise.
 */
export function ChatDocument(props: ChatDocumentProps) {

    const { url, size, filename, className } = props;

    const href = url
        ? url + (url.includes('?') ? '&download=true' : '?download=true')
        : undefined;

    const tileClassName = classNames(
        'p-2 flex flex-row gap-2 items-center bg-gray-100 rounded-md hover:bg-gray-200',
        className
    );

    const inner = (
        <>
            <div>
                <FileIcon className="w-8 h-8" />
            </div>
            <div>
                <div className="text-sm font-medium">{filename}</div>
                {size != null && <div className="text-xs text-gray-500">{mediaSize(size)}</div>}
            </div>
        </>
    );

    return href
        ? <a href={href} className={tileClassName}>{inner}</a>
        : <div className={tileClassName}>{inner}</div>;

}
