import { action } from '@storybook/addon-actions';
import _ from 'lodash';
import React, { FC, useRef, useState } from 'react';
import { Button, Input } from '..';
import { MockStore } from '../utils/MockStore';
import { Avatar } from './Avatar';
import { Choose } from './Choose';
import { SearchInput } from './controls/SearchInput';


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


// store 

const unique = () => _.uniqueId('newid');

interface StoryChoose {
    id: string;
    description: string;
}

//const recent = ['id1', 'id5', 'id2', 'id3', 'id4', 'id22', 'id6', 'id7', 'id8', 'id9', 'id0', 'id11'];
const recent = ['id1', 'id5', 'id2'];

const store = new MockStore<StoryChoose>([
    { id: 'id1', description: 'Karla Alzuro' },
    { id: 'id2', description: 'Jonatan Meza' },
    { id: 'id3', description: 'Ricardo Marimon' },
    { id: 'id4', description: 'Juan Castellanos' },
    { id: 'id5', description: 'Samantha Vegas' },
    { id: 'id6', description: 'Esteban Torres' },
    { id: 'id7', description: 'Patricia Hernandez' },
    { id: 'id8', description: 'Luis Lara' },
    { id: 'id9', description: 'Katryn Alvarez' },
    { id: 'id0', description: 'Andrea Figueira' },
    { id: 'id11', description: 'Maria Gonzalez' },
    { id: 'id22', description: 'Meibel Granadofkefkenfkwe kncknwelkcnweknv wekcnweknckwne' }
],
    (value: string) => (item: StoryChoose) => item.id === value,
    (q: string) => {
        const lowerq = q.toLowerCase();
        return (item: StoryChoose) => item.description.toLowerCase().includes(lowerq) && !recent?.some(el => el === item.id);
    }
);


// functions 

const itemMatch = (q: string, item: StoryChoose) => {
    return item.description.toLowerCase().includes(q.toLowerCase())
}

const renderItem = (item: StoryChoose) => item.description;
const itemValue = (item: StoryChoose) => item.id;
const getItem = (value: string) => store.get(value);



export const Controlled = () => {

    const [inputValue, setInputValue] = useState('id1');
    const handleChange = (e: any) => {
        action('changeSearchString')(e.target.value);
        console.log('está siendo', e.target.value);
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: any) => {
        action('handleSubmit')(inputValue);
        e.preventDefault();
        console.log('termino siendo', inputValue);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
                <Input />
                <Choose
                    value={inputValue}
                    onChange={handleChange}
                    recentValues={recent}
                    items={store.items}
                    getItem={getItem}
                    renderItem={renderItem}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    scale="base" />

                <SearchInput />
            </div>
            <Button className="mt-2" type="submit" >enviar</Button>
        </form>
    );

};


export const UnControlled = () => {

    const ref = useRef<any>();

    const handleSubmit = (e: any) => {
        action('handleSubmit')(ref.current.value);
        e.preventDefault();
        console.log('termino siendo', ref.current.value);
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="grid grid-cols-3 gap-4">
                <Input type="text" />
                <Choose
                    defaultValue="id1"
                    ref={ref}
                    recentValues={recent}
                    items={store.items}
                    getItem={getItem}
                    renderItem={renderItem}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    scale="base" />
                <SearchInput />
            </div>
            <Button className="mt-2" type="submit" >enviar</Button>
        </form>
    );

};

export const Loading = () => {

    const [inputValue, setInputValue] = useState('id1');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (q: string) => {
        action('handleSearch')(q);
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setLoading(false);
        const result = await store.search(q, 0);
        return result;
    };
    
    const handleChange = (e: any) => {
        action('changeSearchString')(e.target.value);
        console.log('está siendo', e.target.value);
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: any) => {
        action('handleSubmit')(inputValue);
        e.preventDefault();
        console.log('termino siendo', inputValue);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
                <Input />
                <Choose
                    value={inputValue}
                    onChange={handleChange}
                    recentValues={recent}
                    searchItems={handleSearch}
                    getItem={getItem}
                    loading={loading}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    renderItem={renderItem}
                    scale="base" />
                <SearchInput />
            </div>
            <Button className="mt-2" type="submit" >enviar</Button>
        </form>
    );
};

export const Error = () => {

    const [inputValue, setInputValue] = useState('id1');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        action('changeSearchString')(e.target.value);
        console.log('está siendo', e.target.value);
        setInputValue(e.target.value);
    };

    const handleSearch = async (q: string) => {
        action('handleSearch')(q);
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setLoading(false);
        return store.search(q, 0);
    };

    const handleSubmit = (e: any) => {
        action('handleSubmit')(inputValue);
        e.preventDefault();
        console.log('termino siendo', inputValue);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
                <Input />
                <Choose
                    value={inputValue}
                    onChange={handleChange}
                    recentValues={recent}
                    searchItems={handleSearch}
                    getItem={getItem}
                    error={true}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    renderItem={renderItem}
                    scale="base" />
                <SearchInput />
            </div>
        </form>
    );
};

export const Creatable = () => {

    const [inputValue, setInputValue] = useState('id1');

    const handleChange = (e: any) => {
        action('changeSearchString')(e.target.value);
        console.log('está siendo', e.target.value);
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: any) => {
        action('handleSubmit')(inputValue);
        e.preventDefault();
        console.log('termino siendo', inputValue);
    };

    const handleCreate = async (q: string) => {
        action('handleCreate')(q);
        const item = await store.create({ id: unique(), description: q }, 0);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setInputValue(item.id);  
    };

    const CreateItem: FC<{ search: string; disabled: boolean; onSubmit: (submitting: void | Promise<void>) => void }> = ({ disabled, search, onSubmit }) => {
        return (
            <div className="">
                <Button scale="sm" type="button" disabled={disabled} onClick={() => onSubmit(handleCreate(search))}>
                    Crear {search}
                </Button>
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="grid grid-cols-3 gap-4">
                <Input type="text" />
                <Choose
                    value={inputValue}
                    onChange={handleChange}
                    recentValues={recent}
                    items={store.items}
                    getItem={getItem}
                    renderItem={renderItem}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    creatable
                    CreateComponent={CreateItem}
                    scale="base" />
                <SearchInput />
            </div>
            <Button className="mt-2" type="submit">enviar</Button>
        </form>
    );

};

export const ChooseAvatar = () => {

    const [inputValue, setInputValue] = useState('id1');
    
    const handleChange = (e: any) => {
        action('changeSearchString')(e.target.value);
        console.log('está siendo', e.target.value);
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: any) => {
        action('handleSubmit')(inputValue);
        e.preventDefault();
        console.log('termino siendo', inputValue);
    };

    const renderItemAvatar = (item: StoryChoose) => {
        return (
            <div>
                <Avatar initials={item.id} color="green" scale="sm" className="mr-0.5" />
                <span>{item.description}</span>
            </div>
        )
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
                <Input />
                <Choose
                    value={inputValue}
                    onChange={handleChange}
                    recentValues={recent}
                    items={store.items}
                    getItem={getItem}
                    renderItem={renderItemAvatar}
                    itemValue={itemValue}
                    itemMatch={itemMatch}
                    scale="base" />

                <SearchInput />
            </div>
            <Button className="mt-2" type="submit">enviar</Button>
        </form>
    );
};

export const Inline = () => {

    const [inputValue, setInputValue] = useState('id1');

    const handleChange = (e: any) => {
        action('changeSearchString')(e.target.value);
        console.log('está siendo', e.target.value);
        setInputValue(e.target.value);
    };

    return (
        <div>
            <div>
            <span>Texto primero</span><Choose
                inline
                value={inputValue}
                onChange={handleChange}
                recentValues={recent}
                items={store.items}
                getItem={getItem}
                renderItem={renderItem}
                itemValue={itemValue}
                itemMatch={itemMatch}
                scale="base" /><span>Texto después</span>
            </div>
            <div>
                <span>Texto primero</span>Hola<span>Texto después</span>
            </div>
        </div>
    );

};