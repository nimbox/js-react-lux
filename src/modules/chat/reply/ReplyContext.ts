import { createContext, useContext } from 'react';
import type { ReplyProps } from './ReplyProvider';


// ReplyContext

export type ReplyContextProps = ReplyProps;

export const ReplyContext = createContext<ReplyContextProps | null>(null);

export function useReply() {

    const context = useContext(ReplyContext);
    if (!context) {
        throw new Error('useReply must be used within a Reply');
    }

    return context;

}
