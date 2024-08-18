import { createContext, useContext } from 'react';

export const ChatDirectionContext = createContext<'received' | 'sent'>('received');
export const useChatDirection = () => useContext(ChatDirectionContext);
