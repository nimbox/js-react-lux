import React, { CSSProperties, FC } from 'react';
import { ComponentScale } from '../ComponentScale';
export interface ControlProps {
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
    style?: CSSProperties;
}
export interface ControlLabelProps {
    badge?: string | React.ComponentType<any>;
    className?: string;
}
export declare const Context: React.Context<Pick<ControlProps, "scale" | "error">>;
export interface ControlComponent extends FC<ControlProps> {
    Label: FC<ControlLabelProps>;
    Message: FC<{
        className?: string;
    }>;
    Error: FC<{
        className?: string;
    }>;
}
export declare const Control: ControlComponent;
