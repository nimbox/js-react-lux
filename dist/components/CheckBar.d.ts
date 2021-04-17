import { FC } from 'react';
import { ComponentSize } from './ComponentSize';
export interface CheckBarProps {
    size: ComponentSize;
    value: any[];
    onChange: (value: any) => void;
    className?: string;
}
export interface CheckBarOptionProps {
    value: any;
    className?: string;
}
export interface CheckBarComponent extends FC<CheckBarProps> {
    Option: FC<CheckBarOptionProps>;
}
export declare const CheckBar: CheckBarComponent;
