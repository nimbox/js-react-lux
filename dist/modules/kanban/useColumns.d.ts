import { RefObject } from 'react';
import { KanbanColumnItem, MoveColumnCallback } from './types';
export interface UseColumnsProps {
    moveColumn?: MoveColumnCallback;
}
export interface UseColumnsCollectedProps {
    isOver: boolean;
    canDrop: boolean;
    placeholderIndex?: number | null;
    item: KanbanColumnItem;
}
export declare function useColumns<C extends HTMLElement, P extends HTMLElement>({ moveColumn }?: UseColumnsProps): [RefObject<C>, RefObject<P>, UseColumnsCollectedProps];
