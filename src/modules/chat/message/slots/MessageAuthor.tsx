import { useChat } from '../../ChatContext';
import { useMessage } from '../MessageContext';


// Renders the author atop the first bubble of a group. The author is opaque; the
// base forwards it to the consumer's `authorRenderer` primitives and owns only the
// *arrangement* — the name and the optional secondary `handle` sit on one row — and
// the *placement* (on `isFirst`, and never in a `plain` preview). Preview surfaces
// render `name` alone, so the handle's noise stays out of reply-quotes and lines.
export function MessageAuthor() {

    const { authorRenderer } = useChat();
    const { message: { author }, isFirst, plain } = useMessage();

    if (!author || !isFirst || plain) {
        return null;
    }

    return (
        <div className="flex flex-row justify-between items-center gap-2">
            {authorRenderer.name(author)}
            {authorRenderer.handle?.(author)}
        </div>
    );

}
