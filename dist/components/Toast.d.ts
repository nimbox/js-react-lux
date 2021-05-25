import React, { FC } from "react";
export declare type ToastContainerLocation = 'top-right';
export declare type ToastItemType = 'success' | 'info' | 'warning' | 'danger';
export interface ToastItemContent {
    title?: string;
    description: string;
}
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
export interface ToastItem {
    id: string;
    type: ToastItemType;
    component: React.ReactNode;
    autoDelete?: boolean;
    autoDeleteTimeout?: number;
}
export declare const useToast: () => {
    addToast: (type: ToastItemType, item: ToastItemContent | React.ReactNode, dismiss?: number | undefined) => void;
};
export declare const ToastProvider: FC<ToastProviderProps>;
export declare const ToastContainer: FC<{}>;
export declare const ToastContent: FC<{
    title?: string;
    description: string;
}>;
export declare const Toast: FC<ToastProps>;
