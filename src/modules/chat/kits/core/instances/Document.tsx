import { ChatDocument } from '../../../atoms';
import { useChat } from '../../../ChatContext';
import { Message } from '../../../message/Message';
import { MessagePreview } from '../../../message/MessagePreview';
import { type MessageInstanceProps } from '../../../message/MessageProvider';
import type { DocumentView } from '../views';


// Core document message — both surfaces of the `document` instance (docs §6).


// `full` surface — the resolved file through the base `ChatDocument`
// atom, with an optional caption pushed into the Body slot.

export function DocumentMessage({ message }: MessageInstanceProps<DocumentView>) {

    const { renderText } = useChat();
    const view = message.content;

    return (
        <Message.Container>
            <Message.Bubble>
                <Message.Author />
                <Message.Reply />
                {view?.url && <ChatDocument url={view.url} filename={view.filename} size={view.size} />}
                {view?.caption && (
                    <Message.Body>{renderText(view.caption)}</Message.Body>
                )}
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}


// `preview` surface — the filename (or caption) with a document
// glyph.

export function DocumentMessagePreview(props: MessageInstanceProps) {

    const view = props.message.content as DocumentView | undefined;

    return (
        <MessagePreview.Container>
            <MessagePreview.Body>📄 {view?.filename ?? view?.caption ?? 'Document'}</MessagePreview.Body>
        </MessagePreview.Container>
    );

}
