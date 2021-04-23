import classnames from 'classnames';
import React, { FC, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import AngleDownIcon from '../../icons/AngleDownIcon';
import SearchIcon from '../../icons/SearchIcon';
import { Button } from '../Buttons';
import { ComponentScale } from '../ComponentScale';
import { Tag } from '../Tag';


export interface TagPickerProps {
    scale: ComponentScale;
    values: any[];
    render: (t: any, onDelete?: (value: any) => void) => JSX.Element;
    onDelete?: (value: any) => void;
    onSearch: (value: String) => { key: String | number, value: String }[];
    onSelect: (value: any) => void;
    onCreate: (value: any) => void;
    className?: string;
}

export const TagPicker: FC<TagPickerProps> = (({ scale = 'base', values, render, onDelete, onSearch, onSelect, onCreate, className }) => {

    const [isVisible, onOutsideClick] = useState(false);
    const [target, popper] = useOutsideClick(() => onOutsideClick(!isVisible));
    const initial: { key: String | number, value: String }[] = [];
    const [searchResults, setSearchResults] = React.useState(initial);
    const [inputTag, setInputTag] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setSearchResults(onSearch(e.target.value));
            setInputTag(e.target.value)
        }
    }

    const handleDelete = (id: string | number) => {
        if (onDelete) onDelete(id);
    }

    return (
        <div className="relative inline-block max-w-full">
            <div ref={target} className={classnames('relative p-1 pr-8 border border-control-border rounded cursor-pointer', className)} >
                {values.map((t) => render(t, (isVisible ? (t) => handleDelete(t.id) : undefined)))}
                <div className="absolute top-1/2 right-1 ">
                    < AngleDownIcon className={classnames("stroke-current stroke-2", {
                        'h-3 w-3 -mt-1.5': scale === 'xs',
                        'h-4 w-4 -mt-2': scale === 'sm',
                        'h-5 w-5 -mt-2.5': scale === 'base',
                        'h-6 w-6 -mt-3': scale === 'lg'
                    })} onClick={(() => { onOutsideClick(!isVisible) })} />
                </div>
            </div>
            { isVisible &&
                <div ref={popper} className={classnames('absolute w-full p-4 mt-2 bg-white border border-primary-700 rounded')}>
                    <div className="relative">
                        <SearchIcon className="absolute inline top-1 right-1" />
                        <input onChange={handleChange} className="w-full border border-primary-700 rounded" />
                    </div>
                    {searchResults &&
                        <ul>
                            {searchResults.map((item: { key: String | number, value: String }) => (
                                <li onClick={() => onSelect(item.key)}>{item.value}</li>
                            ))}
                        </ul>}
                    <div className="pt-2">
                        <Button onClick={() => onCreate(inputTag)} link scale="base">Crear etiqueta {inputTag}</Button>
                    </div>
                </div>
            }
        </div>
    );
});