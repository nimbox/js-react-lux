import { FC, ReactElement } from 'react';
interface Props {
    options: any[];
    key?: (option: any) => ReactElement;
    value?: (option: any) => ReactElement;
    onChange?: (option: any) => void;
}
export declare const CustomSelect: FC<Props>;
export {};
