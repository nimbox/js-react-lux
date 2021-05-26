import React from "react";
import { ComponentScale } from "./ComponentScale";
export interface ContactProps {
    render: string;
    scale?: ComponentScale;
    className?: string;
}
export declare const Contact: React.ForwardRefExoticComponent<ContactProps & React.RefAttributes<HTMLInputElement>>;
