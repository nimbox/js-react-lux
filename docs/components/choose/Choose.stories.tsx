/* eslint-disable import/no-anonymous-default-export */
import { Choose } from './Choose';
import { default as colors } from '../../data/flat-colors';
import _, { remove } from 'lodash';
import { MockStore } from '../../test/MockStore';
import { Input } from '../controls/Input';
import { useState } from 'react';
import { Tag } from '../Tag';
import { consumeEvent } from '../../utilities/consumeEvent';


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

    const searchOptions = async (search: string) => {
        return [await store.search(search)];
    }

    const addTag = (tag: StoryTag) => {
        console.log('addTag');
        setTags(tags => [...tags, tag]);
    };

    const removeTag = (tag: StoryTag) => {
        console.log('removeTag');
        setTags(tags => tags.filter(t => t.id !== tag.id));
    };

    const linkTag = (tag: StoryTag) => {
        console.log('linkTag');
    };

    console.log('tags', tags);

    return (
        <div className="w-full grid grid-cols-4 gap-4 items-center">
            <Input defaultValue="" />
            <div className="col-span-2">
                <Choose<StoryTag[], StoryTag>

                    variant="outlined"
                    // loading={true}
                    // loadingError={true}

                    withSearch={true}

                    searchOptions={searchOptions}
                    renderOption={({ option }) => <Tag>{option.description}</Tag>}

                    renderFooter={() => <div className="p-2"><Input defaultValue="asd" /></div>}

                    onChoose={(tag) => addTag(tag)}

                    className="flex flex-row flex-wrap gap-1 cursor-pointer"

                >

                    {({ show }) =>
                        (!tags || tags.length === 0) ?
                            <>Add tag...</>
                            :
                            tags.map(tag =>
                                <Tag
                                    key={tag.id}
                                    onClick={!show ? () => linkTag(tag) : undefined}
                                    onDelete={show ? () => removeTag(tag) : undefined}
                                >
                                    {show ?
                                        <>{tag.description}</>
                                        :
                                        <a href="#/" onMouseDown={(e) => { e.preventDefault(); }}>{tag.description}</a>
                                    }
                                </Tag>
                            )
                    }

                </Choose>
            </div>
            <Input defaultValue="" />
        </div >
    );

};



export const FocusOrClick = () => {







    return (
        <div className="w-full grid grid-cols-4 gap-4 items-center">
            <Input defaultValue="" />
            <div className="col-span-2">
                <Choose<StoryTag[], StoryTag>

                    variant="outlined"
                    // loading={true}
                    // loadingError={true}

                    withSearch={true}

                    searchOptions={async (search: string) => [await store.search(search)]}
                    renderOption={({ option }) => <Tag>{option.description}</Tag>}

                    renderFooter={() => <div><Input defaultValue="asd" /></div>}

                    onChoose={(tag) => console.log('onChoose')}

                    className="flex flex-row flex-wrap gap-1 cursor-pointer"

                >

                    Internal

                </Choose>
            </div>
            <Input defaultValue="" />
        </div >
    );

};
