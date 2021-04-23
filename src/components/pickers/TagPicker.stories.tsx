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

// const values = 


// parameterized

export const Parameterized = ({ scale, values, ...props }: TagPickerProps) => {

    const [tagsC, onChange] = React.useState(data);

    const render = (t: any, onDelete?: (value: any) => void | undefined) => (
        <Tag scale={scale} color={t.color} className={"mr-1"} onDelete={onDelete} >{t.name}</Tag>
    )

    return (
        <div className="">
            <span>Escribo algo antes</span>
            <TagPicker scale={scale} values={tagsC} render={render}
                onDelete={(id) => { onChange(_.remove(tagsC, function (tag) { return tag.id !== id; })); }}
            // onSearch={((searchTerm) => {
            //     if (searchTerm != "") {
            //         const results = data.filter(tag =>
            //             tag.value.toLowerCase().includes(searchTerm.toLowerCase())
            //         );
            //         return results;
            //     }
            //     return [];
            // })}
            // onSelect={(id) => onChange(_.concat(tagsC, (_.find(data, function (tag) { return tag.id == id; }))))}
            // onCreate={(newTag) => onChange(_.concat(tagsC, { id: newTag, "value": newTag }))}
            >
            </TagPicker>
        </div>
    );
}

Parameterized.args = {
    scale: 'base', className: 'text-secondary-500'
};