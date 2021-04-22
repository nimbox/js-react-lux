import React, { FC } from 'react';
import { ComponentScale } from '../ComponentSize';
export interface Props {
    scale: ComponentScale;
    error?: boolean;
    className?: string;
}
export interface LabelProps {
    badge?: any;
    className?: string;
}
export declare const Context: React.Context<Pick<Props, "scale" | "error">>;
export interface ControlComponent extends FC<Props> {
    Label: FC<LabelProps>;
    Message: FC<{
        className?: string;
    }>;
    Error: FC<{
        className?: string;
    }>;
}
export declare const Control: ControlComponent;
