import { FC } from "react";
import { InputProps } from "../controls/Input";
export interface SwatchPickerProps extends InputProps {
    swatches: string[];
    popperClassName: string;
}
export declare const SwatchPicker: FC<SwatchPickerProps>;
