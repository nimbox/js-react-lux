import React, { useState, useRef, FC, useLayoutEffect } from 'react';

const definition = {
    title: 'Sandbox/Ricardo',
};
export default definition;

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
                <span className="max-w-full truncate xtext-4xl">as as alksjd lkasd asd asd asdasjd laksdj laskdj laskdj laskdj alskdj aslkdj djk asldkja sdlkj</span>
            </span>
            <span className="text-5xl">asd asd asd asd asd asd asd
            asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd ads asd
            asd asd asd asd asd asd
            </span>
        </div>
    );

};

