import classNames from 'classnames';
import { useState, type ReactNode } from 'react';
import type { BaseMessage } from '../types/BaseMessage';
import type { ReactionDetailsData } from '../types/ReactionDetailsData';
import { MessageContext } from './MessageContext';


// MessageProvider

export interface MessageProps {

    message: BaseMessage;

    onCreateReaction?: (emoji: string) => Promise<void>;
    onDeleteReaction?: (emoji: string) => Promise<void>;
    getReactions?: () => Promise<ReactionDetailsData[]>;

    isFirst?: boolean;
    isLast?: boolean;

}
export interface MessageProviderProps extends MessageProps {

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
