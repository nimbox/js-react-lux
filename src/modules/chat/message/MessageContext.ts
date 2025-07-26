import { createContext, useContext } from 'react';
import { MessageData } from '../types/MessageData';


// MesssageContext

export interface MessageContextProps {

    message: MessageData;

    isFirst?: boolean;
    isLast?: boolean;

}

export const MessageContext = createContext<MessageContextProps | null>(null);

export function useMessage() {

    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a Message');
    }

    return context;

}