import React, { CSSProperties, FC } from 'react';
import { ComponentScale } from '../ComponentSize';
export interface ControlProps {
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
    style?: CSSProperties;
}
export interface ControlLabelProps {
    badge?: string | JSX.Element;
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
