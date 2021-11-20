import classnames from 'classnames';
import _debounce from 'lodash/debounce';
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { WarningIcon } from '../../icons';
import AngleDownIcon from '../../icons/AngleDownIcon';
import { consumeEvent } from '../../utilities/consumeEvent';
import { SearchableChooseOption, SearchableChooseOptionProps } from '../choose/SearchableChooseOption';
import { SearchInput } from '../controls/SearchInput';
import { Wrapper, WrapperProps } from '../controls/Wrapper';
import { Delay } from '../Delay';
import { Loading } from '../Loading';
import { Popper, PopperProps } from '../Popper';


//
// TagPicker
//

export interface TagPickerProps<T> extends WrapperProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'>,
    Pick<SearchableChooseOptionProps<T[], T>, 'withSearch' | 'getOptions' | 'renderGroupLabel' | 'renderOption' | 'renderFooter'> {

    tags: T[];
    tagValue: (item: T) => string;
    renderTag: (item: T, onRemove?: () => void) => React.ReactNode;

    onAdd: (item: T) => void | Promise<void>;
    onRemove: (item: T) => void | Promise<void>;
    onSearch: (q: string) => T[] | Promise<T[]>;

    CreateComponent?: React.FC<{ search: string; disabled: boolean; onSubmit: (submitting: void | Promise<void>) => void }>

    // styling

    /**
     * 
     */
    placeholder?: string;

    /**
     * 
     */
    className?: string;

    /**
     * Classes to pass to the ChooseOption container.
     */
    containerClassName?: string;

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
 */
// export const TagPicker = <T extends {}>(props: TagPickerProps<T>) => {


//     const {

//         variant,
//         withNoFull,

//         tags,
//         tagValue,
//         renderTag,

//         placement = 'bottom-start',
//         withArrow = false,
//         withSameWidth = false,

//         onAdd,
//         onRemove,

//         onSearch,
//         CreateComponent,

//         start,
//         end,

//         error,
//         disabled,

//         placeholder,
//         className,

//         containerClassName


//     } = props;

//     // configuration

//     const chooseOptionRef = useRef<HTMLInputElement & { handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void }>(null);

//     // popper show and hide

//     const [show, setShow] = useState(false);
//     const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
//     const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);
//     useOnOutsideClick(show, () => { if (show) { setShow(false); } }, wrapperRef, popperRef);

//     const handleShow = () => {
//         if (!show) {
//             setShow(true);
//         }
//     };
//     const handleHide = () => {
//         setShow(false);
//         wrapperRef?.focus();
//     };

//     // handle keyboard and mouse

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

//         switch (e.key) {

//             case 'Escape':
//                 handleHide();
//                 break;

//             case 'ArrowUp':
//             case 'ArrowDown':
//                 handleShow();
//                 break;

//         }

//         if (show) {
//             chooseOptionRef.current!.handleKeyDown(e);
//         }

//     }

//     const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
//         if (document.activeElement != null && document.activeElement === wrapperRef) {
//             e.preventDefault();
//             handleShow();
//         }
//     };

//     // handle focus

//     const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
//         handleShow();
//     };

//     const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//         handleHide();
//     };


//     // render

//     return (
//         <>

//             <Wrapper

//                 ref={setWrapperRef}
//                 tabIndex={0}

//                 variant={variant}
//                 withNoFull={withNoFull}

//                 onKeyDown={handleKeyDown}
//                 onMouseDown={handleMouseDown}

//                 onFocus={handleFocus}
//                 onBlur={handleBlur}

//                 disabled={disabled}
//                 error={error}

//                 start={start}
//                 end={
//                     <>
//                         {end}
//                         {loading && <Delay><Loading colorClassName="text-control-border" /></Delay>}
//                         {loadingError ? <WarningIcon className="text-danger-500 stroke-2" /> : <AngleDownIcon className="text-control-border stroke-2" />}
//                     </>
//                 }

//                 className="cursor-pointer"

//             >

//                 {(!tags || tags.length === 0) ?
//                     <div>{placeholder ?? <>&nbsp;</>}</div>
//                     :
//                     <div onMouseDown={e => show && consumeEvent(e)} className={classnames(className)}>
//                         {tags.map(tag => renderTag({ tag, onRemove: () => console.log('remove') })) }
//                     </div>
//                 }

//             </Wrapper>

//             {show &&
//                 <Popper
//                     ref={setPopperRef}
//                     reference={wrapperRef!}
//                     placement={placement}
//                     withArrow={withArrow}
//                     withSameWidth={withSameWidth}
//                     className="bg-control-bg"
//                 >

//                     <ChooseOption

//                         ref={chooseOptionRef}

//                         withSearch={withSearch}

//                         onBlur={handleHide}

//                         onHide={handleHide}
//                         onChoose={handleChoose}

//                         options={options}
//                         getOptions={getOptions}

//                         renderGroupLabel={renderGroupLabel}
//                         renderOption={renderOption}
//                         renderFooter={renderFooter}

//                         containerClassName={classnames('border border-control-border rounded', containerClassName)}

//                     />

//                 </Popper>
//             }

//         </>
//     );

// };











export const TagPicker = <T extends {}>({ tags, tagValue, renderTag, onAdd, onRemove, onSearch, CreateComponent }: TagPickerProps<T>) => {

    // const context = useContext(controlContext);

    const [isVisible, setIsVisible] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isError, setIsError] = useState(false);

    const searchRef = useRef<HTMLInputElement>();

    const [target, setTarget] = useState<HTMLDivElement | null>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(isVisible, () => { if (isVisible) { setIsVisible(false); } }, target, popper);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<T[]>([]);

    useEffect(() => { if (isVisible) { searchRef.current!.focus(); } }, [isVisible]);

    // 

    const show = () => {
        if (!isVisible) {
            setIsVisible(true);
            setSearch('');
            setSearchResults([]);
        }
    };

    const clean = () => {
        setSearch('');
        setSearchResults([]);
        setIsUpdating(false);
        searchRef.current!.focus();
    };

    // collection methods

    const handleAdd = async (tag: T) => {
        setIsUpdating(true);
        await onAdd(tag);
        clean();
    }

    const handleRemove = async (item: T) => {
        setIsUpdating(true);
        await onRemove(item);
        setIsUpdating(false);
    }

    // search methods

    const doSearch = _debounce(async (q: string) => {
        setIsUpdating(true);
        try {
            const results = await Promise.resolve(onSearch(q));
            const tagValues = new Set(tags.map(tagValue));
            setSearchResults(results.filter(tag => !tagValues.has(tagValue(tag))));
        } catch (error) {
            setIsError(true);
        } finally {
            setIsUpdating(false);
        }
    }, 200);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        doSearch(e.target.value);
    };

    const handleSubmit = async (create: void | Promise<void>) => {
        setIsUpdating(true);
        await Promise.resolve(create);
        clean();
    }

    // render

    return (
        <div className={classnames('relative w-full', { 'text-danger': isError })}>

            <div ref={setTarget as LegacyRef<HTMLDivElement> | undefined}
                tabIndex={isVisible ? -1 : 0}
                onClick={show}
                onFocus={show}
                className={classnames(
                    'relative w-full lux-tag-space',
                    'rounded border border-control-border',
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:outline-none'
                )}
                style={{ padding: '0.5em 2.75em 0.5em 0.75em' }}
            >

                {(tags.length > 0) ?
                    tags.map((tag) =>
                        <React.Fragment key={tagValue(tag)}>
                            {renderTag(tag, (isVisible ? () => handleRemove(tag) : undefined))}
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
                <div ref={setPopper as LegacyRef<HTMLDivElement> | undefined}
                    className={classnames(
                        'absolute w-full max-h-72 overflow-auto',
                        'mt-2 space-y-2',
                        'bg-white',
                        'rounded border border-control-border'
                    )}
                    style={{ padding: '0.5em 0.75em 0.5em 0.75em' }}
                >

                    <SearchInput ref={searchRef as any}
                        value={search} onChange={handleSearch}
                    />

                    {(searchResults.length > 0) &&
                        <ul className="space-y-1">
                            {searchResults.map((tag) =>
                                <li key={tagValue(tag)} onClick={() => handleAdd(tag)} className="cursor-pointer" >
                                    {renderTag(tag)}
                                </li>
                            )}
                        </ul>
                    }

                    {(search && searchResults.length === 0 && CreateComponent) &&
                        <CreateComponent search={search} disabled={isUpdating} onSubmit={handleSubmit} />
                    }

                </div>
            }

        </div>
    );

};