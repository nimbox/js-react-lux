import { RefObject } from 'react';
export interface UseColumnProps {
    isDragging: boolean;
}
export declare function useColumn<T extends HTMLElement>(id: string): [RefObject<T>, UseColumnProps];
