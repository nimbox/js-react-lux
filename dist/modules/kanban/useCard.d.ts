import { RefObject } from 'react';
export interface UseCardProps {
    isDragging: boolean;
}
export declare function useCard<T extends HTMLElement>(id: string): [RefObject<T>, UseCardProps];
