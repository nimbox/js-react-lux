import { FC } from "react";
import { ComponentScale } from "./ComponentScale";
export interface ContactElementProps {
    value: any;
    type?: string;
    locus?: string;
    render: string;
    index: number;
    isDraggable: boolean;
    onChange: (dragIndex: number, hoverIndex: number) => void;
    scale?: ComponentScale;
    className?: string;
}
export declare const ContactElement: FC<ContactElementProps>;
