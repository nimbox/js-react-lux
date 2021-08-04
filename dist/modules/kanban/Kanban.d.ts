import { FC } from "react";
import { ConnectDragSource, ConnectDropTarget } from "react-dnd";
export interface KanbanContextProps {
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
}
export declare const KanbanContext: import("react").Context<KanbanContextProps>;
export declare const KanbanProvider: FC;
export declare const useKanbanContext: () => KanbanContextProps;
export declare const useColumn: (id: string) => [any, ConnectDropTarget];
export declare const useCard: (id: string) => [any, ConnectDragSource];
