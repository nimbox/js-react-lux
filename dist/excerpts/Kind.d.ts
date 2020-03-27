import { FC } from 'react';
interface Props {
    text: string;
    color: string;
    background: string;
    name?: string;
    value?: boolean;
    onChange?: (value: boolean) => void;
}
export declare const Kind: FC<Props>;
export {};
