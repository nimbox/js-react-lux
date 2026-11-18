import { ImageIcon } from '@nimbox/icons-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../../../components/utilities/cn';
import { ChatImage, ChatMediaPending } from '../../../atoms';
import { useChat } from '../../../ChatContext';
import { Message } from '../../../message/Message';
import { MessagePreview } from '../../../message/MessagePreview';
import { type MessageInstanceProps } from '../../../message/MessageProvider';
import { useMessageAuthorVisible } from '../../../message/useMessageAuthorVisible';
import type { ImageView } from '../views';


// Core image message — both surfaces of the `image` instance (docs §6). The
// `preview` is also reused by `sticker` (they share `ImageView`).


// `full` surface — the image runs to the bubble's edges: the author and the
// reply quote sit above it with the bubble's usual padding, the caption and the
// properties below it. With no caption, the properties lie over the image's
// bottom edge, white on a black gradient. While the media is pending (no `url`
// yet) a `ChatMediaPending` frame takes the image's place. `onImageClick` is an
// optional behaviour the consumer wires (e.g. a lightbox).

export type ImageMessageProps = MessageInstanceProps<ImageView> & {
    onImageClick?: () => void;
};

export function ImageMessage({ message, onImageClick }: ImageMessageProps) {

    const { renderText } = useChat();
    const authorVisible = useMessageAuthorVisible();
    const view = message.content;

    const hasHeader = authorVisible || message.replyTo != null;
    const caption = view?.caption;

    return (
        <Message.Bubble>
            {hasHeader && (
                <Message.Inset>
                    <Message.Author />
                    <Message.Reply />
                </Message.Inset>
            )}
            <div className="relative">
                {view?.url
                    ? (
                        <ChatImage
                            url={view.url}
                            size={view.size}
                            alt={view.alt}
                            onClick={onImageClick}
                            // Edge to edge: the bubble clips the image to its
                            // corners, so the image's own rounding and shadow
                            // go, and it fills the bubble when the header is
                            // wider.
                            className={cn(
                                'block min-w-full max-w-[min(320px,60vw)]! max-h-80! object-cover rounded-none! shadow-none!',
                                onImageClick && 'cursor-zoom-in'
                            )}
                        />
                    )
                    : <ChatMediaPending className="w-64 h-48 rounded-none!" />
                }
                {!caption && (
                    <div className="absolute inset-x-0 bottom-0 px-2 pt-6 pb-1 bg-linear-to-t from-black/60 to-transparent pointer-events-none">
                        <Message.Properties overlay />
                    </div>
                )}
            </div>
            {caption && (
                // `w-0 min-w-full` keeps the caption from widening the
                // bubble: it wraps to the image's width.
                <Message.Inset className="w-0 min-w-full">
                    <Message.Body>{renderText(caption)}</Message.Body>
                    <Message.Properties />
                </Message.Inset>
            )}
        </Message.Bubble>
    );

}


// `preview` surface — a "Photo" label on the left and a small
// thumbnail pushed to the right (the reply-quote / conversation-line
// look).

export function ImageMessagePreview(props: MessageInstanceProps) {

    const { t } = useTranslation('lux');
    const view = props.message.content as ImageView | undefined;

    return (
        <MessagePreview.Container>
            <MessagePreview.Body>
                <span className="inline-flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5" />{view?.caption ?? t('chat.media.photo', { defaultValue: 'Photo' })}</span>
            </MessagePreview.Body>
            {view?.url && (
                <MessagePreview.Thumbnail>
                    <img src={view.url} alt={view.alt ?? ''} className="w-full h-full object-cover" loading="lazy" />
                </MessagePreview.Thumbnail>
            )}
        </MessagePreview.Container>
    );

}


// `summary` surface — the label only (no thumbnail). Dragging the
// thumbnail into a one-line list row is exactly what this surface
// exists to avoid (docs §6).

export function ImageMessageSummary(props: MessageInstanceProps) {

    const { t } = useTranslation('lux');
    const view = props.message.content as ImageView | undefined;

    return <span className="inline-flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5" />{view?.caption ?? t('chat.media.photo', { defaultValue: 'Photo' })}</span>;

}
