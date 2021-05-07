import { FC } from 'react';
interface CardComponent extends FC<{
    className?: string;
}> {
    Header: FC<{
        className?: string;
    }>;
    Body: FC<{
        className?: string;
    }>;
    Footer: FC<{
        className?: string;
    }>;
}
export declare const Card: CardComponent;
export {};
