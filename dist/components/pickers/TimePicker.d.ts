import React, { FC } from 'react';
import { ComponentScale } from '../ComponentScale';
interface TimePickerProps {
    /** Name used for the input element and returned in the change event. */
    name?: string;
    /** String representation of the time. */
    value: string;
    scale?: ComponentScale;
    /** Change event handler. */
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    /** Input placeholder. */
    placeholder?: string;
}
/**
 * DatePicker. Select a date with one click.
 */
export declare const TimePicker: FC<TimePickerProps>;
export {};
