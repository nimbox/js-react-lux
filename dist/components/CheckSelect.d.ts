import { FC } from 'react';
import { ComponentScale } from './ComponentSize';
export interface CheckSelectProps {
    scale?: ComponentScale;
    label: string;
    value: any[];
    onChange: (value: any) => void;
    className?: string;
}
export interface CheckSelectContentProps {
    value: any;
    className?: string;
}
interface CheckSelectComponent extends FC<CheckSelectProps> {
    Option: FC<CheckSelectContentProps>;
}
export declare const CheckSelect: CheckSelectComponent;
export {};
