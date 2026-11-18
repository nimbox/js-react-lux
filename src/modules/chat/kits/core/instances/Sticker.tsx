import { useTranslation } from 'react-i18next';
import { ChatMediaPending, ChatSticker } from '../../../atoms';
import { Message } from '../../../message/Message';
import { type MessageInstanceProps } from '../../../message/MessageProvider';
import { useMessage } from '../../../message/MessageContext';
import type { ImageView } from '../views';


// Core sticker message — `full` surface only; the `preview` reuses
// `ImageMessagePreview` (they share `ImageView`). A sticker floats free
// of the bubble: the `ChatSticker` atom floats above (no background),
// with the author in a `Message.Pill` on top when this message is
// first in its group, and the date/status in a `Message.Bubble` pill
// below (bringing the alignment-coloured background and the avatar/
// tail for free, since it's the group's one true `Bubble`). While the
// media is pending (no `url` yet) a sticker-sized `ChatMediaPending`
// frame stands in its place.

export function StickerMessage({ message }: MessageInstanceProps<ImageView>) {

    const { isFirst, message: { author } } = useMessage();
    const view = message.content;

    return (
        <>
            {isFirst && author != null && (
                <Message.Pill>
                    <Message.Inset>
                        <Message.Author />
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
