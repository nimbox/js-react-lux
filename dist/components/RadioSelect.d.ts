import { FC } from 'react';
import { ComponentScale } from './ComponentSize';
export interface RadioSelectProps {
    scale?: ComponentScale;
    value: any;
    label: String;
    onChange: (value: any) => void;
    className?: string;
}
export interface RadioSelectOptionProps {
    value: any;
    className?: string;
}
interface RadioSelectComponent extends FC<RadioSelectProps> {
    Option: FC<RadioSelectOptionProps>;
}
export declare const RadioSelect: RadioSelectComponent;
export {};
