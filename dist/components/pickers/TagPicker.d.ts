import { FC } from 'react';
import { ComponentScale } from '../ComponentScale';
export interface TagPickerProps {
    scale: ComponentScale;
    values: any[];
    render: (t: any, onRemove?: (value: any) => void) => JSX.Element;
    onSearch: (value: string) => Promise<{
        t: any;
    }[]> | {
        t: any;
    }[];
    onRemove?: (value: any) => boolean | Promise<boolean>;
    onAdd: (value: any) => boolean | Promise<boolean>;
    onCreate: (value: any) => boolean | Promise<boolean>;
    className?: string;
}
export declare const TagPicker: FC<TagPickerProps>;
