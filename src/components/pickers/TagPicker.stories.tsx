import _ from 'lodash';
import React from 'react';
import { TagPicker, TagPickerProps } from './TagPicker';
import { Tag } from '../Tag';


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

const tags = [
    { value: "id1", name: "kalzuro" },
    { value: "id2", name: "jmeza" },
    { value: "id3", name: "rmarimom" },
    { value: "id4", name: "jcastellanos" },
    { value: "id5", name: "svegas" },
    { value: "id6", name: "etorres" },
    { value: "id7", name: "phernandez" },
    { value: "id8", name: "llara" },
    { value: "id9", name: "kalvarez" },
    { value: "id0", name: "etiqueta1wfewfwefwfwefnkwenfkwnefkwnfkwe" },
    { value: "id11", name: "etiqueta2" },
    { value: "id22", name: "etiqueta3" }
];

const data =
    [{ value: "id0", name: "etiqueta1wfewfwefwfwefnkwenfkwnefkwnfkwe" },
    { value: "id11", name: "etiqueta2" },
    { value: "id22", name: "etiqueta3" }];

// parameterized

export const Parameterized = ({ scale, values, ...props }: TagPickerProps<{value: string | number, name:string, color?:string, className?: string}>) => {

    const [tagsC, onChange] = React.useState(data);

    const render = (item: {value: string | number, name:string, className?: string, color?: string}, onRemove?: (value: string | number) => void | undefined) => (
        <Tag scale={scale} color={item.color} onDelete={onRemove} className={item.className}>{item.name}</Tag>
    )

    const deleteTag: (value: string | number) => boolean | Promise<boolean> = (value: string | number) => {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            setTimeout(() => {
                let results = _.remove(tagsC, function (tag) { return tag.value !== value; });
                if (results instanceof Array) {
                    onChange(results);
                    resolve(true);
                } else {
                    reject(false);
                }
            }, 1000);
        });
        return promise;
    };

    const searchTag: (q: string) => Promise<{value: string | number, name:string, color?:string, className?: string }[]> | {value: string | number, name:string, color?:string, className?: string}[] = (q: string) => {
        let promise: Promise<{value: string | number, name:string, color?:string, className?: string }[]> = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (q != "") {
                    let results = tags.filter(tag => tag.name.toLowerCase().includes(q.toLowerCase()) && !tagsC.some(el => el.value === tag.value))
                    resolve(results);
                } else { resolve([]); }

                let error = new Error("Error");
                reject(error);
            }, 1000);
        });
        return promise;
    };

    const selectTag: (value: string | number) => boolean | Promise<boolean> = (value: string | number) => {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            setTimeout(() => {
                let tagsE = (_.find(tags, function (tag) { return tag.value == value; }));
                let results;
                if (tagsE) { results = _.concat(tagsC, tagsE) } else { results = tagsC };
                if (results instanceof Array) {
                    onChange(results);
                    resolve(true);
                } else {
                    reject(false);
                }
            }, 1000);
        });
        return promise;
    };

    const createTag: (value: string | number) => boolean | Promise<boolean> = (value: string | number) => {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            setTimeout(() => {
                let results = _.concat(tagsC, { value: value, name: value });
                if (results instanceof Array) {
                    onChange(results);
                    resolve(true);
                } else {
                    reject(false);
                }
            }, 1000);
        });
        return promise;
    };


    return (
        <div className="">
            <TagPicker scale={scale} values={tagsC} render={render} 
                onRemove={(value) => deleteTag(value)}
                onSearch={(q) => searchTag(q)}
                onAdd={(value) => selectTag(value)}
                onCreate={(value) => createTag(value)}>
            </TagPicker>
        </div>
    );
}

Parameterized.args = {
    scale: 'base', className: 'text-secondary-500'
};