import { FC } from 'react';
import { ComponentScale } from './ComponentScale';
export interface CheckBarProps {
    scale?: ComponentScale;
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
