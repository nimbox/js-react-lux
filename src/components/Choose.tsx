import classnames from 'classnames';
import _ from 'lodash';
import React, { LegacyRef, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Loading } from '..';
import { useOutsideClick } from './../hooks/useOutsideClick';
import AngleDownIcon from './../icons/AngleDownIcon';
import { ComponentScale, controlIconSmallMarginSize, controlScale, smallScale } from './ComponentScale';
import { Context as controlContext } from './controls/Control';
import { Search } from './controls/IconInput';


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

export const Choose = React.forwardRef<HTMLInputElement, ChooseProps<T>>
    (({ scale = 'base', recentValues, items, loading, error, getItem, searchItems, itemValue, itemMatch, renderItem, creatable = false, onCreate, renderCreateItem, inline, className, ...props }, ref) => {

        const inputRef = useRef<HTMLInputElement>();
        useImperativeHandle(ref, () => inputRef.current!);

        const [search, setSearch] = useState("");
        const [value, setValue] = useState("");

        const context = useContext(controlContext);
        const [visible, setVisible] = useState(false);
        const [target, popper] = useOutsideClick(() => { setVisible(!visible) });

        const [loadingSearch, setLoading] = useState(loading || false);
        const [errorSearch, setError] = useState(error || false);

        const initial: T[] = [];
        const [searchResults, setSearchResults] = useState(initial);

        const [showButton, setShowButton] = useState(false);

        const [tab, setTab] = useState(false);
        const [cursor, setCursor] = useState(0);

        function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
            console.log("envent INPUT", cursor)
            if (event.key === "ArrowUp" && cursor > 0) {
                console.log("envent arrowUp", cursor)
                setCursor(cursor - 1)
            } else if (event.key === "ArrowDown" && cursor < (searchResults.length + recentValues!.length) - 1) {
                console.log("envent arrowDown", cursor)
                setCursor(cursor + 1)
            } else if (event.key === "Enter" && cursor >= 0 && visible) {
                if (cursor >= recentValues!.length) {
                    handleClick(event as unknown as React.MouseEvent<HTMLElement>, inputRef, itemValue(searchResults[cursor - recentValues!.length]))
                    setCursor(0)
                } else {
                    handleClick(event as unknown as React.MouseEvent<HTMLElement>, inputRef, recentValues![cursor])
                    setCursor(0)
                }
            } else if (event.key === "Enter" && !visible) {
                setVisible(true);
            }
        }

        function handleKeyDownSearch(event: React.KeyboardEvent<HTMLElement>) {
            console.log("envent SEARCH", cursor)
            if (event.key === "Tab") {
                setTab(true);
            } else if (event.key === "ArrowUp" && cursor > 0) {
                console.log("envent arrowUp", cursor)
                setCursor(cursor - 1)
            } else if (event.key === "ArrowDown" && cursor < (searchResults.length + recentValues!.length) - 1) {
                console.log("envent arrowDown", cursor)
                setCursor(cursor + 1)
            } else if (event.key === "Enter" && cursor > 0) {
                if (cursor >= recentValues!.length) {
                    handleClick(event as unknown as React.MouseEvent<HTMLElement>, inputRef, itemValue(searchResults[cursor - recentValues!.length]))
                    setCursor(0)
                } else {
                    handleClick(event as unknown as React.MouseEvent<HTMLElement>, inputRef, recentValues![cursor])
                    setCursor(0)
                }
            }
        }

        function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
            if (popper.current && !popper.current!.contains(event.target as Node)) {
                if (target.current && !target.current!.contains(event.target as Node)) {
                    setVisible(false);
                }
            }
            if (tab) {
                setTab(false);
                setVisible(false);
            }
        }

        useEffect(() => {
            setLoading(loading || false);
        }, [loading]);

        useEffect(() => {
            setError(error);
        }, [error]);

        useEffect(() => {
            setValue(inputRef?.current?.value as string);
        }, [inputRef?.current?.value]);

        const findItem = (value: string) => {
            if (items) {
                return _.find(items, (item) => itemValue(item) == value);
            } else {
                if (getItem)
                    return getItem(value);
            }
        };

        const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target) {
                setSearch(e.target.value);
                setShowButton(true);
                console.log(search);
                if (items) {
                    setLoading(true);
                    new Promise((resolve, reject) => {
                        if (e.target.value!="") {
                            let results = items.filter(item =>
                                itemMatch(e.target.value, item) && !recentValues?.some(el => el === itemValue(item)) && itemValue(item) != value
                            );
                            resolve(results);
                        } else { resolve([]); }
                        let error = new Error("Error searching items");
                        reject(error);
                    })
                        .then(results => { setSearchResults(results as T[]); setLoading(false) })
                        .catch(error => { setError(error); });
                } else {
                    if (searchItems)
                        Promise.resolve(searchItems(e.target.value))
                            .then(results => setSearchResults(results))
                            .catch(error => setError(errorSearch ? errorSearch + ', ' + error : error));
                }
            }
        }, [items, value]);

        function setRefValue(event: React.MouseEvent<HTMLElement, MouseEvent>, element: React.MutableRefObject<HTMLInputElement | undefined>, value: string) {
            event.preventDefault();
            const inputSetter = Object?.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            if (inputSetter) {
                inputSetter.call(element.current, value);
                var inputEvent = new Event('input', { bubbles: true });
                element.current!.dispatchEvent(inputEvent);

            }
        }

        const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, element: React.MutableRefObject<HTMLInputElement | undefined>, value: string) => {
            if (event && element && value) {
                setRefValue(event, element, value);
                setVisible(!visible);
                setSearchResults([]);
                setSearch("");
                setShowButton(false);
            }
        }

        const handleCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, element: React.MutableRefObject<HTMLInputElement | undefined>, value: string) => {
            if (onCreate) {
                Promise.resolve(onCreate(value))
                    .then(result => {
                        handleClick(event, element, itemValue(result));
                    })
                    .catch(error => setError(errorSearch ? errorSearch + ' ' + error : error))
            }
        }

        return (
            <div className={classnames('relative inline-block', inline ? 'max-w-full' : 'w-full')} >
                <div ref={target as LegacyRef<HTMLDivElement> | undefined} tabIndex={0} onFocus={() => setVisible(true)} onBlur={handleBlur} onKeyDown={handleKeyDown} className={classnames(
                    'relative rounded', inline || 'border border-control-border',
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:outline-none pl-1 pr-8',
                    controlScale[scale || context.scale || 'base'], 
                    visible && 'border-primary-500 ring ring-primary-500 ring-opacity-50 outline-none',
                    className)}>
                    {(value && findItem(value) && renderItem(findItem(value))) || <span>&nbsp;</span>}
                    <div className="absolute top-1/2 right-1">
                        < AngleDownIcon className={classnames(
                            controlIconSmallMarginSize[scale || context.scale || 'base'],
                            'stroke-current stroke-2',
                        )} />
                    </div>
                </div>
                { visible &&
                    <div ref={popper as LegacyRef<HTMLDivElement> | undefined} className={classnames(
                        'absolute border border-control-border rounded', inline && 'w-max',
                        'bg-white w-full p-4 mt-2 space-y-2 max-h-72  overflow-auto')}>

                        <Search scale={smallScale[scale || context.scale || 'base']} value={search} onKeyDown={handleKeyDownSearch} onBlur={handleBlur} onChange={handleSearch} />

                        <div className="divide-y-2 divide-dashed divide-opacity-30 divide-primary-500">
                            {recentValues &&
                                <ul className="pb-2">
                                    {recentValues.map((value, i) => (
                                        <li className={classnames('cursor-pointer', cursor === i && 'bg-primary-400')} onClick={(e) => handleClick(e, inputRef, value)}>{renderItem(findItem(value))}</li>
                                    ))}
                                </ul>}

                            {loadingSearch && <Loading colorClassName="text-primary-500" scale="base" />}

                            {errorSearch && <div>{errorSearch}</div>}

                            {!loadingSearch && !errorSearch && searchResults &&
                                <ul className="pt-2">
                                    {searchResults.map((item, i) => (
                                        <li className={classnames('cursor-pointer', cursor === i + recentValues!.length && 'bg-primary-400')} onClick={(e) => handleClick(e, inputRef, itemValue(item))}>{renderItem(item)}</li>
                                    ))}
                                </ul>}
                            {creatable && showButton && renderCreateItem &&
                                <div className="p-2" onClick={(e) => handleCreate(e, inputRef, search)}>{renderCreateItem(search)}</div>}
                        </div>
                    </div>
                }
                <input className="hidden" type="text" ref={inputRef as LegacyRef<HTMLInputElement> | undefined}  {...props} />
            </div>

        );

    });