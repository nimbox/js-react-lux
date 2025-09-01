import type { ReactNode } from 'react';
import { useChat } from '../../ChatContext';
import { useReply } from '../ReplyContext';
import { ReplyProvider, type ReplyProps } from '../ReplyProvider';


interface TimedReplyProps {
    icon?: ReactNode;
    label?: string;
}

export function TimedReply(props: ReplyProps & TimedReplyProps) {

    return (
        <ReplyProvider {...props}>
            <ReplyProvider.Container>
                <ReplyProvider.Content>
                    <ReplyProvider.Author />
                    <TimedReplyBody {...props} />
                </ReplyProvider.Content>
            </ReplyProvider.Container>
        </ReplyProvider>
    );

}

function TimedReplyBody(props: TimedReplyProps) {

    const { formatDuration } = useChat();
    const { message: { attachments } } = useReply();

    if (!attachments || attachments.length === 0) {
        return null;
    }

    return (
        <ReplyProvider.Body>
            <div className="inline-flex flex-row gap-1 items-center">
                {props.icon && <span>{props.icon}</span>}
                {props.label && <span>{props.label}</span>}
                <span>{formatDuration(attachments[0].duration || 0)}</span>
            </div>
        </ReplyProvider.Body >
    );

}
