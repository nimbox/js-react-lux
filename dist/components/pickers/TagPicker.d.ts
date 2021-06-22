import React from 'react';
import { ComponentScale } from '../ComponentScale';
export interface TagPickerProps<T> {
    scale?: ComponentScale;
    tags: T[];
    tagValue: (item: T) => string;
<<<<<<< HEAD
    renderTag: (item: T, onRemove?: () => void) => React.ReactNode;
    onAdd: (item: T) => void | Promise<void>;
    onRemove: (item: T) => void | Promise<void>;
    onSearch: (q: string) => T[] | Promise<T[]>;
    CreateComponent?: React.FC<{
        search: string;
        disabled: boolean;
        onSubmit: (submitting: void | Promise<void>) => void;
=======
    renderTag: (item: T, onRemove?: (e: React.UIEvent<HTMLElement>) => void) => React.ReactNode;
    onAdd: (item: T) => void | Promise<void>;
    onRemove: (item: T) => void | Promise<void>;
    onSearch: (q: string) => T[] | Promise<T[]>;
    onCreate: (q: string) => void | Promise<void>;
    RenderCreate?: React.FC<{
        disabled: boolean;
        search: string;
        onCreate: (create: void | Promise<void>) => void;
>>>>>>> c58fda098b3f0fe26e5347f12164aa03f5414809
    }>;
}
/**
 * TagPicker creates an input to choose from a searchable tag store of type `T`.
 * It takes an array of tags of type `T[]` as `values`, which is the current set
 * of tags, and fires `onAdd(tag: T)` and `onRemove(tag: T)` to update the
 * `values` array. Both `onAdd` and `onRemove` are treated as promises and while
 * they are being resolved the component is shown in a `loading` state.
 *
 * This components requires that its `values` are complete `T`'s and that the
 * store returns complete `T`'s. At least sufficient `T` so that `renderTag` can
 * actually render it.
 *
 * The tag store is accessed and managed via `onSearch(q: string)` and
 * `onCreate(q: string)`. The `onSearch` property should return `T[]` or
 * `Promise<T[]>` and inside the component is used as
 * `Promise.resolve(onSearch(q))`. If `onCreate` is provided then, whenever a
 * search for tags is being done and no results are provided form `onSearch`, a
 * button with the text `Create tag ${q}` will be shown. When the button is
 * pressed, `onCreate(q)` is fired and the store should include the newly
 * created tag and the `values` property should be updated (with the same logic
 * as `onAdd`). Both `onSearch` and `onCreate` are treated as promises and while
 * they are being resolved the component is shown in a `loading` state.
 *
<<<<<<< HEAD
 */
export declare const TagPicker: <T extends {}>({ scale, tags, tagValue, renderTag, onAdd, onRemove, onSearch, CreateComponent }: TagPickerProps<T>) => JSX.Element;
=======
 * @param param0
 * @returns
 */
export declare const TagPicker: <T extends {}>({ scale, tags, tagValue, renderTag: render, onRemove, onSearch, onAdd, onCreate, RenderCreate }: TagPickerProps<T>) => JSX.Element;
>>>>>>> c58fda098b3f0fe26e5347f12164aa03f5414809
