import { FC, ReactElement } from 'react';
interface CustomSelectProps {
    options: any[];
    key?: (option: any) => ReactElement;
    value?: (option: any) => ReactElement;
    onChange?: (option: any) => void;
}
export declare const CustomSelect: FC<CustomSelectProps>;
export {};
