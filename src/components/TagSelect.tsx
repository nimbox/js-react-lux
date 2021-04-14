import classnames from 'classnames';
import React, { FC } from 'react';
import { ComponentSize } from './ComponentSize';
import useOutsideClick from '../hooks/useOutsideClick';
import { Tag} from './Tag';
import {Button} from './Buttons';
import AngleDownIcon from '../icons/AngleDownIcon';
import SearchIcon from '../icons/SearchIcon';

export interface TagSelectProps {
    size?: ComponentSize;
    tags: any[];
    className?: string;
    onDelete?: (value: any) => void;
    onSearch: (value: any) => any[];
    onSelect:  (value: any) => void;
    onCreate: (value: any) => void;
}

export const TagSelect: FC<TagSelectProps> = (({ size = 'base', tags, onDelete, onSearch, onSelect, onCreate, className }) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useOutsideClick(true);
    const [searchResults, setSearchResults] = React.useState([]);
    const [inputTag, setInputTag] = React.useState("");

    return (
        <div ref={ref} className="relative inline-block max-w-full">
            <div className={classnames('relative p-1 pr-4 border border-primary-700 rounded cursor-pointer',{
                'text-xs': size === 'sm',
                'text-base': size === 'base',
                'text-lg': size === 'lg',
                }, className)} >
                {tags.map((tag) =>  <Tag size={size} className="m-1" onDelete={isComponentVisible && (() => onDelete(tag.key))} >{tag.value}</Tag>)}
                <div className="absolute bottom-1/2 right-1 -mb-1 pl-1"> 
                    < AngleDownIcon className="h-2 w-2 stroke-current stroke-2"  onClick={() => setIsComponentVisible(!isComponentVisible) } />
                </div>            
            </div>
            { isComponentVisible &&  <div className={classnames('absolute p-4 mt-2 bg-white border border-primary-700 rounded')}> 
                    <div className="relative">
                        <SearchIcon className="absolute inline top-1 right-1" />
                        <input onChange={e => { setSearchResults(onSearch(e.target.value)); setInputTag(e.target.value)} } className="border border-primary-700 rounded" /> 
                    </div>
                    { searchResults &&
                    <ul>
                        {searchResults.map(item => (
                        <li onClick={() => onSelect(item.key)}>{item.value}</li>
                        ))}
                    </ul>}
                    <div className="pt-2">
                        <Button onClick={() => onCreate(inputTag)} link size="base">Crear etiqueta {inputTag}</Button>
                    </div>
                </div> }
        </div>
    );
});