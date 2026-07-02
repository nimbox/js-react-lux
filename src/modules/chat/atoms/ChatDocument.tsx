import { FileIcon } from '@nimbox/icons-react';
import classNames from 'classnames';
import { mediaSize } from '../utils/mediaSize';


// ChatDocument
//
// The design-system document/file atom for chat. Prop-driven — a kit
// hands it a resolved `url`, `filename` and `size`; the chat base
// never reaches into a message's attachments. Renders a download tile
// (or a plain tile when no url).

export interface ChatDocumentProps {

    url?: string;
    size?: number;

    filename?: string;

    className?: string;

}

export function ChatDocument(props: ChatDocumentProps) {

    const { url, filename, size, className } = props;

    const href = url
        ? url + (url.includes('?') ? '&download=true' : '?download=true')
        : undefined;

    const tileClassName = classNames(
        'my-2 p-2 flex flex-row gap-2 items-center bg-gray-100 rounded-md hover:bg-gray-200',
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
