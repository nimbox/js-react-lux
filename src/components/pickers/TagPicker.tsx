import classnames from 'classnames';
import React, { FC, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import AngleDownIcon from '../../icons/AngleDownIcon';
import { Button } from '../Buttons';
import { ComponentScale, controlIconMarignSize, smallScale } from '../ComponentScale';
import { Search } from '../controls/IconInput';


export interface TagPickerProps {
    scale: ComponentScale;
    values: any[];
    render: (t: any, onRemove?: (value: any) => void) => JSX.Element;
    onSearch: (value: string) => Promise<{ t: any }[]> | { t: any }[];
    onRemove?: (value: any) => boolean | Promise<boolean>;
    onAdd: (value: any) => boolean | Promise<boolean>;
    onCreate: (value: any) => boolean | Promise<boolean>;
    className?: string;
}

export const TagPicker: FC<TagPickerProps> = (({ scale = 'base', values, render, onRemove, onSearch, onAdd, onCreate, className }) => {

    const [isVisible, onOutsideClick] = useState(false);
    const [target, popper] = useOutsideClick(() => onOutsideClick(!isVisible));
    const initial: { t: any }[] = [];
    const [searchResults, setSearchResults] = React.useState(initial);
    const [inputTag, setInputTag] = React.useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setInputTag(e.target.value);
            Promise.resolve(onSearch(e.target.value))
                .then(results => setSearchResults(results))
                .catch(error => console.log(error));
        }
    }

    const handleRemove = (id: string | number) => {
        if (onRemove) {
            Promise.resolve(onRemove(id))
                .then(() => onOutsideClick(!isVisible));
        }
    }

    const handleAdd = (id: string | number) => {
        Promise.resolve(onAdd(id))
            .then(() => onOutsideClick(!isVisible));
    }

    const handleCreate = (id: string | number) => {
        Promise.resolve(onCreate(id))
            .then(() => onOutsideClick(!isVisible));
    }


    return (
        <div className="relative inline-block max-w-full">
            <div ref={target} className={classnames(
                'relative border border-control-border rounded',
                'cursor-pointer pb-1 pl-1 pr-8 space-x-1 space-y-1', className)} >
                {values.map((t) => render(t, (isVisible ? () => handleRemove(t.id) : undefined)))}
                <div className="absolute top-1/2 right-1 ">
                    < AngleDownIcon className={classnames(
                        controlIconMarignSize[scale],
                        'stroke-current stroke-2',
                    )} onClick={(() => onOutsideClick(!isVisible))} />
                </div>
            </div>
            { isVisible &&
                <div ref={popper} className={classnames(
                    'absolute border border-control-border rounded',
                    'bg-white w-full p-4 mt-2 space-y-2')}>
                    <Search scale={smallScale[scale]} onChange={handleSearch} />
                    {searchResults &&
                        <ul>
                            {searchResults.map((item: any) => (
                                <li onClick={() => handleAdd(item.id)}>{item.name}</li>
                            ))}
                        </ul>}
                    <Button onClick={() => handleCreate(inputTag)} secondary scale={smallScale[scale]} className="block w-full">
                        Crear etiqueta {inputTag}
                    </Button>
                </div>
            }
        </div>
    );
});