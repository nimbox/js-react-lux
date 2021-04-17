import { FC } from 'react';
import { ComponentSize } from './ComponentSize';
export interface RadioBarProps {
    size: ComponentSize;
    value: any;
    onChange: (value: any) => void;
    className?: string;
}
export interface RadioBarOptionProps {
    value: any;
    className?: string;
}
export interface RadioBarComponent extends FC<RadioBarProps> {
    Option: FC<RadioBarOptionProps>;
}
export declare const RadioBar: RadioBarComponent;
