import { RefObject } from 'react';
import { KanbanColumnItem } from './types';
export interface UseColumnDropProps {
    onDrop?: (item: KanbanColumnItem) => void;
}
export interface UseColumnDropCollectedProps {
    item: KanbanColumnItem;
    isOver: boolean;
}
export declare function useColumnDrop<C extends HTMLElement>({ onDrop }: UseColumnDropProps): [RefObject<C>, UseColumnDropCollectedProps];
