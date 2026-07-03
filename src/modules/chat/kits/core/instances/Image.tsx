import { ChatImage } from '../../../atoms';
import { useChat } from '../../../ChatContext';
import { Message } from '../../../message/Message';
import { MessagePreview } from '../../../message/MessagePreview';
import { type MessageInstanceProps } from '../../../message/MessageProvider';
import type { ImageView } from '../views';


// Core image message — both surfaces of the `image` instance (docs
// §6). The `preview` is also reused by `sticker` (they share
// `ImageView`).


// `full` surface — the resolved `url` through the base `ChatImage`
// atom. `onImageClick` is an optional behaviour the consumer wires
// (e.g. a lightbox).

export type ImageMessageProps = MessageInstanceProps<ImageView> & {
    onImageClick?: () => void;
};

export function ImageMessage({ message, onImageClick }: ImageMessageProps) {

    const { renderText } = useChat();
    const view = message.content;

    return (
        <Message.Container>
            <Message.Bubble>
                <Message.Author />
                <Message.Reply />
                {view?.url && (
                    <ChatImage
                        url={view.url}
                        size={view.size}
                        alt={view.alt}
                        onClick={onImageClick}
                        className={onImageClick ? 'cursor-zoom-in' : undefined}
                    />
                )}
                {view?.caption && (
                    <Message.Body>{renderText(view.caption)}</Message.Body>
                )}
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}


// `preview` surface — a "Photo" label on the left and a small
// thumbnail pushed to the right (the reply-quote / conversation-line
// look).

export function ImageMessagePreview(props: MessageInstanceProps) {

    const view = props.message.content as ImageView | undefined;

    return (
        <MessagePreview.Container>
            <MessagePreview.Body>📷 {view?.caption ?? 'Photo'}</MessagePreview.Body>
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

    const view = props.message.content as ImageView | undefined;

    return <>📷 {view?.caption ?? 'Photo'}</>;

}
