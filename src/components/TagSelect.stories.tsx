import React from 'react';
import { TagSelect, TagSelectProps } from './TagSelect';
import _ from 'lodash';



// definition

const definition = {
    title: 'Component/TagSelect',
    component: TagSelect,
    argTypes: {
        size: { control: { type: 'select', options: ['sm', 'base', 'lg'] } },
        value: { control: { type: 'array' } },
    }
};
export default definition;

const data = [
    {"key":"key1","value":"kalzuro"},
    {"key":"key2","value":"jmeza"},
    {"key":"key3","value":"rmarimom"},
    {"key":"key4","value":"jcastellanos"},
    {"key":"key5","value":"svegas"},
    {"key":"key6","value":"etorres"},
    {"key":"key7","value":"phernandez"},
    {"key":"key8","value":"llara"},
    {"key":"key9","value":"kalvarez"},
    {"key":"key0","value":"etiqueta1wfewfwefwfwefnkwenfkwnefkwnfkwe"},
    {"key":"key11","value":"etiqueta2"},
    {"key":"key22","value":"etiqueta3"}
];

// parameterized

export const Parameterized = ({ size, tags, ...props }: TagSelectProps) => {
    const [tagsC, onChange] = React.useState(tags);

    return ( 
    <TagSelect  size={size} tags={tagsC} 
                onDelete={(key) => onChange(_.remove(tagsC, function(tag) { return tag.key !== key; })) } 
                onSearch={((searchTerm) => {
                    if (searchTerm!="") {
                        const results = data.filter(tag => 
                        tag.value.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                        return results;
                    }
                })}
                onSelect={(key) => onChange(_.concat(tagsC, (_.find(data, function(tag) { return tag.key == key; })))) }
                onCreate={(newTag) => onChange(_.concat(tagsC, {"key":newTag,"value":newTag} )) }
                />
    );
} 

Parameterized.args = { size: 'base', tags: [{"key":"key0","value":"etiqueta1wfewfwefwfwefnkwenfkwnefkwnfkwe"},
                                            {"key":"key11","value":"etiqueta2"},
                                            {"key":"key22","value":"etiqueta3"}], className: 'text-secondary-500' };