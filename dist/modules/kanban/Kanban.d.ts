import { FC } from "react";
import { ConnectDragSource } from "react-dnd";
export interface KanbanContextProps {
    isDragging: boolean;
    setIsDragging: (isDragging: boolean) => void;
}
export declare const KanbanContext: import("react").Context<KanbanContextProps>;
export declare const KanbanProvider: FC;
export declare const useKanbanContext: () => KanbanContextProps;
export declare const useCard: (id: string) => [any, ConnectDragSource];
