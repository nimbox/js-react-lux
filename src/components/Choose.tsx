import classnames from 'classnames';
import _ from 'lodash';
import _debounce from 'lodash/debounce';
import React, { LegacyRef, ReactElement, Ref, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Loading } from '..';
import { DangerIcon } from '../icons';
import { useOutsideClick } from './../hooks/useOutsideClick';
import AngleDownIcon from './../icons/AngleDownIcon';
import { ComponentScale, controlText, smallScale } from './ComponentScale';
import { Context as controlContext } from './controls/Control';
import { SearchInput } from './controls/SearchInput';



export interface ChooseProps<T> extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

    scale?: ComponentScale;

    recentValues?: string[];

    items?: T[];
    loading?: boolean;
    error?: any;

    getItem?: (value: string) => T;
    searchItems?: (q: string) => T[] | Promise<T[]>;

    itemValue: (item: T) => string;
    itemMatch: (q: string, item: T) => boolean;
    renderItem: (item: T) => React.ReactNode;

    creatable?: boolean;
    onCreate?: (q: string) => T | Promise<T>;
    renderCreateItem?: (value: string) => React.ReactNode;

    inline?: boolean;

    className?: string;

}

type ForwardRefFn<R> = <P = {}>(p: P & React.RefAttributes<R>) => ReactElement | null;

export const ChooseFn = <T extends {}>({ scale = 'base', recentValues, items, loading, error, getItem, searchItems, itemValue, itemMatch, renderItem, creatable = false, onCreate, renderCreateItem, inline, className, ...props }: ChooseProps<T>, ref: Ref<HTMLInputElement>) => {

    const inputRef = useRef<HTMLInputElement>();
    useImperativeHandle(ref, () => inputRef.current!);

    const [search, setSearch] = useState('');
    const [value, setValue] = useState('');

    const context = useContext(controlContext);
    const [visible, setVisible] = useState(false);
    const [targetRef, popperRef] = useOutsideClick<HTMLDivElement, HTMLDivElement>(() => { if (internalError) { reset(); }; setVisible(!visible) });

    const [internalLoading, setInternalLoading] = useState(loading || false);
    const [internalError, setInternalError] = useState(error || false);

    const [searchResults, setSearchResults] = useState<T[]>([]);
    const [searchRecents, setSearchRecents] = useState<string[]>(recentValues!);

    const searchRef = useRef<HTMLInputElement>();

    const [cursor, setCursor] = useState(0);
    
    const listRecentsRefs = searchRecents.reduce((acc: React.RefObject<HTMLInputElement | undefined>[], current, index) => {
        acc[index] = React.createRef<HTMLInputElement>();
        return acc;
    }, []);

    const listSearchRefs = searchResults.reduce((acc: React.RefObject<HTMLInputElement | undefined>[], current, index) => {
        acc[index] = React.createRef<HTMLInputElement>();
        return acc;
    }, []);

    useEffect(() => { setValue(inputRef?.current?.value as string); }, [inputRef?.current?.value]);

    useEffect(() => { if (visible) { searchRef.current!.focus(); } }, [visible]);

    useEffect(() => { setInternalLoading(loading || false); }, [loading]);

    useEffect(() => { setInternalError(error); }, [error]);

    const reset = () => {
        setInternalError(false);
        setVisible(false);
        setSearchResults([]);
        setSearchRecents(recentValues!);
        setCursor(0);
        setSearch('');
    }

    const findItem = (value: string) => {
        if (items) {
            return _.find(items, (item) => itemValue(item) == value);
        } else {
            if (getItem) {
                return getItem(value);
            }
        }
    };

    const doRenderItem = (value: string) => {
        if (value == null) { return null; }
        const item = findItem(value);
        if (item == null) { return null; }
        return renderItem(item);
    };

    function setRefValue(event: React.MouseEvent<HTMLElement, MouseEvent>, element: React.MutableRefObject<HTMLInputElement | undefined>, value: string) {
        event.preventDefault();
        event.stopPropagation();
        const inputSetter = Object?.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (inputSetter) {
            inputSetter.call(element.current, value);
            var inputEvent = new Event('input', { bubbles: true });
            element.current!.dispatchEvent(inputEvent);

        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
        const recentsLength = searchRecents.length;
        const searchLength = searchResults.length;
        event.stopPropagation();

        if (event.key === 'ArrowUp' && cursor > 0) {
            if (cursor != -1) {
                if (cursor < recentsLength) {
                    listRecentsRefs[cursor].current?.scrollIntoView({ block: "end", behavior: "smooth" });
                } else {
                    listSearchRefs[cursor - searchRecents.length].current?.scrollIntoView({ block: "end", behavior: "smooth" });
                }
            }
            setCursor(cursor - 1);

        } else if (event.key === 'ArrowDown' && cursor < (searchLength + recentsLength) - 1) {
            if (cursor != -1) {
                if (cursor < recentsLength) {
                    listRecentsRefs[cursor].current?.scrollIntoView({ behavior: "smooth" });
                } else {
                    listSearchRefs[cursor - recentsLength].current?.scrollIntoView({ behavior: "smooth" });
                }
            }
            setCursor(cursor + 1);

        } else if (event.key === 'Enter') {
            if (cursor >= 0 && visible) {
                if (cursor < recentsLength) {
                    handleClick(event as unknown as React.MouseEvent<HTMLElement>, searchRecents[cursor]);
                } else {
                    handleClick(event as unknown as React.MouseEvent<HTMLElement>, itemValue(searchResults[cursor - recentsLength]))
                }
                setCursor(0);
            }
            if (!visible) { setVisible(true); }

        } else if (event.key === 'Tab') {
            if (cursor != -1 && visible) {
                if (cursor < recentsLength) {
                    handleClick(event as unknown as React.MouseEvent<HTMLElement>, searchRecents[cursor]);
                } else {
                    handleClick(event as unknown as React.MouseEvent<HTMLElement>, itemValue(searchResults[cursor - recentsLength]));
                }
                setCursor(0);
            }
            if (cursor == -1) { setVisible(false); }
        }
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
        if (popperRef.current && !popperRef.current!.contains(event.target as Node)) {
            if (targetRef.current && !targetRef.current!.contains(event.target as Node)) {
                setVisible(false);
            }
        }
    }

    const doSearch = useCallback(_debounce(async (q: string) => {
        try {
            if (recentValues) {
                const recentsResults = recentValues.filter(value => {
                    const item = findItem(value);
                    if (item) {
                        return itemMatch(q, item);
                    }
                });
                setSearchRecents(recentsResults);
            }
            if (items) {
                setInternalLoading(true);
                const results = await Promise.resolve(() => {
                    if (q != '') {
                        setCursor(-1);
                        let results = items.filter(item =>
                            itemMatch(q, item) && !recentValues?.some(el => el === itemValue(item)) && itemValue(item) != value
                        );
                        return results;
                    } else {
                        setSearchRecents(recentValues!);
                        setCursor(0);
                        return [];
                    }
                });
                setSearchResults(results);
                setInternalLoading(false);
            } else if (searchItems) {
                const results = await Promise.resolve(searchItems(q));
                setSearchResults(results.filter(item => itemValue(item) != value));
            }
        } catch (error) {
            setInternalError(true);
        }
    }, 200), [items, value]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        doSearch(e.target.value);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
        if (event && inputRef && value) {
            setRefValue(event, inputRef, value);
            reset();
        }
    }

    const handleCreate = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, q: string) => {
        if (onCreate) {
            setInternalLoading(true);
            await Promise.resolve(onCreate(q))
                .then(result => {
                    handleClick(event, itemValue(result));
                    setInternalLoading(false);
                })
                .catch(() => setInternalError(true));
        }
    }

    return (
        <div className={classnames('relative inline-block',
            inline ? 'max-w-full' : 'w-full',
            controlText[scale || context.scale || 'base']
        )}
        >
            <div ref={targetRef}
                tabIndex={visible ? -1 : 0}
                onFocus={() => setVisible(true)}
                onMouseDown={(e) => { e.preventDefault(); setVisible(!visible) }}
                onBlur={handleBlur}
                className={classnames(
                    'relative rounded',
                    inline || 'border border-control-border',
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:outline-none'
                )}
                style={{ padding: '0.5em 2.75em 0.5em 0.75em' }}
            >

                {doRenderItem(value) || <span>&nbsp;Placeholder</span>}

                <div className="absolute inset-y-0 right-0 flex flex-row justify-center items-center cursor-pointer" style={{ width: '2em' }}>
                    {internalLoading &&
                        <Loading />}
                    {internalError &&
                        < DangerIcon className="text-red-500 stroke-current stroke-2" />}
                    {!internalLoading && !internalError &&
                        <AngleDownIcon width="1em" height="1em" className="inline text-control-border stroke-current stroke-2" />
                    }
                </div>

            </div>
            {visible &&
                <div ref={popperRef}
                    className={classnames(
                        'absolute w-full max-h-72 overflow-auto border border-control-border rounded',
                        'mt-2 space-y-2',
                        'bg-white',
                        'rounded border border-control-border',
                        inline && 'w-max',
                    )}
                    style={{ padding: '0.5em 0.75em 0.5em 0.75em' }}
                >

                    <SearchInput ref={searchRef as any}
                        scale={smallScale[scale || context.scale || 'base']}
                        value={search}
                        onChange={handleSearch}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        disabled={internalError}
                    />

                    <div className="divide-y-2 divide-dashed divide-opacity-30 divide-primary-500">
                        {(searchRecents.length > 0) &&
                            <ul className="space-y-1">
                                {searchRecents.map((value, i) => (
                                    <li ref={listRecentsRefs[i] as unknown as LegacyRef<HTMLLIElement> | undefined}
                                        key={value}
                                        onClick={!internalError ? (e) => handleClick(e, value) : undefined}
                                        className={classnames(
                                            'cursor-pointer',
                                            cursor === i && 'bg-primary-400'
                                        )}
                                    >
                                        {doRenderItem(value)}
                                    </li>
                                ))}
                            </ul>}

                        {(searchResults.length > 0) &&
                            <ul className="space-y-1">
                                {searchResults.map((item, i) => (
                                    <li ref={listSearchRefs[i] as unknown as LegacyRef<HTMLLIElement> | undefined}
                                        key={itemValue(item)}
                                        onClick={!internalError ? (e) => handleClick(e, itemValue(item)) : undefined}
                                        className={classnames(
                                            'cursor-pointer',
                                            cursor === i + searchRecents!.length && 'bg-primary-400'
                                        )}
                                    >
                                        {renderItem(item)}
                                    </li>
                                ))}
                            </ul>
                        }

                        {search && searchResults.length === 0 && renderCreateItem &&
                            <div onClick={!internalError ? (e) => handleCreate(e, search) : undefined}>{renderCreateItem(search)}</div>
                        }
                    </div>
                </div>
            }
            <input className="hidden" type="text" ref={inputRef as LegacyRef<HTMLInputElement> | undefined}  {...props} />
        </div>

    );

};

/**
 * Descripción
 * 
 * Seleccionar y Cerrar
 *   - Enter
 *   - Tab && custor != null
 *   - Click
 * Cerrar
 *   - Tab && cusrsor == null
 *   - onClickOutside
 * 
 *
 */
export const Choose = React.forwardRef(ChooseFn) as ForwardRefFn<HTMLInputElement>;
