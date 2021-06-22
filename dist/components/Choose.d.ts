import React, { ReactElement, Ref } from 'react';
import { ComponentScale } from './ComponentScale';
export interface ChooseProps<T> extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    scale?: ComponentScale;
    recentValues?: string[];
    items?: T[];
    loading?: boolean;
    error?: any;
    getItem?: (value: string) => T;
    searchItems?: (q: string) => T[] | Promise<T[]>;
    itemValue: (item: T) => string;
    itemMatch: (q: string, item: T) => boolean;
    renderItem: (item: T) => React.ReactNode;
    creatable?: boolean;
    onCreate?: (q: string) => T | Promise<T>;
    renderCreateItem?: (value: string) => React.ReactNode;
    inline?: boolean;
    className?: string;
}
declare type ForwardRefFn<R> = <P = {}>(p: P & React.RefAttributes<R>) => ReactElement | null;
export declare const ChooseFn: <T extends {}>({ scale, recentValues, items, loading, error, getItem, searchItems, itemValue, itemMatch, renderItem, creatable, onCreate, renderCreateItem, inline, className, ...props }: ChooseProps<T>, ref: Ref<HTMLInputElement>) => JSX.Element;
/**
 * Descripción
 *
 * Seleccionar y Cerrar
 *   - Enter
 *   - Tab && custor != null
 *   - Click
 * Cerrar
 *   - Tab && cusrsor == null
 *   - onClickOutside
 *
 *
 */
export declare const Choose: ForwardRefFn<HTMLInputElement>;
export {};
