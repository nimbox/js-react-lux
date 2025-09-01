import { createContext, useContext } from 'react';
import type { MessageProviderProps } from './MessageProvider';


// MesssageContext

export interface MessageContextProps extends Omit<MessageProviderProps, 'className' | 'children'> {

    isFirst?: boolean;
    isLast?: boolean;
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