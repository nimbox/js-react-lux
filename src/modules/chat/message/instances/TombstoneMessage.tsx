import { Message } from '../Message';
import { MessagePreview } from '../MessagePreview';


// Rendered in place of any message that has `deletedAt` — the dispatch resolver
// short-circuits to it before the `type` lookup (§3), whatever the original type.
// Content-free: a "message deleted" placeholder that keeps the author/time chrome.
// (The label is a base default; not yet overridable — see docs §11.)

export function TombstoneMessage() {

    return (
        <Message.Container>
            <Message.Bubble>
                <Message.Author />
                <div className="text-sm italic text-gray-400">Message deleted</div>
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}


// `preview`-surface tombstone (a deleted message quoted / in the
// conversation line).

export function TombstoneMessagePreview() {

    return (
        <MessagePreview.Container>
            <MessagePreview.Body><span className="italic text-gray-400">Message deleted</span></MessagePreview.Body>
        </MessagePreview.Container>
    );

}
