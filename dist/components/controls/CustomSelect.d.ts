import { FC } from 'react';
import { ComponentScale } from '../ComponentScale';
import { ComponentAlign } from '../ComponentAlign';
export interface RadioSelectProps {
    scale?: ComponentScale;
    value: any;
    label: (t: any) => string | JSX.Element;
    onChange: (value: any) => void;
    align: ComponentAlign;
    className?: string;
}
export interface RadioSelectOptionProps {
    value: any;
    className?: string;
}
interface RadioSelectComponent extends FC<RadioSelectProps> {
    Option: FC<RadioSelectOptionProps>;
}
export declare const CustomSelect: RadioSelectComponent;
export {};
