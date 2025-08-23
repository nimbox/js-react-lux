import { createContext, useContext } from 'react';
import { type MessageData } from '../types/MessageData';


// MesssageContext

export interface MessageContextProps {

    menu?: React.ReactElement<{ onOpenChange: (open: boolean) => void }>;
    message: MessageData;

    isFirst?: boolean;
    isLast?: boolean;
    isHovered: boolean;

}

export const MessageContext = createContext<MessageContextProps | null>(null);

export function useMessage() {

    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a Message');
    }

    return context;

}