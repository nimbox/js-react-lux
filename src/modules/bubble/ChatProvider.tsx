import { createContext } from 'react';
import { ReactionDetailData } from './types/ReactionDetailData';


export interface ChatContextProps {

    fetchReactionDetails: (messageId: string) => Promise<ReactionDetailData[]>;

}

export const ChatProviderContext = createContext<ChatContextProps>({

    fetchReactionDetails: defaultFetchReactionDetails

});

export interface ChatProviderProps extends ChatContextProps {

    children: React.ReactNode;

}

export function ChatProvider(props: ChatProviderProps) {

    const { children, ...rest } = props;

    return (
        <ChatProviderContext.Provider value={rest}>
          {children}
        </ChatProviderContext.Provider>
      );

}


// Default implementations for the ChatProviderContext

function defaultFetchReactionDetails(): Promise<ReactionDetailData[]> {

    return Promise.reject(
        new Error(
            'No fetchReactionDetails found – wrap your app in <ChatProvider>'
        )
    );

}