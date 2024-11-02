import { createContext, useContext } from 'react';


export const ChatDirectionContext = createContext<'in' | 'out'>('in');
export const useChatDirection = () => useContext(ChatDirectionContext);
