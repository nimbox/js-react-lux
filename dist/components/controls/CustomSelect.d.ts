import { FC } from 'react';
import { ComponentScale } from '../ComponentScale';
import { ComponentAlign } from '../ComponentAlign';
export interface CustomSelectProps {
    scale?: ComponentScale;
    value: any;
    label: (t: any) => string | JSX.Element;
    onChange: (value: any) => void;
    align: ComponentAlign;
    className?: string;
}
export interface CustomSelectOptionProps {
    value: any;
    className?: string;
}
interface CustomSelectComponent extends FC<CustomSelectProps> {
    Option: FC<CustomSelectOptionProps>;
}
export declare const CustomSelect: CustomSelectComponent;
export {};
