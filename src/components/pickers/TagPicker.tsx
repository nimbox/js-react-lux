import classnames from 'classnames';
import React, { FC, useContext, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import AngleDownIcon from '../../icons/AngleDownIcon';
import { Button } from '../Buttons';
import { ComponentScale, controlIconSmallMarginSize, controlText, smallScale } from '../ComponentScale';
import { Search } from '../controls/IconInput';
import { Context as controlContext } from '../controls/Control';
import _debounce from 'lodash/debounce';


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

export const TagPicker: FC<TagPickerProps<{ value: string | number, name: string, color?: string, className?: string }>> =
    (({ scale = 'base', values, render, onRemove, onSearch, onAdd, onCreate, className }) => {

        const context = useContext(controlContext);
        const [isVisible, onOutsideClick] = useState(false);
        const [target, popper] = useOutsideClick(() => onOutsideClick(!isVisible));
        const initial: { value: string | number, name: string, color?: string, className?: string }[] = [];
        const [searchResults, setSearchResults] = useState(initial);
        const [inputTag, setInputTag] = useState("");
        const [showButton, setShowButton] = useState(false);

        const handleSearch = _debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target) {
                setInputTag(e.target.value);
                setShowButton(true);
                Promise.resolve(onSearch(e.target.value))
                    .then(results => setSearchResults(results))
                    .catch(error => console.log(error));
            }
        }, 2000)

        const handleRemove = (value: string | number) => {
            if (onRemove) {
                Promise.resolve(onRemove(value))
                    .then(() => onOutsideClick(!isVisible));
            }
        }

        const handleAdd = (value: string | number) => {
            Promise.resolve(onAdd(value))
                .then(() => {
                    onOutsideClick(!isVisible);
                    setSearchResults([]);
                    setInputTag("");
                    setShowButton(false);
                });
        }

        const handleCreate = (value: string | number) => {
            Promise.resolve(onCreate(value))
                .then(() => {
                    onOutsideClick(!isVisible);
                    setSearchResults([]);
                    setInputTag("");
                    setShowButton(false);
                });
        }


        return (
            <div className="relative inline-block w-full">
                <div ref={target} tabIndex={0} className={classnames(
                    'relative border border-control-border rounded',
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:outline-none pl-1 pr-8',
                    controlText[scale || context.scale || 'base'],
                    className)} onClick={(() => onOutsideClick(!isVisible))}>
                    {values.length > 0 ?
                        values.map((t) =>
                            render(t, (isVisible ? () => handleRemove(t.value) : undefined))
                        ) :
                        <span>&nbsp;</span>}
                    <div className="absolute top-1/2 right-1">
                        < AngleDownIcon className={classnames(
                            controlIconSmallMarginSize[scale || context.scale || 'base'],
                            'stroke-current stroke-2',
                        )} />
                    </div>
                </div>
                { isVisible &&
                    <div ref={popper} className={classnames(
                        'absolute border border-control-border rounded',
                        'bg-white w-full p-4 mt-2 space-y-2 max-h-72  overflow-auto')}>
                        <Search scale={smallScale[scale || context.scale || 'base']} onChange={handleSearch} />
                        {searchResults &&
                            <ul>
                                {searchResults.map((item) => (
                                    <li className="cursor-pointer" onClick={() => handleAdd(item.value)}>{item.name}</li>
                                ))}
                            </ul>}
                        {showButton &&
                            <Button onClick={() => handleCreate(inputTag)} secondary scale={smallScale[scale || context.scale || 'base']} className="block w-full">
                                Crear etiqueta {inputTag}
                            </Button>}
                    </div>
                }
            </div>
        );
    });