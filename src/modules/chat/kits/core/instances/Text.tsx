import { useChat } from '../../../ChatContext';
import { Message } from '../../../message/Message';
import { MessagePreview } from '../../../message/MessagePreview';
import { type MessageInstanceProps } from '../../../message/MessageProvider';
import type { TextView } from '../views';


// Core text message — both surfaces of the `text` instance (docs §6).
// The dispatch layer mounts the provider; both are pure composition
// over the base slots.


// `full` surface — the timeline bubble; the rendered text is pushed
// into the Body slot.

export function TextMessage({ message }: MessageInstanceProps<TextView>) {

    const { renderText } = useChat();

    return (
        <Message.Container>
            <Message.Bubble>
                <Message.Author />
                <Message.Reply />
                <Message.Body>{renderText(message.content?.text ?? '', message)}</Message.Body>
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}


// `preview` surface — compact, clamped text for a reply-quote,
// composer banner or conversation line. The base owns the
// preview-chrome; the kit fills the body.

export function TextMessagePreview(props: MessageInstanceProps) {

    const { renderText } = useChat();
    const view = props.message.content as TextView | undefined;

    return (
        <MessagePreview.Container>
            <MessagePreview.Body>{renderText(view?.text ?? '')}</MessagePreview.Body>
        </MessagePreview.Container>
    );

}


// `summary` surface — a dense one-line digest (conversation list,
// search hit). Plain text, no markdown block and no chrome; the host
// clamps and sizes it.

export function TextMessageSummary(props: MessageInstanceProps) {

    const view = props.message.content as TextView | undefined;

    return <>{view?.text ?? ''}</>;

}
