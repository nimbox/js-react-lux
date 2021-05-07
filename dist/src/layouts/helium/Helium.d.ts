import { FC } from 'react';
interface Props {
    navigator?: boolean;
    setNavigator?: (show: boolean) => void;
}
export declare const Helium: FC<Props>;
export declare const Header: FC<{
    className?: string;
}>;
export declare const Toggle: FC<{
    always: boolean;
}>;
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
interface PanelComponent<P> extends FC<P> {
    Group: FC<{
        className?: string;
    }>;
    Item: FC<{
        active: boolean;
        className?: string;
    }>;
}
export declare const Panel: PanelComponent<{
    className?: string;
}>;
export {};
