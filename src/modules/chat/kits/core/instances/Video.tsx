import { VideoIcon } from '@nimbox/icons-react';
import { ChatVideo } from '../../../atoms';
import { useChat } from '../../../ChatContext';
import { Message } from '../../../message/Message';
import { MessagePreview } from '../../../message/MessagePreview';
import { type MessageInstanceProps } from '../../../message/MessageProvider';
import type { VideoView } from '../views';


// Core video message — both surfaces of the `video` instance (docs §6).


// `full` surface — the resolved `url` through the base `ChatVideo` atom, with an
// optional caption pushed into the Body slot.
export function VideoMessage({ message }: MessageInstanceProps<VideoView>) {

    const { renderText } = useChat();
    const view = message.content;

    return (
        <Message.Bubble>
            <Message.Author />
            <Message.Reply />
            {view?.url && <ChatVideo url={view.url} size={view.size} poster={view.poster} />}
            {view?.caption && (
                <Message.Body>{renderText(view.caption)}</Message.Body>
            )}
            <Message.Properties />
        </Message.Bubble>
    );

}


// `preview` surface — the poster thumbnail when present, plus the caption or a
// "Video" label.
export function VideoMessagePreview(props: MessageInstanceProps) {

    const view = props.message.content as VideoView | undefined;

    return (
        <MessagePreview.Container>
            {view?.poster && (
                <MessagePreview.Thumbnail>
                    <img src={view.poster} alt="" className="w-full h-full object-cover" loading="lazy" />
                </MessagePreview.Thumbnail>
            )}
            <MessagePreview.Body>
                {view?.caption ?? <span className="inline-flex items-center gap-1"><VideoIcon className="w-3.5 h-3.5" />Video</span>}
            </MessagePreview.Body>
        </MessagePreview.Container>
    );

}


// `summary` surface — a one-line digest (caption or a "Video" label).

export function VideoMessageSummary(props: MessageInstanceProps) {

    const view = props.message.content as VideoView | undefined;

    return <span className="inline-flex items-center gap-1"><VideoIcon className="w-3.5 h-3.5" />{view?.caption ?? 'Video'}</span>;

}
