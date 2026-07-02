import { Message } from '../Message';
import { type MessageInstanceProps } from '../MessageProvider';
import { MessagePreview } from '../MessagePreview';


// Fallback for an unregistered message `type` (`full` surface). The
// base ships no content renderers of its own, so a `type` with no
// registry entry lands here: it keeps the full chrome (the Container
// brings reactions and the hover options; the Bubble, author and
// properties render — the dispatch layer mounts the provider) but its
// interior is deliberately content-free — it shows the raw `type`
// token rather than guessing at a content shape. An unknown type
// therefore degrades visibly instead of crashing or rendering blank.

export function UnknownMessage({ message }: MessageInstanceProps) {

    return (
        <Message.Container>
            <Message.Bubble>
                <Message.Author />
                <Message.Reply />
                <div className="text-sm italic text-gray-400">{message.type}</div>
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}


// The `preview`-surface fallback: an unregistered `type` rendered
// compactly (in a reply-quote, conversation line, …) shows its raw
// `type` token, content-free.

export function UnknownMessagePreview({ message }: MessageInstanceProps) {

    return (
        <MessagePreview.Container>
            <MessagePreview.Body>{message.type}</MessagePreview.Body>
        </MessagePreview.Container>
    );

}
