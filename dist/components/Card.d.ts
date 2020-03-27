import { FC } from 'react';
export declare const Cards: FC<{}>;
interface CardComponent<P> extends FC<P> {
    Header: FC<{}>;
    Body: FC<{}>;
    Footer: FC<{}>;
}
export declare const Card: CardComponent<{}>;
export {};
