import { RefObject } from 'react';
import { KanbanCardItem, MoveCardCallback } from './types';
export interface UseCardsProps {
    moveCard?: MoveCardCallback;
}
export interface UseCardsCollectedProps {
    isOver: boolean;
    canDrop: boolean;
    placeholderIndex?: number | null;
    item: KanbanCardItem;
}
export declare function useCards<C extends HTMLElement, P extends HTMLElement>(columnId: string, { moveCard }?: UseCardsProps): [RefObject<C>, RefObject<P>, UseCardsCollectedProps];
