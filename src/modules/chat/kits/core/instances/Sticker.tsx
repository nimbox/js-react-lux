import { useTranslation } from 'react-i18next';
import { ChatMediaPending, ChatSticker } from '../../../atoms';
import { Message } from '../../../message/Message';
import { type MessageInstanceProps } from '../../../message/MessageProvider';
import { useMessageAuthorVisible } from '../../../message/useMessageAuthorVisible';
import type { ImageView } from '../views';


// Core sticker message — `full` surface only; the `preview` reuses
// `ImageMessagePreview` (they share `ImageView`). A sticker floats free
// of any bubble, between two small chips: the author and the reply quote
// on a `Message.Pill` above it, the date/status on a `Message.Bubble`
// below it (a bubble for the tight corner it takes on the group's last
// message). While the media is pending (no `url` yet) a sticker-sized
// `ChatMediaPending` frame stands in its place.

export function StickerMessage({ message }: MessageInstanceProps<ImageView>) {

    const authorVisible = useMessageAuthorVisible();
    const view = message.content;

    const hasHeader = authorVisible || message.replyTo != null;

    return (
        <>
            {hasHeader && (
                <Message.Pill>
                    <Message.Inset>
                        <Message.Author />
                        <Message.Reply />
                    </Message.Inset>
                </Message.Pill>
            )}
            {view && (view.url
                ? <ChatSticker url={view.url} size={view.size} alt={view.alt} />
                : <ChatMediaPending className="w-24 h-24 bg-transparent" />
            )}
            <Message.Bubble>
                <Message.Inset>
                    <Message.Properties />
                </Message.Inset>
            </Message.Bubble>
        </>
    );

}


// `summary` surface — a one-line "Sticker" digest (the image summary's
// "Photo" label would be wrong here).

export function StickerMessageSummary() {

    const { t } = useTranslation('lux');

    return <>{t('chat.media.sticker', { defaultValue: 'Sticker' })}</>;

}
