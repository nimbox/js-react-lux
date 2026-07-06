import classNames from 'classnames';
import { useChat } from '../ChatContext';
import type { BaseMessage } from '../types/BaseMessage';
import { useMessageRenderer } from './useMessageRenderer';


// The shared reply-quote content, rendered identically by the timeline `MessageReply`
// slot and the composer's reply banner so the two can never drift: the coloured left bar
// (stroked from the scalar `message.color`, never the opaque author), the replied-to
// author's name (quote chrome — the `preview` surface renders content only), and the
// compact `preview` of the replied-to message through the message registry (§6). The
// caller adds its own outer chrome (the timeline's vertical margin, the banner's dismiss
// button) via `className`.
export function MessageReplyQuote({ message, className }: { message: BaseMessage; className?: string }) {

    const resolveRenderer = useMessageRenderer();
    const { authorRenderer } = useChat();

    const Preview = resolveRenderer(message, 'preview');

    return (
        <div
            className={classNames(
                'max-h-32 px-2 py-1 flex flex-col gap-0.5 bg-gray-100 rounded-lg border-l-4 overflow-hidden',
                className
            )}
            style={{ borderLeftColor: message.color || '#6b7280' }}
        >
            {message.author != null && authorRenderer.name(message.author)}
            <Preview message={message} />
        </div>
    );

}
