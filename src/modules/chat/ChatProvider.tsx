import { createContext } from 'react';
import { ReactionDetailsData } from './types/ReactionDetailsData';


// Context
export interface ChatContextProps {

    getReactions: (messageId: string) => Promise<ReactionDetailsData[]>;
    addReaction: (messageId: string, emoji: string) => Promise<void>;
    removeReaction: (messageId: string, emoji: string) => Promise<void>;

}

const defaultProps: ChatContextProps = {

    getReactions: defaultGetReactions,
    addReaction: defaultAddReaction,
    removeReaction: defaultRemoveReaction

};

export const ChatProviderContext = createContext<ChatContextProps>(defaultProps);

// Provider

export interface ChatProviderProps extends ChatContextProps {

    children: React.ReactNode;

}

export function ChatProvider(props: Partial<ChatProviderProps>) {

    const { children, ...rest } = props;

    return (
        <ChatProviderContext.Provider value={{ ...defaultProps, ...rest }}>
            {children}
        </ChatProviderContext.Provider >
    );

}

// Defaults

function defaultGetReactions(): Promise<ReactionDetailsData[]> {
    return Promise.reject(
        new Error(
            'No fetchReactionDetails found – wrap your app in <ChatProvider>'
        )
    );
}

function defaultAddReaction(): Promise<void> {
    return Promise.reject(
        new Error(
            'No addReaction found – wrap your app in <ChatProvider>'
        )
    );
}

function defaultRemoveReaction(): Promise<void> {
    return Promise.reject(
        new Error(
            'No removeReaction found – wrap your app in <ChatProvider>'
        )
    );
}
