import { createContext, useContext } from 'react';
import type { ToastItemContent, ToastItemType } from './Toast';


interface ToastProviderContext {
    addToast: (type: ToastItemType, item: ToastItemContent | React.ReactNode, dismiss?: number) => void;
}

export const ToastContext = createContext<ToastProviderContext>({ addToast: () => { } });

export const useToast = () => {
    const context = useContext(ToastContext);
    return { addToast: context.addToast };
};
