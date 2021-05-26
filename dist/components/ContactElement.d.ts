import React from "react";
import { ComponentScale } from "./ComponentScale";
export interface ContactElementProps {
    type: string;
    locus?: string;
    render: string;
    scale?: ComponentScale;
    className?: string;
}
export declare const ContactElement: React.ForwardRefExoticComponent<ContactElementProps & React.RefAttributes<HTMLInputElement>>;
