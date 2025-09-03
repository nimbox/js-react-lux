import { ChatContext, defaultProps, type ChatContextProps } from './ChatContext';


// Chat 

export interface ChatProviderProps extends ChatContextProps {
    children: React.ReactNode;
}

export function ChatProvider(props: Partial<ChatProviderProps>) {

    const { children, ...overrideProps } = props;

    // Render

    return (
        <ChatContext.Provider value={{ ...defaultProps, ...overrideProps }}>
            {children}
        </ChatContext.Provider >
    );

}
