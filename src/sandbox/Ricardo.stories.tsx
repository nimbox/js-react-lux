/* eslint-disable import/no-anonymous-default-export */
import { action } from '@storybook/addon-actions';
import React, { ChangeEvent, useRef, useState } from 'react';
import { Wrapper } from '..';
import { Input } from '../components/controls/Input';
import { Tag } from '../components/Tag';


export default {
    title: 'Sandbox/Ricardo',
    parameters: { layout: 'centered' }
};


export const Inline = () => {

    return (
        <div className="align-baseline">
            <span className="text-2xl">Ricardo</span>
            <span className="inline-block max-w-full truncate" style={{ marginBottom: '-0.4rem' }}>sovery  asd asd asd asd asd asd asdvery longand that needs to truncate</span>
            <span className="text-xl">asd asd asd asd asd asd asd
                asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd ads asd
                asd asd asd asd asd asd
            </span>
        </div>
    );

};

export const InlineFlex = () => {

    return (
        <div className="w-1/2">
            <span className="text-2xl">Ricardo</span>
            <span className="inline-flex flex-row p-1 items-baseline max-w-full bg-red-500">
                <span className="self-center px-2 bg-red-300">x</span>
                <span className="max-w-full truncate text-4xl">as alskdj aslkdj djk asldkja sdlkj</span>
            </span>
            <span className="text-5xl">asd asd asd asd asd asd asd
                asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd ads asd
                asd asd asd asd asd asd
            </span>
        </div>
    );

};


export const Controlled = () => {

    const [name, setName] = useState("Ricardo");
    const handleChange = (e: any) => {
        console.log('está siendo', e.target.value);
        setName(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('termino siendo', name);
    };

    console.log('render');
    return (
        <form onSubmit={handleSubmit}>
            <Input value={name} onChange={handleChange} className="border" />
        </form>
    );

};


export const UnControlled = () => {

    const ref = useRef<any>();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('termino siendo', ref.current.value);
    };

    console.log('render');
    return (
        <form onSubmit={handleSubmit}>
            <Input defaultValue="Ricardo" ref={ref} className="border" />
        </form>
    );

};


export const RemEm = () => {

    return (
        <div>
            <div className="text-xs">Ricardo <span className="text-2xl">2XL</span>
                <span style={{ fontSize: '1em' }}>Ricardo</span>
                <span className="bg-red-200" style={{ padding: '0em', fontSize: '2em' }}>2em</span>
            </div>
            <div className="text-base">Ricardo <span className="text-2xl">2XL</span>
                <span style={{ fontSize: '1em' }}>Ricardo</span>
                <span className="bg-red-200" style={{ padding: '0em', fontSize: '2em' }}>2em</span>
            </div>
            <div className="text-2xl bg-red-100">Ricardo <span className="text-2xl">2XL</span>
                <span style={{ fontSize: '1em' }}>Ricardo</span>
                <span className="bg-red-200" style={{ padding: '0em', fontSize: '2em' }}>2emjÉ</span>
            </div>

            <div>
                <div className="border border-control-border border-rounded text-xs" style={{ padding: '0.25em 0.5em' }}>Base</div>
                <div className="border border-control-border border-rounded text-base" style={{ padding: '0.25em 0.5em' }}>Base</div>
                <div className="border border-control-border border-rounded text-xl" style={{ padding: '0.25em 0.5em' }}>Base</div>
            </div>
        </div>
    );

};

export const MoreRemAndEm = () => {

    return (
        <div>
            <div className="text-xs">
                <span style={{ fontSize: '1em' }}>texto1</span>
                <span style={{ fontSize: '1rem' }}>texto1</span>
            </div>
            <div className="text-xl">
                <span style={{ fontSize: '1em' }}>texto</span>
                <span style={{ fontSize: '1rem' }}>texto</span>
            </div>
        </div>
    );
};

export const UncontrolledAndControlled = () => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }

    return (
        <div>
            <input type="text" defaultValue="Katniss" onChange={handleChange} />
            <button></button>
        </div>
    );

};


export const TagContainer = () => {

    return (
        <div className="w-96">
            <Wrapper className="max-w-full flex flex-row flex-wrap items-center gap-1">
                <Tag className="truncate">Very long text to see if truncation kicks in. Still more text to fill the space.</Tag>
                <Tag className="truncate">Very Short.</Tag>
                <Tag className="truncate">Average size tag.</Tag>
            </Wrapper>
        </div>
    );

}