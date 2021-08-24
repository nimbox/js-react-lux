import React from 'react';
import { InputProps } from '../controls/Input';
import { PopperPlacement } from '../Popper';
export declare type SwatchPickerAlign = 'start' | 'stretch' | 'end';
export interface SwatchPickerProps extends InputProps {
    /** Name used for the input element and returned in the change event. */
    name?: string;
    /** String representation of the color (for uncontrolled). */
    defaultValue?: string;
    /** String representation of the color (for controlled). */
    value?: string;
    /** Possible swatch colors. */
    values?: string[];
    /** Change event handler (for controlled). */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** Popper placement. */
    placement?: PopperPlacement;
    /** Set popper width to the same width of the reference element. */
    withSameWidth?: boolean;
    /** Classes to append to the popper element. */
    popperClassName?: string;
}
export declare const SwatchPicker: React.ForwardRefExoticComponent<SwatchPickerProps & React.RefAttributes<HTMLInputElement>>;
