import classNames from 'classnames';
import { useState, type ReactNode } from 'react';
import type { BaseMessage } from '../types/BaseMessage';
import type { ReactionParticipant } from '../types/ReactionParticipant';
import { MessageContext } from './MessageContext';


// MessageProvider

// The per-message inputs the dispatch layer passes in — the message plus its
// interaction callbacks and position flags. The provider forwards these into
// `MessageContext` (which adds `isOver`); `MessageProviderProps` adds the
// wrapper's `className`/`children`. NOTE: this is NOT a message *component*'s
// props — that is `MessageInstanceProps` below.
export interface MessageProviderInputs {

    message: BaseMessage;

    onCreateReaction?: (emoji: string) => Promise<void>;
    onDeleteReaction?: (emoji: string) => Promise<void>;
    getReactionParticipants?: () => Promise<ReactionParticipant[]>;

    isFirst?: boolean;
    isLast?: boolean;

}
export interface MessageProviderProps extends MessageProviderInputs {

    className?: string;
    children?: ReactNode;

}

// What a message instance receives: the message with its arm-typed
// `content`. The instance reads typed content from props and composes
// slots; the **dispatch layer mounts `MessageProvider`** (the context
// the slots read) around it — instances never mount it themselves
// ("whoever dispatches, provides", §6).

export interface MessageInstanceProps<TContent = unknown> {
    message: Omit<BaseMessage, 'content'> & { content?: TContent };
}

export function MessageProvider({ className, children, ...props }: MessageProviderProps) {

    const [isOver, setIsOver] = useState(false);

    return (
        <MessageContext.Provider value={{ ...props, isOver }}>
            <div
                onMouseEnter={() => setIsOver(true)}
                onMouseLeave={() => setIsOver(false)}
                className={classNames('w-full group', className)}
            >
                {children}
            </div>
        </MessageContext.Provider>
    );

}

// The slots that an instance composes live in the `Message` (full surface) and
// `MessagePreview` (preview surface) namespaces — NOT on this component. The
// provider is only the context producer (the dispatch layer mounts it); the slots
// are context consumers. Keeping them apart is the point of the split.
