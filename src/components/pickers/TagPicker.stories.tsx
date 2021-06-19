import _ from 'lodash';
import React, { useState } from 'react';
import { MockStore } from '../../utils/MockStore';
import { Input } from '../controls/Input';
import { Tag } from '../Tag';
import { TagPicker, TagPickerProps } from './TagPicker';
import colors from '../../utils/flat-colors';


// definition

const definition = {
    title: 'Component/Picker/TagPicker',
    component: TagPicker,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        value: { control: { type: 'array' } },
    }
};
export default definition;


// store

const unique = () => _.uniqueId('newid');
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
    (q: string) => ({ id: unique(), description: q, color: color() }),
    (q: string) => {
        const lowerq = q.toLowerCase();
        return (item: StoryTag) => item.description.toLowerCase().includes(lowerq);
    }
);

const initialTags = [store.get('id1')!, store.get('id2')!, store.get('id10')!];

// parameterized


export const Parameterized = ({ scale, ...props }: TagPickerProps<StoryTag>) => {

    const [tags, setTags] = useState(initialTags);

    return (
        <div className="flex flex-row space-x-2">

            <div className="w-1/6">
                <Input type="text" />
            </div>

            <TagPicker scale={scale}

                tags={tags} tagValue={(tag) => tag.id}
                renderTag={(item, onRemove) => <Tag color={item.color} onDelete={onRemove}>{item.description}</Tag>}

                onAdd={(item) => { setTags(tags => [...tags, item]); return true; }}
                onRemove={(item) => { setTags(tags => tags.filter(i => i.id !== item.id)); return true; }}

                onSearch={(q) => store.search(q, 0)}
                onCreate={(q) => {
                    return store.create(q, 0).then(tag => {
                        console.log('created', tag);
                        return setTags(tags => [...tags, tag]);
                    });
                }}

            />

            <div className="w-1/6">
                <Input type="text" />
            </div>

        </div>
    );

}

Parameterized.args = {
    scale: 'base', className: 'text-secondary-500'
};







// const [tagsC, onChange] = React.useState(data);

// const render = (item: { value: string | number, name: string, className?: string, color?: string }, onRemove?: (value: string | number) => void | undefined) => (
//     <Tag scale={scale} color={item.color} onDelete={onRemove} className={item.className}>{item.name}</Tag>
// )

// const deleteTag: (value: string | number) => boolean | Promise<boolean> = (value: string | number) => {
//     let promise: Promise<boolean> = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let results = _.remove(tagsC, function (tag) { return tag.value !== value; });
//             if (results instanceof Array) {
//                 onChange(results);
//                 resolve(true);
//             } else {
//                 reject(false);
//             }
//         }, 1000);
//     });
//     return promise;
// };

// const searchTag: (q: string) => Promise<{ value: string | number, name: string, color?: string, className?: string }[]> | { value: string | number, name: string, color?: string, className?: string }[] = (q: string) => {
//     let promise: Promise<{ value: string | number, name: string, color?: string, className?: string }[]> = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (q != "") {
//                 let results = tags.filter(tag => tag.name.toLowerCase().includes(q.toLowerCase()) && !tagsC.some(el => el.value === tag.value))
//                 resolve(results);
//             } else { resolve([]); }

//             let error = new Error("Error");
//             reject(error);
//         }, 1000);
//     });
//     return promise;
// };

// const selectTag: (value: string | number) => boolean | Promise<boolean> = (value: string | number) => {
//     let promise: Promise<boolean> = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let tagsE = (_.find(tags, function (tag) { return tag.value == value; }));
//             let results;
//             if (tagsE) { results = _.concat(tagsC, tagsE) } else { results = tagsC };
//             if (results instanceof Array) {
//                 onChange(results);
//                 resolve(true);
//             } else {
//                 reject(false);
//             }
//         }, 1000);
//     });
//     return promise;
// };

// const createTag: (value: string | number) => boolean | Promise<boolean> = (value: string | number) => {
//     let promise: Promise<boolean> = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let results = _.concat(tagsC, { value: value, name: value });
//             if (results instanceof Array) {
//                 onChange(results);
//                 resolve(true);
//             } else {
//                 reject(false);
//             }
//         }, 1000);
//     });
//     return promise;
// };
