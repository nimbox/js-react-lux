import { FC, ReactElement } from 'react';
interface DropdownProps {
    options: any[];
    key?: (option: any) => ReactElement;
    value?: (option: any) => ReactElement;
    onChange?: (option: any) => void;
}
export declare const Dropdown: FC<DropdownProps>;
export {};
