import { RefObject } from 'react';
import { KanbanCardItem } from './types';
export interface UseCardDropProps {
    onDrop?: (item: KanbanCardItem) => void;
}
export interface UseCardDropCollectedProps {
    item: KanbanCardItem;
    isOver: boolean;
}
export declare function useCardDrop<C extends HTMLElement>({ onDrop }: UseCardDropProps): [RefObject<C>, UseCardDropCollectedProps];
