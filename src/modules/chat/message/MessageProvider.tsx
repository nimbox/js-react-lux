import type { ReactNode } from 'react';
import type { BaseMessage } from '../types/BaseMessage';
import { MessageContext } from './MessageContext';


// MessageProvider

// The per-message inputs the dispatch layer passes in — the message plus its
// position flags. The provider forwards these verbatim into `MessageContext` (it adds
// no derived state of its own). The reaction callbacks are NOT here — they are
// content-blind and per-viewer, so they live on `ChatContext` (one wiring for the
// whole chat), each receiving the `BaseMessage` it acts on. NOTE: this is NOT a
// message *component*'s props — that is `MessageInstanceProps` below.
export interface MessageProviderInputs {

    message: BaseMessage;

    isFirst?: boolean;
    isLast?: boolean;

}
export interface MessageProviderProps extends MessageProviderInputs {

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

// A PURE context producer — it renders NO DOM of its own (mirrors
// `ConversationProvider`). The full-surface frame, layout, and BOTH hover scopes live
// entirely in `MessageContainer`: the `w-full group` row-hover region that reveals the
// reaction picker, and the `group/bubble` scope that reveals the option menu. Keeping
// no wrapper here means all the message chrome — and all the hover logic — is reasoned
// about in one place, and the provider stays mountable around any surface (the full
// timeline mounts it; previews pass `message` as a prop and never touch it).
export function MessageProvider({ children, ...props }: MessageProviderProps) {

    return (
        <MessageContext.Provider value={{ ...props }}>
            {children}
        </MessageContext.Provider>
    );

}

// The slots that an instance composes live in the `Message` (full surface) and
// `MessagePreview` (preview surface) namespaces — NOT on this component. The
// provider is only the context producer (the dispatch layer mounts it); the slots
// are context consumers. Keeping them apart is the point of the split.
