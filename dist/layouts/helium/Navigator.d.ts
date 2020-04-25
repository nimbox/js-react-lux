import { FC } from 'react';
interface DefaultNavigatorComponent<P> extends FC<P> {
    Group: FC<{
        className?: string;
    }>;
    Item: FC<{
        active: boolean;
        className?: string;
    }>;
}
export declare const DefaultNavigator: DefaultNavigatorComponent<{
    className?: string;
}>;
export {};
