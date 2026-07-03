import { createContext, useContext } from 'react';
import type { MessageProviderInputs } from './MessageProvider';


// MessageContext

export interface MessageContextProps extends MessageProviderInputs {
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
