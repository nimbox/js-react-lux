import { FC } from 'react';
import { ComponentScale } from '../ComponentScale';
import { ComponentAlign } from '../ComponentAlign';
export interface CustomMultiSelectProps {
    scale?: ComponentScale;
    label: (t: any) => string | JSX.Element;
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
