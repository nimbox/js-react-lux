import classNames from 'classnames';
import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CrossIcon, DangerIcon, InformationIcon, SuccessIcon, WarningIcon } from '../icons/components';


//
// Toast
//

export type ToastContainerLocation = 'top-right';

export type ToastItemType = 'success' | 'info' | 'warning' | 'danger';
export interface ToastItemContent {
    title?: string;
    description: string;
}

//

const Icon: { [key in ToastItemType]: FC<{ className: string }> } = {
    'success': ({ className }) => <SuccessIcon className={className} />,
    'info': ({ className }) => <InformationIcon className={className} />,
    'warning': ({ className }) => <WarningIcon className={className} />,
    'danger': ({ className }) => <DangerIcon className={className} />
};

//

export interface ToastProviderProps {
    location?: ToastContainerLocation;
    autoDelete?: boolean;
    autoDeleteTimeout?: number;
}


export interface ToastProps {

    type: ToastItemType;
    component: React.ReactNode;

    autoDelete?: boolean;
    autoDeleteTimeout?: number;
    onDelete: () => void;

}

//

export interface ToastItem {

    id: string;

    type: ToastItemType;
    component: React.ReactNode;

    autoDelete?: boolean;
    autoDeleteTimeout?: number;

}

//

interface ToastProviderContext {
    addToast: (type: ToastItemType, item: ToastItemContent | React.ReactNode, dismiss?: number) => void;
}

const Context = createContext<ToastProviderContext>({ addToast: (type: ToastItemType, toast: ToastItemContent | React.ReactNode, dismiss?: number) => null });

export const useToast = () => {
    const context = useContext(Context);
    return { addToast: context.addToast };
};

//

export const ToastProvider: FC<ToastProviderProps> = ({ location = 'top-right', autoDelete = true, autoDeleteTimeout = 3000, children }) => {

    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = (type: ToastItemType, item: ToastItemContent | React.ReactNode, dismiss?: number) => {
        setToasts(current => {
            const component = React.isValidElement(item) ? item : <ToastContent title={(item as ToastItemContent).title} description={(item as ToastItemContent).description} />;
            const d = dismiss !== 0;
            const dt = dismiss || autoDeleteTimeout;
            return [...current, { id: uuidv4(), type, component, autoDelete: d, autoDeleteTimeout: dt }];
        });
    };

    const deleteToast = (id: string) => {
        setToasts(current => current.filter(t => t.id !== id));
    };

    return (
        <Context.Provider value={{ addToast }}>
            {children}
            <ToastContainer>
                {toasts.map(t =>
                    <Toast key={t.id} {...t} onDelete={() => deleteToast(t.id)} />
                )}
            </ToastContainer>
        </Context.Provider>
    );

};

export const ToastContainer: FC<{}> = ({ children }) => {
    return (
        <div className="fixed w-64 p-2 pt-20 inset-y-0 right-0 space-y-2 pointer-events-none z-50">
            {children}
        </div>
    );
}

export const ToastContent: FC<{ title?: string, description: string }> = ({ title, description }) => {
    return (
        <>
            {title && <div className="font-bold">{title}</div>}
            <div>{description}</div>
        </>
    );
};

export const Toast: FC<ToastProps> = ({ type, component, autoDelete = true, autoDeleteTimeout = 5000, onDelete }) => {

    const [initial, setInitial] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => setInitial(false), 100);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (autoDelete) {
                onDelete();
            }
        }, autoDeleteTimeout);
        return () => clearTimeout(timeout);
    }, [autoDelete, autoDeleteTimeout, onDelete]);

    const IconType = Icon[type];

    return (
        <div className={classNames('px-4 py-4 flex flex-row items-start space-x-4 rounded transition-transform duration-250 transform translate-x-0',
            { 'translate-x-64': initial },
            { 'text-white bg-primary-500': type === 'success' },
            { 'text-white bg-info-500': type === 'info' },
            { 'text-white bg-secondary-500': type === 'warning' },
            { 'text-white bg-danger-500': type === 'danger' },
            'pointer-events-auto'
        )}>
            <div>
                <IconType className="flex-none w-6 h-6" />
            </div>
            <div className="flex-grow min-w-0 break-words">
                {component}
            </div>
            <div onClick={onDelete} className="flex-none cursor-pointer"><CrossIcon className="w-6 h-6" /></div>
        </div>
    );

}
