import { FC } from 'react';
interface Props {
    navigator?: boolean;
    onNavigator?: (side: boolean) => void;
}
export declare const Helium: FC<Props>;
interface HeaderComponent<P> extends FC<P> {
    Navigator: FC<{}>;
    Content: FC<{}>;
}
export declare const Header: HeaderComponent<{}>;
export declare const Toggle: FC<{}>;
export declare const Navigator: FC<{}>;
interface MainComponent<P> extends FC<P> {
    Content: FC<{
        className?: string;
    }>;
    Side: FC<{
        className?: string;
    }>;
}
export declare const Main: MainComponent<{}>;
export {};
