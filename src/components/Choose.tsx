import classnames from 'classnames';
import React, { FC, LegacyRef, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useOutsideClick } from './../hooks/useOutsideClick';
import AngleDownIcon from './../icons/AngleDownIcon';
import { ComponentScale, controlIconSmallMarginSize, controlScale, controlText, smallScale } from './ComponentScale';
import { Search } from './controls/IconInput';
import { Context as controlContext } from './controls/Control';
import _debounce from 'lodash/debounce';
import { Button, Loading } from '..';
import _ from 'lodash';


export interface ChooseProps<T> {
    scale?: ComponentScale;

    value?: string;
    defaultValue?: string;
    recentValues?: string[];

    items?: T[];
    loading?: boolean;
    error?: any;

    onSearch?: (value: string) => Promise<T[]> | T[] | [];

    onSelect: (value: string) => boolean | Promise<boolean>;

    itemValue: (item: T) => string;
    itemMatch: (q: string, item: T) => boolean;
    renderItem: (item: T) => React.Component;

    creatable?: boolean;
    onCreate?: (value: string) => boolean | Promise<boolean>;
    renderCreateItem?: (q: string) => React.Component;

    className?: string;
}

export const Choose = React.forwardRef<HTMLInputElement, ChooseProps<T>>
    (({ scale = 'base', value, defaultValue, recentValues, items, error, onSearch, onSelect, itemValue, itemMatch, renderItem, creatable = false, onCreate, renderCreateItem, className }, ref) => {

        const context = useContext(controlContext);
        const [isVisible, onOutsideClick] = useState(false);
        const [target, popper] = useOutsideClick(() => onOutsideClick(!isVisible));

        const initial: T[] = [];
        const [searchResults, setSearchResults] = useState(initial);

        const findItem = (value: string) => (_.find(items, (item) => itemValue(item) == value));
        const [inputValue, setInputValue] = useState(value || defaultValue);
        const [inputContent, setInputContent] = useState("");
        const [loading, setLoading] = useState(false);

        const reference = useRef(ref);

        useEffect(() => { reference.current = inputValue }, [inputValue]);

        const [focused, setFocused] = React.useState(false);
        const onFocus = () => setFocused(true);
        const onBlur = () => setFocused(false);

        const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target) {
                setLoading(true);
                setInputContent(e.target.value);
                console.log(inputContent);
                if (items) {
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (items) {
                                let results = items.filter(item => itemMatch(e.target.value, item) && !recentValues?.some(el => el === itemValue(item)))
                                resolve(results);
                                console.log(results);
                            } else { resolve([]); }
                            let error = new Error("Error");
                            reject(error);
                        }, 1000)
                    })
                        .then(results => { setSearchResults(results); setLoading(false) })
                        .catch(error => console.log(error));
                }
            }
        }, []);

        const handleClick = (item: T) => {
            new Promise((resolve, reject) => {
                if (item) {
                    setInputValue(itemValue(item));
                    onOutsideClick(!isVisible);
                    setSearchResults([]);
                    resolve(true);
                }
                reject(false);
            })
                .then(results => console.log("click"))
                .catch(error => console.log(""));
        }

        console.log("render " + inputValue + "ref " + reference.current + focused);
        return (
            <div className="relative inline-block w-full" onFocus={onFocus} onBlur={onBlur} >
                <div ref={target as LegacyRef<HTMLDivElement> | undefined} tabIndex={0} className={classnames(
                    'relative border border-control-border rounded',
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:outline-none pl-1 pr-8',
                    controlScale[scale || context.scale || 'base'],
                    className)} onClick={(() => onOutsideClick(!isVisible))}>
                    {renderItem(findItem(inputValue)) || <span>&nbsp;</span>}
                    <div className="absolute top-1/2 right-1">
                        < AngleDownIcon className={classnames(
                            controlIconSmallMarginSize[scale || context.scale || 'base'],
                            'stroke-current stroke-2',
                        )} />
                    </div>
                </div>
                { (isVisible || focused) &&
                    <div ref={popper as LegacyRef<HTMLDivElement> | undefined} className={classnames(
                        'absolute border border-control-border rounded',
                        'bg-white w-full p-4 mt-2 space-y-2 max-h-72  overflow-auto')}>

                        <Search scale={smallScale[scale || context.scale || 'base']} value={inputContent} onChange={handleSearch} />
                        {defaultValue &&
                            <input type="hidden" defaultValue={defaultValue} ref={reference} />
                        }
                        {value &&
                            <input type="hidden" value={inputValue} />
                        }

                        <div className="divide-y-2 divide-dashed divide-opacity-30 divide-primary-500">
                            {recentValues &&
                                <ul className="pb-2">
                                    {recentValues.map((value) => (
                                        <li className="cursor-pointer" onClick={() => handleClick(findItem(value))}>{renderItem(findItem(value))}</li>
                                    ))}
                                </ul>}
                            {loading && <Loading colorClassName="text-primary-500" scale="base" />}
                            {!loading && searchResults &&
                                <ul className="pt-2">
                                    {searchResults.map((item) => (
                                        <li className="cursor-pointer" onClick={() => handleClick(item)}>{renderItem(item)}</li>
                                    ))}
                                </ul>}
                        </div>
                    </div>
                }
            </div>
        );
    });