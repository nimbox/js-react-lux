import { FC } from 'react';
interface DefaultNavigatorComponent<P> extends FC<P> {
    Content: FC<{}>;
    Group: FC<{}>;
    Item: FC<{
        active: boolean;
    }>;
    Footer: FC<{}>;
    Copyright: FC<{}>;
}
export declare const DefaultNavigator: DefaultNavigatorComponent<{}>;
export {};
