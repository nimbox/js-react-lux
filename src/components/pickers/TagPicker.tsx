import classnames from 'classnames';
import _debounce from 'lodash/debounce';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import AngleDownIcon from '../../icons/AngleDownIcon';
import { Button } from '../Buttons';
import { ComponentScale, controlText, smallScale } from '../ComponentScale';
import { Context as controlContext } from '../controls/Control';
import { SearchInput } from '../controls/SearchInput';
import { Loading } from '../Loading';


//
// TagPicker
//

export interface TagPickerProps<T> {

    scale?: ComponentScale;

    tags: T[];
    tagValue: (item: T) => string;
    renderTag: (item: T, onRemove?: (e: React.UIEvent<HTMLElement>) => void) => React.ReactNode;

    onAdd: (item: T) => void | Promise<void>;
    onRemove: (item: T) => void | Promise<void>;

    onSearch: (q: string) => T[] | Promise<T[]>;
    onCreate: (q: string) => void | Promise<void>;

    RenderCreate?: React.FC<{disabled: boolean, search : string; onCreate: (create: void | Promise<void>) => void}>

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
 * @param param0 
 * @returns 
 */
export const TagPicker = <T extends {}>({ scale = 'base', tags, tagValue, renderTag: render, onRemove, onSearch, onAdd, onCreate, RenderCreate }: TagPickerProps<T>) => {

    const context = useContext(controlContext);

    const [isVisible, setIsVisible] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [targetRef, popperRef] = useOutsideClick<HTMLDivElement, HTMLDivElement>(() => setIsVisible(!isVisible));
    const searchRef = useRef<HTMLInputElement>();

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<T[]>([]);

    useEffect(() => { if (isVisible) { searchRef.current!.focus(); } }, [isVisible]);

    // 

    const handleVisible = () => {
        if (!isVisible) {
            setIsVisible(true);
            setSearch('');
            setSearchResults([]);
        }
    }

    // collection methods

    const handleAdd = (tag: T) => {
        Promise.resolve(onAdd(tag)).then(() => {
            setSearch('');
            setSearchResults([]);
        });
    }

    const handleRemove = async (e: React.UIEvent<HTMLElement>, item: T) => {
        await onRemove(item);
    }

    // search methods

    const doSearch = _debounce((q: string) => {
        setIsUpdating(true);
        Promise.resolve(onSearch(q))
            .then(results => {
                setIsUpdating(false);
                const tagValues = new Set(tags.map(tagValue));
                setSearchResults(results.filter(tag => !tagValues.has(tagValue(tag))));
            })
            .catch(error => {
                setIsUpdating(false);
                console.log(error);
            });
    }, 200);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        doSearch(e.target.value);
    };

    const handleCreate = async (create: void | Promise<void>) => {

        console.log('handleCreate inside the component');

        setIsUpdating(true);
        await Promise.resolve(create);

        setSearch('');
        setSearchResults([]);
        setIsUpdating(false);
        searchRef.current!.focus();

    }

    // render

    return (
        <div className={classnames('relative w-full', controlText[scale || context.scale || 'base'])}>

            <div ref={targetRef}
                tabIndex={isVisible ? -1 : 0}
                onClick={handleVisible}
                onFocus={handleVisible}
                className={classnames(
                    'relative w-full lux-tag-space',
                    'rounded border border-control-border',
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:outline-none'
                )}
                style={{ padding: '0.5em 2.75em 0.5em 0.75em' }}
            >
                {tags.length > 0 ?
                    tags.map((t) =>
                        <React.Fragment key={tagValue(t)}>
                            {render(t, (isVisible ? (e: React.UIEvent<HTMLElement>) => handleRemove(e, t) : undefined))}
                        </React.Fragment>
                    ) :
                    <span>&nbsp;Placeholder</span>
                }
                <div className="absolute inset-y-0 right-0 flex flex-row justify-center items-center cursor-pointer" style={{ width: '2em' }}>
                    {isUpdating ?
                        <Loading /> :
                        <AngleDownIcon width="1em" height="1em" className="inline text-control-border stroke-current stroke-2" />
                    }
                </div>
            </div>

            {isVisible &&
                <div ref={popperRef}
                    className={classnames(
                        'absolute w-full max-h-72 overflow-auto',
                        'mt-2 space-y-2',
                        'bg-white',
                        'rounded border border-control-border'
                    )}
                    style={{ padding: '0.5em 0.75em 0.5em 0.75em' }}
                >
                    <SearchInput ref={searchRef as any}
                        scale={smallScale[scale]} 
                        disabled={isUpdating}
                        value={search} onChange={handleSearch}
                    />
                    {(searchResults.length > 0) &&
                        <ul className="space-y-1">
                            {searchResults.map((item) =>
                                <li className="cursor-pointer" onClick={(e: React.MouseEvent<HTMLElement>) => handleAdd(item)}>
                                    {render(item)}
                                </li>
                            )}
                        </ul>
                    }
                    {(search && searchResults.length === 0 && RenderCreate) &&
                        <RenderCreate disabled={isUpdating} search={search} onCreate={handleCreate}/>
                    }
                </div>
            }

        </div>
    );

};