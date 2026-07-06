import { useMessage } from '../MessageContext';
import { MessageReplyQuote } from '../MessageReplyQuote';


// Renders the replied-to message as a quote above the bubble. There is no separate reply
// registry: the replied-to message goes through the SAME message registry at the `preview`
// surface (§6), wrapped in the shared `MessageReplyQuote` chrome (coloured bar + author
// name + preview) — the same content the composer's reply banner shows, so they can't
// drift. This slot only adds the timeline's vertical margin.
export function MessageReply() {

    const { message: { replyTo } } = useMessage();

    if (!replyTo) {
        return null;
    }

    return <MessageReplyQuote message={replyTo} className="my-1" />;

}
