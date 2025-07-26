import { createContext, useContext } from 'react';
import { MessageGroupData } from '../types/MessageGroupData';


// MessageGroupContext

export interface MessageGroupContextProps {

    group: MessageGroupData;

}

export const MessageGroupContext = createContext<MessageGroupContextProps | null>(null);

export function useMessageGroup() {

    const context = useContext(MessageGroupContext);
    if (!context) {
        throw new Error('useMessageGroup must be used within a MessageGroup');
    }

    return context;

}
