import { FC } from 'react';
export interface KanbanContextProps {
    isDraggingColumn: boolean;
    setIsDraggingColumn: (isDraggingColumn: boolean) => void;
    isDraggingCard: boolean;
    setIsDraggingCard: (isDraggingCard: boolean) => void;
}
export declare const KanbanContext: import("react").Context<KanbanContextProps>;
export declare const KanbanProvider: FC<{}>;
export declare const useKanbanContext: () => KanbanContextProps;
