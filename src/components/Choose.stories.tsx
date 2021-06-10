import _ from 'lodash';
import React, { createRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Choose, ChooseProps } from './Choose';


// definition

const definition = {
    title: 'Component/Choose',
    component: Choose,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        value: { control: { type: 'array' } },
    }
};
export default definition;

// parameterized

const data = [
    { id: "id1", value: "Karla Alzuro" },
    { id: "id2", value: "Jonatan Meza" },
    { id: "id3", value: "Ricardo Marimon" },
    { id: "id4", value: "Juan Castellanos" },
    { id: "id5", value: "Samantha Vegas" },
    { id: "id6", value: "Esteban Torres" },
    { id: "id7", value: "Patricia Hernandez" },
    { id: "id8", value: "Luis Lara" },
    { id: "id9", value: "Katryn Alvarez" },
    { id: "id0", value: "Andrea Figueira" },
    { id: "id11", value: "Maria Gonzalez" },
    { id: "id22", value: "Meibel Granado" }
];

export const Parameterized = ({ scale,  ...props }: ChooseProps<{id: string | number, value: string}>) => {

    const [dataC, setData] = React.useState([]);
    const [newValue, setNewValue] = React.useState("id1");

    const onChange: (value: string) => Promise<{id: string, value: string }[]> | {id: string, value: string}[] = (value: string) => {
        let promise: Promise<{id: string, value:string}[]> = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (value != "") {
                    let results = data.filter(d => d.value.toLowerCase().includes(value.toLowerCase()) && !dataC.some(el => el.id === d.id) && !recent.some(el => el === d.id))
                    resolve(results);
                } else { resolve([]); }

                let error = new Error("Error");
                reject(error);
            }, 100);
        });
        return promise;
    };

    const selectItem: (value: string) => boolean | Promise<boolean> = (value: string) => {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            setTimeout(() => {
                let dataE = (_.find(data, function (d) { return d.id == value; }));
                if (dataE) { 
                    setNewValue(dataE.id); 
                    resolve(true); 
                } else {
                    reject(false);
                }
            }, 1000);
        });
        return promise;
    };

    const renderItem = (item) => (item.value);
    const itemValue = (item) => (item.id);
    const valueItem = (value) =>  ( (_.find(data, function (d) { return d.id == value; })));

    const recent =["id1", "id5", "id2"];

    return (
        <div className="">
            <Choose value={newValue} recentValues={recent} onChange={onChange} onSelect={selectItem} renderItem={renderItem} valueItem={valueItem} itemValue={itemValue} scale={scale}  />
        </div>
    );
}

Parameterized.args = {
    scale: 'base', className: 'text-secondary-500'
};