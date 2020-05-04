import { FC } from 'react';
interface ContextProps {
    value: any;
    setValue: (value: any) => void;
}
interface TabsComponent extends FC<ContextProps & {
    className?: string;
}> {
    Option: FC<{
        value?: any;
        className?: string;
    }>;
}
export declare const Tabs: TabsComponent;
export {};
