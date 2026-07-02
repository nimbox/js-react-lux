import { useChat } from '../../ChatContext';
import { useMessage } from '../MessageContext';
import { useMessageRenderer } from '../useMessageRenderer';


// Renders the replied-to message as a quote above the bubble. There is no
// separate reply registry: the replied-to message goes through the SAME message
// registry at the `preview` surface (§6). This slot owns the quote chrome — the
// coloured left line (stroked from the scalar `replyTo.color`, never the opaque
// `replyTo.author`) and the replied-to author's name (via `authorRenderer.name`).
// The compact content is the replied-to type's own `preview` renderer.
export function MessageReply() {

    const resolveRenderer = useMessageRenderer();
    const { authorRenderer } = useChat();
    const { message: { replyTo } } = useMessage();

    if (!replyTo) {
        return null;
    }

    const Preview = resolveRenderer(replyTo, 'preview');

    return (
        <div
            className="max-h-32 my-1 px-2 py-1 flex flex-col gap-0.5 bg-gray-100 rounded-lg border-l-4 overflow-hidden"
            style={{ borderLeftColor: replyTo.color || '#6b7280' }}
        >
            {replyTo.author != null && authorRenderer.name(replyTo.author)}
            <Preview message={replyTo} />
        </div>
    );

}
