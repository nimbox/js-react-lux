import { useChat } from '../ChatContext';
import { buildMessageRows } from '../message/buildMessageRows';
import { MessageGroup } from '../message/MessageGroup';
import { MessageList } from '../message/MessageList';
import { MessageProvider } from '../message/MessageProvider';
import { MessageSeparator } from '../message/MessageSeparator';
import { useMessageRenderer } from '../message/useMessageRenderer';
import type { BaseMessage } from '../types/BaseMessage';


// ThreadMessage — the timeline dispatch unit lux does NOT ship as a component: it
// resolves a message's `full` renderer and mounts `MessageProvider` around it
// ("whoever dispatches, provides" — docs §6). This is the ~10 lines a consumer writes;
// it lives here as story-support and is a candidate to promote into the base later
// (lux claims to own thread orchestration — docs §1).
export function ThreadMessage({ message, isFirst, isLast }: { message: BaseMessage; isFirst?: boolean; isLast?: boolean }) {

    const resolveRenderer = useMessageRenderer();
    const Renderer = resolveRenderer(message, 'full');

    return (
        <MessageProvider message={message} isFirst={isFirst} isLast={isLast}>
            <Renderer message={message} />
        </MessageProvider>
    );

}


// One message rendered inside its own author group (avatar column + alignment), with
// no day separator — the focused unit the single-bubble stories drive. `isFirst`
// controls the author header; `isLast` the bubble connector.
export function SingleMessage({ message, isFirst = true, isLast = true }: { message: BaseMessage; isFirst?: boolean; isLast?: boolean }) {
    return (
        <MessageGroup group={{ id: message.id, alignment: message.alignment, author: message.author }}>
            <ThreadMessage message={message} isFirst={isFirst} isLast={isLast} />
        </MessageGroup>
    );
}


export interface MessageThreadProps {

    messages: BaseMessage[];

    // Injects the "New messages" marker immediately before this id (unread is
    // viewer-relative — the story decides it). See buildMessageRows / §4.
    markerBeforeId?: string;

    className?: string;

}

// The consumer glue that turns a flat message list into the rendered timeline: run
// `buildMessageRows` (sort, day separators, author groups, single/marker rows), then
// render each row kind. `MessageList` owns the sticky-bottom scroll; `MessageGroup`
// owns the avatar column + alignment; `ThreadMessage` dispatches each bubble.
export function MessageThread({ messages, markerBeforeId, className }: MessageThreadProps) {

    const { formatCalendar } = useChat();
    const rows = buildMessageRows(messages, { markerBeforeId });

    return (
        <MessageList className={className}>
            {rows.map((row) => {
                switch (row.type) {
                    case 'separator':
                        return (
                            <MessageSeparator key={row.id}>
                                <MessageSeparator.Pill>{formatCalendar(row.date)}</MessageSeparator.Pill>
                            </MessageSeparator>
                        );
                    case 'marker':
                        return (
                            <MessageSeparator key={row.id}>
                                <MessageSeparator.Pill>{row.label ?? 'New messages'}</MessageSeparator.Pill>
                            </MessageSeparator>
                        );
                    case 'single':
                        // Ungrouped system event — centered, no avatar column.
                        return (
                            <div key={row.message.id} className="px-10 flex justify-center">
                                <ThreadMessage message={row.message} isFirst isLast />
                            </div>
                        );
                    case 'group':
                        return (
                            <MessageGroup key={row.id} group={row.group}>
                                {row.group.messages.map((item) => (
                                    <ThreadMessage
                                        key={item.message.id}
                                        message={item.message}
                                        isFirst={item.isFirst}
                                        isLast={item.isLast}
                                    />
                                ))}
                            </MessageGroup>
                        );
                }
            })}
        </MessageList>
    );

}
