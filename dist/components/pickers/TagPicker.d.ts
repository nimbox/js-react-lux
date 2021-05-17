import { FC } from 'react';
import { ComponentScale } from '../ComponentScale';
export interface TagPickerProps<T> {
    scale?: ComponentScale;
    values: T[];
    render: (item: T, onRemove?: (value: string | number) => void) => JSX.Element;
    onSearch: (q: string) => Promise<T[]> | T[] | [];
    onRemove?: (value: string | number) => boolean | Promise<boolean>;
    onAdd: (value: string | number) => boolean | Promise<boolean>;
    onCreate: (value: string | number) => boolean | Promise<boolean>;
    className?: string;
}
export declare const TagPicker: FC<TagPickerProps<{
    value: string | number;
    name: string;
    color?: string;
    className?: string;
}>>;
