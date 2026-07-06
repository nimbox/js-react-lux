import { AudioIcon } from '@nimbox/icons-react';
import { ChatAudio } from '../../../atoms';
import { useChat } from '../../../ChatContext';
import { Message } from '../../../message/Message';
import { MessagePreview } from '../../../message/MessagePreview';
import { type MessageInstanceProps } from '../../../message/MessageProvider';
import type { AudioView } from '../views';


// Core audio message — both surfaces of the `audio` instance (docs §6).


// `full` surface — the resolved `url` (and optional `duration`)
// through the base `ChatAudio` atom.

export function AudioMessage({ message }: MessageInstanceProps<AudioView>) {

    const view = message.content;

    return (
        <Message.Bubble>
            <Message.Author />
            <Message.Reply />
            {view?.url && <ChatAudio url={view.url} size={view.size} duration={view.duration} />}
            <Message.Properties />
        </Message.Bubble>
    );

}


// `preview` surface — a compact voice-message label with the duration
// when the channel reported one.

export function AudioMessagePreview(props: MessageInstanceProps) {

    const { formatDuration } = useChat();
    const view = props.message.content as AudioView | undefined;

    const label = view?.duration != null
        ? `Voice message · ${formatDuration(view.duration)}`
        : 'Voice message';

    return (
        <MessagePreview.Container>
            <MessagePreview.Body>
                <span className="inline-flex items-center gap-1"><AudioIcon className="w-3.5 h-3.5" />{label}</span>
            </MessagePreview.Body>
        </MessagePreview.Container>
    );

}


// `summary` surface — a one-line voice-message digest.

export function AudioMessageSummary() {

    return <span className="inline-flex items-center gap-1"><AudioIcon className="w-3.5 h-3.5" />Voice message</span>;

}
