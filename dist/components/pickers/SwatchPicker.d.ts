import React from 'react';
import { InputProps } from '../controls/Input';
export declare type SwatchPickerAlign = 'start' | 'stretch' | 'end';
export interface SwatchPickerProps extends InputProps {
    swatches?: string[];
    align?: SwatchPickerAlign;
    popperClassName?: string;
}
export declare const SwatchPicker: React.ForwardRefExoticComponent<SwatchPickerProps & React.RefAttributes<HTMLInputElement>>;
