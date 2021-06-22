import classnames from 'classnames';
import _ from 'lodash';
import React, { createRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import tinycolor from 'tinycolor2';
import { Avatar } from './Avatar';
import { Button, Input } from '..';
import { Choose, ChooseProps } from './Choose';
import { ChooseInline } from './ChooseInline';
import { Search } from './controls/IconInput';


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
    { id: "id22", value: "Meibel Granadofkefkenfkwe kncknwelkcnweknv wekcnweknckwne" }
];

const onSearch: (value: string) => Promise<{ id: string, value: string }[]> | { id: string, value: string }[] = (value: string) => {
    let promise: Promise<{ id: string, value: string }[]> = new Promise((resolve, reject) => {
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

const itemMatch = (q: string, item) => {
    return item.value.toLowerCase().includes(q.toLowerCase())
}

const renderItem = (item) => (item.value);
const itemValue = (item) => (item.id);
const getItem = (value: string) => (_.find(data, (item) => item.id == value));

const recent = ["id1", "id5", "id2"];

export const Controlled = () => {

    const [inputValue, setInputValue] = useState("id1");
    const handleChange = (e: any) => {
        console.log('está siendo', e.target.value);
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('termino siendo', inputValue);
    };

    // useEffect(() => { 
    //     setTimeout(() => {
    //         setInputValue("id2");
    //         console.log("setTimeOut");
    //     }, 5000)
    //  }, []);

    console.log('render');
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
                <Input />
                <Choose
                    value={inputValue}
                    onChange={handleChange}
                    recentValues={recent}
                    items={data}
                    renderItem={renderItem}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    scale="base" />

                <Search />
            </div>
            {/* <button type="submit" >enviar</button> */}
        </form>
    );

};


export const UnControlled = () => {

    const ref = useRef<any>();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('termino siendo', ref.current.value);
    };

    console.log('render uncontrolled');
    return (
        <form onSubmit={handleSubmit} >
            <div className="grid grid-cols-3 gap-4">
                <Input type="text" />
                <Choose
                    defaultValue="id1"
                    ref={ref}
                    recentValues={recent}
                    items={data}
                    renderItem={renderItem}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    scale="base" />
                <Search />
            </div>
            {/* <button type="submit" >enviar</button> */}
        </form>
    );

};

export const Loading = () => {

    const [dataC, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const onSearch: (value: string) => Promise<{ id: string, value: string }[]> | { id: string, value: string }[] = (value: string) => {
        let promise: Promise<{ id: string, value: string }[]> = new Promise((resolve, reject) => {
            setLoading(true);
            setTimeout(() => {
                if (value != "") {
                    let results = data.filter(d => d.value.toLowerCase().includes(value.toLowerCase()) && !dataC.some(el => el.id === d.id) && !recent.some(el => el === d.id))
                    resolve(results);
                    setLoading(false);
                } else { setLoading(false); resolve([]); }
                reject();
            }, 5000);
        });
        return promise;
    };

    const [inputValue, setInputValue] = useState("id1");
    const handleChange = (e: any) => {
        console.log('está siendo', e.target.value);
        setInputValue(e.target.value);
    };

    console.log('render');

    return (
        <form>
            <div className="grid grid-cols-3 gap-4">
                <Input />
                <Choose
                    value={inputValue}
                    onChange={handleChange}
                    recentValues={recent}
                    searchItems={onSearch}
                    getItem={getItem}
                    loading={loading}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    renderItem={renderItem}
                    scale="base" />
                <Search />
            </div>
        </form>
    );
};

export const Error = () => {

    const [inputValue, setInputValue] = useState("id1");

    const handleChange = (e: any) => {
        console.log('está siendo', e.target.value);
        setInputValue(e.target.value);
    };

    console.log('render');
    return (
        <form>
            <div className="grid grid-cols-3 gap-4">
                <Input />
                <Choose
                    value={inputValue}
                    onChange={handleChange}
                    recentValues={recent}
                    searchItems={onSearch}
                    getItem={getItem}
                    error="error searching items"
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    renderItem={renderItem}
                    scale="base" />
                <Search />
            </div>
        </form>
    );
};

export const Creatable = () => {

    const ref = useRef<any>();
    const [dataC, setData] = useState(data);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('termino siendo', ref.current.value);
    };

    const renderCreateItem = (q: string) => {
        return (
            <Button secondary scale="base" className="block w-full">
                Crear etiqueta {q}
            </Button>
        );
    }

    const onCreate: (value: string) => T | Promise<T> = (value: string) => {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            let results = _.concat(dataC, { id: value, value: value });
            if (results instanceof Array) {
                setData(results);
                console.log("results ", results)
                resolve(_.find(results, (item) => item.id == value));
            } else {
                reject();
            }
        });
        return promise;
    };

    console.log('render creatable', dataC);
    return (
        <form onSubmit={handleSubmit} >
            <div className="grid grid-cols-3 gap-4">
                <Input type="text" />
                <Choose
                    defaultValue="id1"
                    ref={ref}
                    recentValues={recent}
                    items={dataC}
                    renderItem={renderItem}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    creatable={true}
                    renderCreateItem={renderCreateItem}
                    onCreate={onCreate}
                    scale="base" />
                <Search />
            </div>
            {/* <button type="submit" >enviar</button> */}
        </form>
    );

};

export const ChooseAvatar = () => {

    const [inputValue, setInputValue] = useState("id1");
    const handleChange = (e: any) => {
        console.log('está siendo', e.target.value);
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('termino siendo', inputValue);
    };

    const renderItemAvatar = (item) => {
        return(
        <div>
            <Avatar initials={item.id} color="green" scale="sm" className="mr-0.5" />
            <span>{item.value}</span>
        </div>
        )
    };


    console.log('render');
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
                <Input />
                <Choose
                    value={inputValue}
                    onChange={handleChange}
                    recentValues={recent}
                    items={data}
                    renderItem={renderItemAvatar}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    scale="base" />

                <Search />
            </div>
            {/* <button type="submit" >enviar</button> */}
        </form>
    );

};

export const DataNotNull = () => {

    const [inputValue, setInputValue] = useState("id1");
    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
                <Input />
                <Choose
                    value={inputValue}
                    onChange={handleChange}
                    recentValues={recent}
                    items={data}
                    renderItem={renderItem}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    scale="base" />

                <Search />
            </div>
            {/* <button type="submit" >enviar</button> */}
        </form>
    );

};

export const Inline = () => {

    const [inputValue, setInputValue] = useState("id1");
    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
        
            <div className="">
                <span>Texto primero</span>
        
                <Choose
                    inline
                    value={inputValue}
                    onChange={handleChange}
                    recentValues={recent}
                    items={data}
                    renderItem={renderItem}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    scale="base" />
                <span>Texto después</span>
            </div>
        
    );

};