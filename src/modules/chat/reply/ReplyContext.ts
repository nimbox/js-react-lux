import { createContext, useContext } from 'react';
import { MessageData } from '../types/MessageData';


// ReplyContext

export interface ReplyContextProps {
    message: Omit<MessageData, 'replyTo'>;
}

export const ReplyContext = createContext<ReplyContextProps | null>(null);

export function useReply() {

    const context = useContext(ReplyContext);
    if (!context) {
        throw new Error('useReply must be used within a Reply');
    }

    return context;

}
