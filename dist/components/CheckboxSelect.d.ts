import { FC } from 'react';
import { ComponentSize } from './ComponentSize';
export interface CheckboxSelectProps {
    size?: ComponentSize;
    label: string;
    value: any[];
    onChange: (value: any) => void;
    className?: string;
}
export interface CheckboxSelectContentProps {
    value: any;
    className?: string;
}
interface CheckboxSelectComponent extends FC<CheckboxSelectProps> {
    Option: FC<CheckboxSelectContentProps>;
}
export declare const CheckboxSelect: CheckboxSelectComponent;
export {};
