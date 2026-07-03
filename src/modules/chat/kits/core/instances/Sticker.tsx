import { ChatSticker } from '../../../atoms';
import { Message } from '../../../message/Message';
import { type MessageInstanceProps } from '../../../message/MessageProvider';
import type { ImageView } from '../views';


// Core sticker message — `full` surface only; the `preview` reuses
// `ImageMessagePreview` (they share `ImageView`). A sticker floats
// free of the bubble: the `ChatSticker` atom floats above (no
// background), while the date/status keep a compact `Message.Bubble`
// pill (bringing the alignment-coloured background and the avatar
// connector for free).

export function StickerMessage({ message }: MessageInstanceProps<ImageView>) {

    const view = message.content;

    return (
        <Message.Container>
            {view?.url && <ChatSticker url={view.url} size={view.size} alt={view.alt} />}
            <Message.Bubble compact>
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}


// `summary` surface — a one-line "Sticker" digest (the image summary's
// "Photo" label would be wrong here).

export function StickerMessageSummary() {

    return <>Sticker</>;

}
