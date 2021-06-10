import classnames from 'classnames';
import React, { FC, LegacyRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { useOutsideClick } from './../hooks/useOutsideClick';
import AngleDownIcon from './../icons/AngleDownIcon';
import { ComponentScale, controlIconSmallMarginSize, controlText, smallScale } from './ComponentScale';
import { Search } from './controls/IconInput';
import { Context as controlContext } from './controls/Control';
import _debounce from 'lodash/debounce';
import { Button } from '..';


export interface ChooseProps<T> { 
    scale?: ComponentScale;

    value?: string;
    defaultValue?: string;
    recentValues?: string[];

    items?: T[];
    loading?: boolean;
    error?: any;

    onChange?: (value: string) => Promise<T[]> | T[] | [];

    onSelect: (value: string) => boolean | Promise<boolean>;

    itemValue: (item: T) => string;
    valueItem: (value: string) => T;
    renderItem: (item: T) => React.Component;

    creatable?: boolean;
    onCreate?: (value: string) => boolean | Promise<boolean>;
    renderCreateItem?: (q: string) => React.Component;

    className?: string;
}

export const Choose = React.forwardRef<HTMLInputElement, ChooseProps<T>>
    (({ scale = 'base', value, defaultValue, recentValues, items, loading, error, onChange, onSelect, itemValue, valueItem, renderItem, creatable = false, onCreate, renderCreateItem, className }, ref) => {

        const context = useContext(controlContext);
        const [isVisible, onOutsideClick] = useState(false);
        const [target, popper] = useOutsideClick(() => onOutsideClick(!isVisible));

        const initial: {id: string,  value: string }[] = [];
        const [searchResults, setSearchResults] = useState(initial);

        const [newValue, setNewValue] = useState(value || defaultValue || "");

        const handleChange = _debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target) {
                if (onChange) {
                    Promise.resolve(onChange(e.target.value)) 
                    .then(results => setSearchResults(results))
                    .catch(error => console.log(error));
                }
            }
        }, 200)

        const handleClick = (value: string) => {
            Promise.resolve(onSelect(value))
                .then(() => {
                    onOutsideClick(!isVisible);
                    setSearchResults([]);
                    setNewValue(value);
                });
        }

        return (
            <div className="relative inline-block w-full">
                <div ref={target as LegacyRef<HTMLDivElement> | undefined} tabIndex={0} className={classnames(
                    'relative border border-control-border rounded',
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:outline-none pl-1 pr-8',
                    controlText[scale || context.scale || 'base'],
                    className)} onClick={(() => onOutsideClick(!isVisible))}>
                    {renderItem(valueItem(newValue)) || <span>&nbsp;</span>}
                    <div className="absolute top-1/2 right-1">
                        < AngleDownIcon className={classnames(
                            controlIconSmallMarginSize[scale || context.scale || 'base'],
                            'stroke-current stroke-2',
                        )} />
                    </div>
                </div>
                { isVisible &&
                    <div ref={popper as LegacyRef<HTMLDivElement> | undefined} className={classnames(
                        'absolute border border-control-border rounded',
                        'bg-white w-full p-4 mt-2 space-y-2 max-h-72  overflow-auto')}>
                            
                        <Search scale={smallScale[scale || context.scale || 'base']} onChange={handleChange} />
                            
                        {/* <Search scale={smallScale[scale || context.scale || 'base']} 
                                ref={inputRef} /> */}
                        <div className="divide-y-2 divide-dashed divide-opacity-30 divide-primary-500">
                        {recentValues &&
                            <ul className="pb-2">
                                {recentValues.map((value) => (
                                    <li className="cursor-pointer" onClick={() => handleClick(value)}>{renderItem(valueItem(value))}</li> 
                                ))}
                            </ul>}
                        {searchResults &&
                            <ul className="pt-2">
                                {searchResults.map((item) => (
                                    <li className="cursor-pointer" onClick={() => handleClick(itemValue(item))}>{renderItem(item)}</li> 
                                ))}
                            </ul>}
                        </div>
                    </div>
                }
            </div>
        );
    });