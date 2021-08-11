export declare const COLUMN_TYPE = "kanban-column";
export declare const CARD_TYPE = "kanban-card";
export interface KanbanCardItem {
    id: string;
    sourceBoundingClientRect: DOMRect;
}
export interface KanbanColumnItem {
    id: string;
    sourceBoundingClientRect: DOMRect;
}
export declare type MoveCardCallback = (cardId: string, columnId: string, cardIndex: number) => void;
export declare type MoveColumnCallback = (columnId: string, columnIndex: number) => void;
