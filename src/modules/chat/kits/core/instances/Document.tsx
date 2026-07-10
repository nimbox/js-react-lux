import { FileIcon } from '@nimbox/icons-react';
import { useTranslation } from 'react-i18next';
import { ChatDocument } from '../../../atoms';
import { useChat } from '../../../ChatContext';
import { Message } from '../../../message/Message';
import { MessagePreview } from '../../../message/MessagePreview';
import { type MessageInstanceProps } from '../../../message/MessageProvider';
import type { DocumentView } from '../views';


// Core document message — both surfaces of the `document` instance (docs §6).


// `full` surface — the resolved file through the base `ChatDocument`
// atom, with an optional caption pushed into the Body slot. Renders
// even when `view.url` is absent, so `ChatDocument`'s own placeholder
// tile (a document that failed to upload, is still processing, etc.)
// stays reachable instead of the whole message silently vanishing.

export function DocumentMessage({ message }: MessageInstanceProps<DocumentView>) {

    const { renderText } = useChat();
    const view = message.content;

    return (
        <Message.Bubble>
            <Message.Author />
            <Message.Reply />
            {view && <ChatDocument url={view.url} filename={view.filename} size={view.size} />}
            {view?.caption && (
                <Message.Body>{renderText(view.caption)}</Message.Body>
            )}
            <Message.Properties />
        </Message.Bubble>
    );

}


// `preview` surface — the filename (or caption) with a document
// glyph.

export function DocumentMessagePreview(props: MessageInstanceProps) {

    const { t } = useTranslation();
    const view = props.message.content as DocumentView | undefined;

    return (
        <MessagePreview.Container>
            <MessagePreview.Body>
                <span className="inline-flex items-center gap-1"><FileIcon className="w-3.5 h-3.5" />{view?.filename ?? view?.caption ?? t('chat.media.document', { defaultValue: 'Document' })}</span>
            </MessagePreview.Body>
        </MessagePreview.Container>
    );

}


// `summary` surface — a one-line digest (filename).

export function DocumentMessageSummary(props: MessageInstanceProps) {

    const { t } = useTranslation();
    const view = props.message.content as DocumentView | undefined;

    return <span className="inline-flex items-center gap-1"><FileIcon className="w-3.5 h-3.5" />{view?.filename ?? view?.caption ?? t('chat.media.document', { defaultValue: 'Document' })}</span>;

}
