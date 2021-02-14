import { FC } from 'react';
import { ComponentSize } from './ComponentSize';
export interface CheckboxBarProps {
    size?: ComponentSize;
    value: any[];
    onChange: (value: any) => void;
    className?: string;
}
export interface CheckboxBarOptionProps {
    value: any;
    className?: string;
}
interface CheckboxBarComponent extends FC<CheckboxBarProps> {
    Option: FC<CheckboxBarOptionProps>;
}
export declare const CheckboxBar: CheckboxBarComponent;
export {};
