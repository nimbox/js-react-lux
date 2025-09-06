import { createContext, useContext } from 'react';
import type { MessageProps } from './MessageProvider';


// MesssageContext

export interface MessageContextProps extends MessageProps {
    isOver: boolean;
}

export const MessageContext = createContext<MessageContextProps | null>(null);

export function useMessage() {

    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a Message');
    }

    return context;

}
