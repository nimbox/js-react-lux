import { AudioIcon } from '@nimbox/icons-react';
import { useTranslation } from 'react-i18next';
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

    const { t } = useTranslation();
    const { formatDuration } = useChat();
    const view = props.message.content as AudioView | undefined;

    const voiceMessage = t('chat.media.voiceMessage', { defaultValue: 'Voice message' });
    const label = view?.duration != null
        ? `${voiceMessage} · ${formatDuration(view.duration)}`
        : voiceMessage;

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

    const { t } = useTranslation();

    return <span className="inline-flex items-center gap-1"><AudioIcon className="w-3.5 h-3.5" />{t('chat.media.voiceMessage', { defaultValue: 'Voice message' })}</span>;

}
