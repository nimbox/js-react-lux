export const COLUMN_TYPE = 'kanban-column';
export const CARD_TYPE = 'kanban-card';

export interface KanbanCardItem {
    id: string;
    sourceBoundingClientRect: DOMRect;
}

export interface KanbanColumnItem {
    id: string;
    sourceBoundingClientRect: DOMRect;
}

export type MoveCardCallback = (cardId: string, columnId: string, cardIndex: number) => void; 
export type MoveColumnCallback = (columnId: string, columnIndex: number) => void; 
