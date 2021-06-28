import classnames from 'classnames';
import _debounce from 'lodash/debounce';
import React, { ChangeEventHandler, createRef, LegacyRef, ReactElement, Ref, RefObject, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Loading } from '..';
import { DangerIcon } from '../icons';
import { useOnOutsideClick } from './../hooks/useOutsideClick';
import AngleDownIcon from './../icons/AngleDownIcon';
import { ComponentScale, controlText, smallScale } from './ComponentScale';
import { Context as controlContext } from './controls/Control';
import { SearchInput } from './controls/SearchInput';



/*
const { data, loading, error } = useQuery(GET_TIMEZONES);
return (
    <ChooseProps items={[data?.zones]} loading={loading} error={error}/>
);
*/

/*
<ChooseProps getItem={get} searchItems={search}/>

    setInternalLoading(true);
    try {
        setResult(await Promise.resolve(get));
    } catch (e) {
        setInternalError(e);
    } finally {
        setInternalLoading(false);
    }

*/

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

    const [target, setTarget] = useState<HTMLDivElement | null>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(() => { if (internalError) { reset(); } if (visible) { setVisible(!visible); } }, target, popper);

    const [internalLoading, setInternalLoading] = useState(loading || false);
    const [internalError, setInternalError] = useState(error || false);

    const [searchResults, setSearchResults] = useState<T[]>([]);
    const [searchRecents, setSearchRecents] = useState<string[]>(recentValues!);

    const searchRef = useRef<HTMLInputElement>();

    const [cursor, setCursor] = useState(-1);

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
        setCursor(-1);
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

        // event.stopPropagation();

        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                if (cursor > 0) {
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
                if (cursor < (searchLength + recentsLength) - 1) {
                    if (cursor != -1) {
                        if (cursor < recentsLength) {
                            listRecentsRefs[cursor].current?.scrollIntoView({ behavior: "smooth" });
                        } else {
                            listResultsRefs[cursor - recentsLength].current?.scrollIntoView({ behavior: "smooth" });
                        }
                    }
                    setCursor(cursor + 1);
                }
                break;

            case 'Enter':
                if (cursor >= 0 && visible) {
                    if (cursor < recentsLength) {
                        handleClick(event as unknown as React.MouseEvent<HTMLElement>, searchRecents[cursor]);
                    } else {
                        handleClick(event as unknown as React.MouseEvent<HTMLElement>, itemValue(searchResults[cursor - recentsLength]))
                    }
                }
                if (!visible) { setVisible(true); }
                break;

            case 'Tab' || ('Tab' && event.shiftKey):
                if (cursor != -1 && visible) {
                    if (cursor < recentsLength) {
                        handleClick(event as unknown as React.MouseEvent<HTMLElement>, searchRecents[cursor]);
                        // var keyEvent = new KeyboardEvent('keydown', { key: 'Tab' });
                        // searchRef.current!.dispatchEvent(keyEvent);
                    } else {
                        handleClick(event as unknown as React.MouseEvent<HTMLElement>, itemValue(searchResults[cursor - recentsLength]));
                    }
                }
                if (cursor === -1) { setVisible(false); }
                // searchRef.current!.blur();
                break;

        }
    }

    const doSearch = useCallback(_debounce(async (q: string) => {
        try {
            if (items) {
                setInternalLoading(true);
                setCursor(-1);
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
                setInternalLoading(false);
            } else if (searchItems) {
                const results = await Promise.resolve(searchItems(q));
                setSearchResults(results.filter(item => itemValue(item) != internalValue));
            }
        } catch (error) {
            setInternalError(true);
        }
    }, 200), [items, internalValue]);

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
    };

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
        if (event && inputRef && value) {
            setRefValue(event, inputRef, value);
            reset();
        }
    }

    const handleSubmit = async (create: void | Promise<void>) => {
        setInternalLoading(true);
        try {
            await Promise.resolve(create);
        } catch (e) {
            setInternalError(true);
        } finally {}
            setInternalLoading(false);
            reset();
        }
    }

    console.log("render", visible);

    return (
        <div className={classnames('relative inline-block',
            inline ? 'max-w-full' : 'w-full',
            controlText[scale || context.scale || 'base']
        )}
        >
            <div ref={target as LegacyRef<HTMLDivElement> | undefined}
                tabIndex={visible ? -1 : 0}
                onFocus={() => setVisible(true)}
                onMouseDown={(e) => { e.preventDefault(); setVisible(!visible) }}
                className={classnames(
                    'relative rounded',
                    inline || 'border border-control-border',
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:outline-none'
                )}
                style={{ padding: '0.5em 2.75em 0.5em 0.75em' }}
            >

                {(internalValue && renderItem(getItem(internalValue))) || <span>&nbsp;Placeholder</span>}

                <div className={classnames(
                    'absolute inset-y-0 right-0 flex flex-row justify-center items-center cursor-pointer',
                    inline && 'mr-3'
                )}
                    style={{ width: '2em' }}>

                    {internalLoading &&
                        <Loading />}
                    {internalError &&
                        < DangerIcon className="text-red-500 stroke-current stroke-2" />}
                    {!internalLoading && !internalError &&
                        <AngleDownIcon width="1em" height="1em" className="inline text-control-border stroke-current stroke-2 " />
                    }
                </div>

            </div>
            {visible &&
                <div ref={popper as LegacyRef<HTMLDivElement> | undefined}
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

                    <div className="divide-y-2 divide-control-border">

                        {(searchRecents.length > 0) &&
                            <ul className="space-y-1">
                                {searchRecents.map((value, i) => (
                                    <li ref={listRecentsRefs[i] as LegacyRef<HTMLLIElement> | undefined}
                                        key={value}
                                        onClick={!internalError ? (e) => handleClick(e, value) : undefined}
                                        className={classnames(
                                            'cursor-pointer -ml-3 -mr-3 pl-3 pr-3',
                                            'hover:text-white hover:bg-secondary-500 ',
                                            cursor === i && 'bg-primary-500'
                                        )}
                                    >
                                        {renderItem(getItem(value))}
                                    </li>
                                ))}
                            </ul>
                        }

                        {(searchResults.length > 0) &&
                            <ul className="space-y-1">
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
 *   - Tab && custor != null
 *   - Click
 * Cerrar
 *   - Tab && cusrsor == null
 *   - onClickOutside
 * 
 *
 */
export const Choose = React.forwardRef(ChooseFn) as ForwardRefFn<HTMLInputElement>;
