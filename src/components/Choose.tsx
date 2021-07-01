import classnames from 'classnames';
import _debounce from 'lodash/debounce';
import React, { ChangeEventHandler, createRef, LegacyRef, ReactElement, Ref, RefObject, useCallback, useContext, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { Loading } from '..';
import { DangerIcon } from '../icons';
import { useOnOutsideClick } from '../hooks/useOnOutsideClick';
import AngleDownIcon from './../icons/AngleDownIcon';
import { ComponentScale, controlText, smallScale } from './ComponentScale';
import { Context as controlContext } from './controls/Control';
import { SearchInput } from './controls/SearchInput';


export interface ChooseProps<T> extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

    defaultValue?: string;
    value?: string;
    recentValues?: string[];
    onChange?: ChangeEventHandler<HTMLInputElement>;

    items?: T[];
    loading?: boolean;
    error?: boolean;

    getItem: (value: string) => T;
    searchItems?: (q: string) => T[] | Promise<T[]>;

    itemValue: (item: T) => string;
    itemMatch: (q: string, item: T) => boolean;
    renderItem: (item: T) => React.ReactNode;

    CreateComponent?: React.FC<{ search: string; disabled: boolean; onSubmit: (submitting: void | Promise<void>) => void }>

    scale?: ComponentScale;
    inline?: boolean;
    className?: string;

}

type ForwardRefFn<R> = <P = {}>(p: P & React.RefAttributes<R>) => ReactElement | null;

export const ChooseFn = <T extends {}>({ scale = 'base', recentValues, items, loading, error, getItem, searchItems, itemValue, itemMatch, renderItem, CreateComponent, inline, className, ...props }: ChooseProps<T>, ref: Ref<HTMLInputElement>) => {

    const inputRef = useRef<HTMLInputElement>();
    useImperativeHandle(ref, () => inputRef.current!);

    const [search, setSearch] = useState('');
    const [internalValue, setInternalValue] = useState('');

    const context = useContext(controlContext);

    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(false);
    useLayoutEffect(() => { setActive(visible); }, [visible]);

    const target = useRef<HTMLDivElement>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(() => { if (internalError) { reset(); } if (visible) { setVisible(false); } }, visible, target.current, popper);

    const [internalLoading, setInternalLoading] = useState(loading || false);
    const [internalError, setInternalError] = useState(error || false);

    const [searchResults, setSearchResults] = useState<T[]>([]);
    const [searchRecents, setSearchRecents] = useState<string[]>(recentValues!);

    const searchRef = useRef<HTMLInputElement>();

    const [cursor, setCursor] = useState<number | null>(null);

    const searchRecentsLength = searchRecents.length;
    const [listRecentsRefs, setlistRecentsRefs] = React.useState<RefObject<HTMLLIElement>[]>([]);

    const searchResultsLength = searchResults.length;
    const [listResultsRefs, setlistResultsRefs] = React.useState<RefObject<HTMLLIElement>[]>([]);

    useEffect(() => {
        setlistRecentsRefs(
            Array(searchRecentsLength).fill(createRef(), 0, searchRecentsLength).map((_, i) => listRecentsRefs[i] || createRef())
        );
    }, [searchRecentsLength]);

    useEffect(() => {
        setlistResultsRefs(
            Array(searchResultsLength).fill(createRef(), 0, searchResultsLength).map((_, i) => listResultsRefs[i] || createRef())
        );
    }, [searchResultsLength]);

    useEffect(() => { setInternalValue(inputRef?.current?.value as string); }, [inputRef?.current?.value]);

    useEffect(() => { if (visible) { searchRef.current!.focus(); } }, [visible]);

    useEffect(() => { setInternalLoading(loading!); }, [loading]);

    useEffect(() => { setInternalError(error!); }, [error]);

    const reset = () => {
        setVisible(false);
        setSearch('');
        setSearchRecents(recentValues!);
        setSearchResults([]);
        setCursor(null);
        setInternalError(false);
    }

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
        
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                if (cursor!=null && cursor > 0) {
                    if (cursor < recentsLength) {
                        listRecentsRefs[cursor].current?.scrollIntoView({ block: "end", behavior: "smooth" });
                    } else {
                        listResultsRefs[cursor - searchRecents.length].current?.scrollIntoView({ block: "end", behavior: "smooth" });
                    }
                    setCursor(cursor - 1);
                }
                break;

            case 'ArrowDown':
                event.preventDefault();
                if (cursor!=null && cursor < (searchLength + recentsLength) - 1) {
                    if (cursor >= 0) {
                        if (cursor < recentsLength) {
                            listRecentsRefs[cursor].current?.scrollIntoView({ behavior: "smooth" });
                        } else {
                            listResultsRefs[cursor - recentsLength].current?.scrollIntoView({ behavior: "smooth" });
                        }
                    }
                    setCursor(cursor + 1);
                }
                else if (cursor===null) {setCursor(0);}
                break;

            case 'Enter':
                if (cursor!=null && visible) {
                    if (cursor < recentsLength) {
                        handleClick(event as unknown as React.MouseEvent<HTMLElement>, searchRecents[cursor]);
                    } else {
                        handleClick(event as unknown as React.MouseEvent<HTMLElement>, itemValue(searchResults[cursor - recentsLength]))
                    }
                }
                if (!visible) { setVisible(true); }
                break;

            case 'Tab' || ('Tab' && event.shiftKey):
                if (cursor!=null && visible) {
                    if (cursor < recentsLength) {
                        handleClick(event as unknown as React.MouseEvent<HTMLElement>, searchRecents[cursor]);
                    } else {
                        handleClick(event as unknown as React.MouseEvent<HTMLElement>, itemValue(searchResults[cursor - recentsLength]));
                    }
                }
                if (cursor===null) { setVisible(false); }
                break;

        }
    }

    const doSearch = useCallback(_debounce(async (q: string) => {
        try {
            setCursor(null);
            if (items) {
                if (!internalLoading) {
                    const results = await Promise.resolve(() => {
                        if (q != '') {
                            let results = items.filter(item =>
                                itemMatch(q, item) && !recentValues?.some(el => el === itemValue(item)) && itemValue(item) != internalValue
                            );
                            return results;
                        } else {
                            return [];
                        }
                    });
                    setSearchResults(results);
                }
            } else if (searchItems) {
                setInternalLoading(true);
                try {
                    const results = await Promise.resolve(searchItems(q));
                    setSearchResults(results.filter(item => itemValue(item) != internalValue));
                } catch {
                    setInternalError(true);
                } finally {
                    setInternalLoading(false);
                }
            }
        } catch {
            setInternalError(true);
        }
    }, 200), [items, internalValue, internalLoading]);

    const limitRecents = _debounce((q: string) => {
        if (recentValues) {
            const recentsResults = recentValues.filter(value => {
                const item = getItem(value);
                if (item) {
                    return itemMatch(q, item) && itemValue(item) != internalValue;
                }
            });
            setSearchRecents(recentsResults);
        }
        if (q === '') {
            setSearchRecents(recentValues!);
        }
    }, 200);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        doSearch(e.target.value);
        limitRecents(e.target.value);
        setCursor(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
        if (event && inputRef && value) {
            setRefValue(event, inputRef, value);
            reset();
        }
    };

    const handleSubmit = async (create: void | Promise<void>) => {
        setInternalLoading(true);
        try {
            await Promise.resolve(create);
        } catch (e) {
            setInternalError(true);
        } finally {
            setInternalLoading(false);
            reset();
        }
    };

    return (
        <div className={classnames('relative inline-block',
            inline ? 'max-w-full' : 'w-full',
            controlText[scale || context.scale || 'base']
        )}
        >
            <div ref={target}
                tabIndex={active ? -1 : 0}
                onFocus={() => { if (!visible) setVisible(true); }}
                onMouseDown={(e) => { e.preventDefault(); setVisible(!visible) }}
                className={classnames(
                    'relative rounded',
                    inline || 'border border-control-border',
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:outline-none'
                )}
                style={inline ? { paddingRight: '1.25em' } : { padding: '0.5em 2em 0.5em 0.75em' }}
            >

                {(!internalLoading && internalValue && renderItem(getItem(internalValue))) || <span>&nbsp;Placeholder</span>}

                <div className="absolute inset-y-0 right-0 flex flex-row justify-center items-center cursor-pointer"
                    style={{ width: '1em', marginRight: inline ? '0' : '0.5em' }}>

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
                <div ref={setPopper}
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
                        disabled={internalError}
                    />

                    <div className="space-y-1">

                        {(searchRecents.length > 0) &&
                            <ul className="space-y-1 p-0">
                                {searchRecents.map((value, i) => (
                                    <li ref={listRecentsRefs[i] as LegacyRef<HTMLLIElement> | undefined}
                                        key={value}
                                        onClick={!internalError ? (e) => handleClick(e, value) : undefined}
                                        className={classnames(
                                            'cursor-pointer -ml-3 -mr-3 pl-3 pr-3',
                                            'hover:text-white hover:bg-secondary-500',
                                            cursor === i && 'bg-primary-500'
                                        )}
                                    >
                                        {renderItem(getItem(value))}
                                    </li>
                                ))}
                            </ul>
                        }

                        {(searchResults.length > 0) &&
                            <>
                                <div className="h-px bg-control-border" style={{ marginLeft: '-0.75em', marginRight: '-0.75em' }} />
                                <ul className="space-y-1 p-0">
                                    {searchResults.map((item, i) => (
                                        <li ref={listResultsRefs[i] as LegacyRef<HTMLLIElement> | undefined}
                                            key={itemValue(item)}
                                            onClick={!internalError ? (e) => handleClick(e, itemValue(item)) : undefined}
                                            className={classnames(
                                                'cursor-pointer -ml-3 -mr-3 pl-3 pr-3',
                                                'hover:text-white hover:bg-secondary-500',
                                                cursor === i + searchRecents!.length && 'bg-primary-500'
                                            )}
                                        >
                                            {renderItem(item)}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        }

                        {(search && searchResults.length === 0 && searchRecents.length === 0 && CreateComponent) &&
                            <CreateComponent search={search} disabled={loading!} onSubmit={handleSubmit} />
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
 *   - Tab && custor != -1
 *   - Click
 * Cerrar
 *   - Tab && cursor == -1
 *   - onClickOutside
 * 
 *
 */
export const Choose = React.forwardRef(ChooseFn) as ForwardRefFn<HTMLInputElement>;
