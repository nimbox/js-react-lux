import React, { ChangeEventHandler, ReactElement, Ref } from 'react';
import { ComponentScale } from './ComponentScale';
import { ComponentAlign } from './ComponentAlign';
export interface ChooseProps<T> extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    /** The default value for the choose component */
    name: string;
    defaultValue?: string;
    value?: string;
    recentValues?: string[];
    onChange?: ChangeEventHandler<HTMLInputElement>;
    items?: T[];
    loading?: boolean;
    error?: boolean;
    getItem: (value: string) => T;
    searchItems?: (q: string) => T[] | Promise<T[]>;
    itemValue: (item: T) => string;
    itemMatch: (q: string, item: T) => boolean;
    renderItem: (item: T) => React.ReactNode;
    renderListItem?: (item: T) => React.ReactNode;
    CreateComponent?: React.FC<{
        search: string;
        disabled: boolean;
        onSubmit: (submitting: void | Promise<void>) => void;
    }>;
    scale?: ComponentScale;
    inline?: boolean;
    align?: ComponentAlign;
    className?: string;
}
declare type ForwardRefFn<R> = <P = {}>(p: P & React.RefAttributes<R>) => ReactElement | null;
export declare const ChooseFn: <T extends {}>({ scale, name, recentValues, items, loading, error, getItem, searchItems, itemValue, itemMatch, renderItem, renderListItem, CreateComponent, inline, align, className, ...props }: ChooseProps<T>, ref: Ref<HTMLInputElement>) => JSX.Element;
/**
 * Descripción
 *
 * Seleccionar y Cerrar
 *   - Enter
 *   - Tab && custor != -1
 *   - Click
 * Cerrar
 *   - Tab && cursor == -1
 *   - onClickOutside
 *
 *
 */
export declare const Choose: ForwardRefFn<HTMLInputElement>;
export {};
