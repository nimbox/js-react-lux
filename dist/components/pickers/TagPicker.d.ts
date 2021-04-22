import { FC } from 'react';
import { ComponentScale } from '../ComponentSize';
export interface TagPickerProps {
    scale: ComponentScale;
    values: {
        key: String | number;
        value: String;
    }[];
    className?: string;
    onDelete?: (value: any) => void;
    onSearch: (value: String) => {
        key: String | number;
        value: String;
    }[];
    onSelect: (value: any) => void;
    onCreate: (value: any) => void;
}
export declare const TagPicker: FC<TagPickerProps>;
