import { ChatContext, ChatContextProps, defaultProps } from './ChatContext';


// Chat

export interface ChatProviderProps extends ChatContextProps {
    children: React.ReactNode;
}

export function ChatProvider(props: Partial<ChatProviderProps>) {

    const { children, ...rest } = props;

    return (
        <ChatContext.Provider value={{
            ...defaultProps,
            ...rest
        }}>
            {children}
        </ChatContext.Provider >
    );

}
