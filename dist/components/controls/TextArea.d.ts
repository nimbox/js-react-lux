import React, { FC } from 'react';
import { ComponentScale } from '../ComponentSize';
export interface Props {
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
}
export declare const TextArea: FC<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & Props>;
