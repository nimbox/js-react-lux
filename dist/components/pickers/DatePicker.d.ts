import React from 'react';
import { ComponentScale } from '../ComponentScale';
interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Name used for the input element and returned in the change event. */
    name?: string;
    /** String representation of the date. */
    value?: string;
    scale?: ComponentScale;
    /** Change event handler. */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** Wether to show the shortcuts menu. */
    shortcuts?: boolean;
    /** Input placeholder. */
    placeholder?: string;
}
/**
 * DatePicker. Select a date with one click.
 */
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLInputElement>>;
export {};
