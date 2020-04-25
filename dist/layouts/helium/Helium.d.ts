import { FC } from 'react';
interface Props {
    navigator?: boolean;
    onNavigator?: (side: boolean) => void;
}
export declare const Helium: FC<Props>;
export declare const Header: FC<{
    className?: string;
}>;
export declare const Toggle: FC<{}>;
interface NavigatorComponent<P> extends FC<P> {
    Header: FC<{
        className?: string;
    }>;
    Content: FC<{
        className?: string;
    }>;
    Footer: FC<{
        className?: string;
    }>;
}
export declare const Navigator: NavigatorComponent<{
    className?: string;
}>;
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
