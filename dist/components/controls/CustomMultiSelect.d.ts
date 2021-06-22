import { FC } from 'react';
import { ComponentAlign } from '../ComponentAlign';
import { ComponentScale } from '../ComponentScale';
export interface CustomMultiSelectProps {
    scale?: ComponentScale;
    label: (t: any) => string;
    value: any[];
    onChange: (value: any) => void;
    align: ComponentAlign;
    className?: string;
}
export interface CustomMultiSelectContentProps {
    value: any;
    className?: string;
}
interface CustomMultiSelectComponent extends FC<CustomMultiSelectProps> {
    Option: FC<CustomMultiSelectContentProps>;
}
export declare const CustomMultiSelect: CustomMultiSelectComponent;
export {};
