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
    { id: "id1", name: "kalzuro" },
    { id: "id2", name: "jmeza" },
    { id: "id3", name: "rmarimom" },
    { id: "id4", name: "jcastellanos" },
    { id: "id5", name: "svegas" },
    { id: "id6", name: "etorres" },
    { id: "id7", name: "phernandez" },
    { id: "id8", name: "llara" },
    { id: "id9", name: "kalvarez" },
    { id: "id0", name: "etiqueta1wfewfwefwfwefnkwenfkwnefkwnfkwe" },
    { id: "id11", name: "etiqueta2" },
    { id: "id22", name: "etiqueta3" }
];

const data =
    [{ id: "id0", name: "etiqueta1wfewfwefwfwefnkwenfkwnefkwnfkwe" },
    { id: "id11", name: "etiqueta2" },
    { id: "id22", name: "etiqueta3" }];

// parameterized

export const Parameterized = ({ scale, values, ...props }: TagPickerProps) => {

    const [tagsC, onChange] = React.useState(data);

    const render = (t: any, onRemove?: (value: any) => void | undefined) => (
        <Tag scale={scale} color={t.color} onDelete={onRemove} >{t.name}</Tag>
    )

    const deleteTag: (id: string) => boolean | Promise<boolean> = (id: string) => {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            setTimeout(() => {
                let results = _.remove(tagsC, function (tag) { return tag.id !== id; });
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

    const searchTag: (q: string) => Promise<{ t: any }[]> | { t: any }[] = (q: string) => {
        let promise: Promise<{ t: any }[]> = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (q != "") {
                    let results = tags.filter(tag =>
                        tag.name.toLowerCase().includes(q.toLowerCase())
                    );
                    resolve(results);
                } else { resolve([]); }

                let error = new Error("Error");
                reject(error);
            }, 1000);
        });
        return promise;
    };

    const selectTag: (id: string) => boolean | Promise<boolean> = (id: string) => {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            setTimeout(() => {
                let tagsE = (_.find(tags, function (tag) { return tag.id == id; }));
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

    const createTag: (id: string) => boolean | Promise<boolean> = (id: string) => {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            setTimeout(() => {
                let results = _.concat(tagsC, { id: id, name: id });
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
            <span>Escribo algo antes</span>
            <TagPicker scale={scale} values={tagsC} render={render}
                onRemove={(id) => deleteTag(id)}
                onSearch={(q) => searchTag(q)}
                onAdd={(id) => selectTag(id)}
                onCreate={(id) => createTag(id)}>
            </TagPicker>
        </div>
    );
}

Parameterized.args = {
    scale: 'base', className: 'text-secondary-500'
};