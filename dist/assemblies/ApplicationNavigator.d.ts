import { FC } from 'react';
interface Item {
    name: string;
    to: string;
}
interface Group {
    name: string;
    items: Item[];
}
export interface Props {
    items: (Group | Item)[];
    onSupport: () => void;
}
export declare const ApplicationNavigator: FC<Props>;
export {};
