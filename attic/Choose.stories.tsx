/* eslint-disable import/no-anonymous-default-export */
import { Choose } from './Choose';
import { default as colors } from '../src/data/flat-colors';
import _, { remove } from 'lodash';
import { MockStore } from '../src/test/MockStore';
import { Input } from '../src/components/controls/Input';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Tag } from '../src/components/Tag';
import { consumeEvent } from '../src/utilities/consumeEvent';
import { useSearchableOptions } from '../src/hooks/useSearchableOptions';
import { WrapperPopper } from '../src/components/controls/WrapperPopper';
import { SearchInput } from '../src/components/controls/SearchInput';
import { ChooseOption } from '../src/components/choose/ChooseOption';
import { AngleDownIcon } from '../src/icons';
import { getActiveElement } from '../src/utilities/getActiveElement';
import { SearchableChooseOption } from '../src/components/choose/SearchableChooseOption';


// definition

export default {
    title: 'Component/Choose/Choose',
    component: Choose,
    parameters: {
        layout: 'centered'
    }
};

// stories

const color = () => colors[_.random(0, colors.length)];

interface StoryTag {
    id: string;
    description: string;
    color: string;
}

const store = new MockStore<StoryTag>([
    { id: 'id1', description: 'kalzuro', color: color() },
    { id: 'id2', description: 'jmeza', color: color() },
    { id: 'id3', description: 'rmarimon', color: color() },
    { id: 'id4', description: 'jcastellanos', color: color() },
    { id: 'id5', description: 'svegas', color: color() },
    { id: 'id6', description: 'etorres', color: color() },
    { id: 'id7', description: 'phernandez', color: color() },
    { id: 'id8', description: 'llara', color: color() },
    { id: 'id9', description: 'kalvarez', color: color() },
    { id: 'id10', description: 'etiqueta1wfewfwefwfwefnkwenfkwnefkwnfkwe', color: color() },
    { id: 'id11', description: 'etiqueta2', color: color() },
    { id: 'id22', description: 'etiqueta3', color: color() }
],
    (value: string) => (item: StoryTag) => item.id === value,
    (q: string) => {
        const lowerq = q.toLowerCase();
        return (item: StoryTag) => item.description.toLowerCase().includes(lowerq);
    }
);

const initialTags = [
    { id: 'id3', description: 'rmarimon', color: color() },
    { id: 'id4', description: 'jcastellanos', color: color() }
]

export const Base = () => {

    const [tags, setTags] = useState<StoryTag[]>(initialTags);

    const provider = useCallback(async (search?: string) => [
        search == null ? await store.search('') : await store.search(search)
    ], []);

    const searchOptions = async (search: string) => {
        return [await store.search(search)];
    }

    const addTag = (tag: StoryTag) => {
        console.log('addTag');
        setTags(tags => [...tags, tag]);
    };

    const removeTag = (tag: StoryTag, e: React.MouseEvent) => {
        console.log('removeTag');
        setTags(tags => tags.filter(t => t.id !== tag.id));
        e.preventDefault();
        e.stopPropagation();
    };

    const linkTag = (tag: StoryTag, e: React.MouseEvent) => {
        console.log('linkTag');
        e.preventDefault();
        e.stopPropagation();
    };


    return (
        <div className="w-full grid grid-cols-4 gap-4 items-center">
            <Input defaultValue="before" />
            <div className="col-span-2">
                <SearchableChooseOption<StoryTag[], StoryTag>

                    variant="outlined"
                    // loading={true}
                    // loadingError={true}
                    
                    withSearch={true}

                    renderOption={({ option }) => <Tag>{option.description}</Tag>}

                    renderFooter={() => <div className="p-2"><Input defaultValue="asd" /></div>}

                    onChoose={(tag) => addTag(tag)}

                    className="flex flex-row flex-wrap gap-1 cursor-pointer"
                    containerClassName="w-96" 
                    
                    provider={provider} 

                >

                    {({ show }) =>
                        (!tags || tags.length === 0) ?
                            <>Add tag...</>
                            :
                            tags.map(tag =>
                                <Tag
                                    key={tag.id}
                                    onClick={!show ? (e) => linkTag(tag, e) : undefined}
                                    onDelete={show ? (e) => removeTag(tag, e) : undefined}
                                >
                                    {tag.description}
                                    {/* {show ?
                                        <>{tag.description}</>
                                        :
                                        <a href="#/" tabIndex={-1} onMouseDown={(e) => { e.preventDefault(); }}>{tag.description}</a>
                                    } */}
                                </Tag>
                            )
                    }

                </SearchableChooseOption>
            </div>
            <Input defaultValue="after" />
        </div >
    );

};



export const FocusOrClick = () => {


    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);

    // const lastRef = useRef<HTMLInputElement>(null)
    // useEffect(() => {
    //     setTimeout(() => {
    //         lastRef.current?.focus();
    //     }, 5000);
    // }, []);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    const [searchValue, setSearchValue] = useState('')

    const provider = useCallback(async (search?: string) => [
        search == null ? await store.search('') : await store.search(search)
    ], []);

    const { options, loading, error, search,
        reset, selected, handleKeyDown: handleSearchKeyDown
    } = useSearchableOptions(provider, {
        debounce: 150
    });

    const optionsCount = useMemo(() => options.reduce((a, l) => a + l.length, 0), [options])

    // handlers

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        search(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        switch (e.key) {

            case 'Escape':

                if (selected != null) {
                    e.preventDefault();
                    reset();
                } else {
                    handleHide();
                }
                break;

            // case 'Tab':
            case 'Enter':

                if (selected != null) {
                    e.preventDefault();
                    const group = options[selected[0]];
                    handleChoose(group[selected[1]]);
                } else {
                    handleHide();
                }

                break;

            case 'ArrowUp':
            case 'ArrowDown':
                handleShow();
                break;

        }

        handleSearchKeyDown(e);

    };

    const handleChoose = (option: StoryTag) => {
        console.log('choose', option)
    };

    const handleLimitFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        console.log('handleLimitFocus');
        wrapperRef?.focus();
        handleHide();
    };


    // popper

    const renderOption = useCallback(({ option }) => <Tag>{option.description}</Tag>, []);

    const popper = () => {
        return (
            <div className="xw-96">
                <div tabIndex={0} onFocus={handleLimitFocus} />
                <div className="divide-y">

                    <div className="p-2">
                        <SearchInput

                            type="text"
                            autoFocus

                            value={searchValue}
                            onChange={handleOnChange}

                            onKeyDown={handleKeyDown}

                        />
                    </div>

                    <ChooseOption<StoryTag[], StoryTag>

                        options={options}
                        selected={selected}
                        onChoose={handleChoose}

                        renderOption={renderOption}

                        className="py-2"

                    />

                    {(searchValue && !loading && optionsCount === 0) &&
                        <div className="p-2">
                            <Input type="text" value={searchValue} disabled />
                            <Input type="text" defaultValue="asd" onBlur={() => console.log('moving out')} />
                        </div>
                    }

                </div>
                <div tabIndex={0} onFocus={handleLimitFocus} />
            </div>
        );
    };

    // render

    return (
        <div className="w-full grid grid-cols-4 gap-4 items-center">
            <Input defaultValue="" />
            <div className="col-span-2">
                <WrapperPopper

                    ref={setWrapperRef}

                    withArrow={false}
                    withSameWidth={true}

                    variant="outlined"
                    tabIndex={0}

                    show={show}
                    onHide={handleHide}
                    popper={popper}

                    onKeyDown={handleKeyDown}

                    onFocus={handleShow}

                    end={<AngleDownIcon className="text-control-border stroke-2" style={{ marginRight: '0.5em' }} />}

                >
                    Internal
                </WrapperPopper>
            </div>
            <Input defaultValue="" />
        </div >
    );

};
