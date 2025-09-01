import { createContext, useContext } from 'react';
import type { ReplyProps } from './ReplyProvider';


// ReplyContext

export const ReplyContext = createContext<ReplyProps | null>(null);

export function useReply() {

    const context = useContext(ReplyContext);
    if (!context) {
        throw new Error('useReply must be used within a Reply');
    }

    return context;

}
