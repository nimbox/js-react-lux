import { FC } from 'react';
export declare const Cards: FC<{}>;
interface CardComponent<P> extends FC<P> {
    Header: FC<{}>;
    Body: FC<{}>;
}
export declare const Card: CardComponent<{}>;
export {};
