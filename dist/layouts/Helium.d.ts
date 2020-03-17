import { FC } from 'react';
export declare const Helium: FC<{}>;
interface NavigatorComponent<P> extends FC<P> {
    Header: FC<{}>;
    Body: FC<{}>;
    Footer: FC<{}>;
}
export declare const Navigator: NavigatorComponent<{}>;
interface ContentComponent<P> extends FC<P> {
    Header: FC<{}>;
    Body: FC<{}>;
    Main: FC<{}>;
    Side: FC<{}>;
}
export declare const Content: ContentComponent<{}>;
export {};
