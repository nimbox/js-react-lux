import { useTranslation } from 'react-i18next';
import { Message } from '../Message';
import { MessagePreview } from '../MessagePreview';


// Rendered in place of any message that has `deletedAt` — the dispatch resolver
// short-circuits to it before the `type` lookup (§3), whatever the original type.
// Content-free: a "message deleted" placeholder that keeps the author/time chrome.
// The label is one of lux's own i18n strings (the `lux` namespace); a consumer
// relocalizes it by overriding that namespace, not by passing a prop.

export function TombstoneMessage() {

    const { t } = useTranslation();

    return (
        <Message.Bubble>
            <Message.Author />
            <div className="text-sm italic text-gray-400">{t('chat.messageDeleted', { defaultValue: 'Message deleted' })}</div>
            <Message.Properties />
        </Message.Bubble>
    );

}


// `preview`-surface tombstone (a deleted message quoted / in the
// conversation line).

export function TombstoneMessagePreview() {

    const { t } = useTranslation();

    return (
        <MessagePreview.Container>
            <MessagePreview.Body><span className="italic text-gray-400">{t('chat.messageDeleted', { defaultValue: 'Message deleted' })}</span></MessagePreview.Body>
        </MessagePreview.Container>
    );

}
