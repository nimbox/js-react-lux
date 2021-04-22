import { FC } from "react";
import { ComponentScale } from "../ComponentSize";
interface SelectComponent extends FC<{
    scale?: ComponentScale;
    className?: String;
}> {
    Option: FC<{
        value?: any;
        className?: string;
    }>;
}
export declare const Select: SelectComponent;
export {};
