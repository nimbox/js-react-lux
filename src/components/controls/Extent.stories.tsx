/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { Extent } from './Extent';
import { FullSquareIcon } from '../../icons/components';

// definition

export default {
    title: 'Component/Controls/Extent'
};

// Extent is a the new wrapper. A wrapper is a construct that is the base for
// inputs and buttons. It works as a container that can have elements at the left
// or right side of its children.

export const Definition = () => {
    return (
        <div className="space-y-2">

            <div>
                <span className="">XXX</span>
                <div className="inline-block relative border">
                    <div className="inline-block bg-green-400 border -translate-y-1/2" style={{ verticalAlign: 'center' }}><FullSquareIcon className="text-xs bg-red-100" /></div>
                    <div className="inline-block text-xs">Hola</div>
                    <div className="inline-block bg-green-400 border -translate-y-1/2" style={{ verticalAlign: 'center' }}><FullSquareIcon className="text-4xl" /></div>
                </div>
                <span className="text-2xl">XXX</span>
            </div>

            <div>
                <span className="inline-block bg-red-200">XXX</span>
                <div className="inline-flex items-baseline bg-amber-400 p-4">
                    <div className="flex-none self-center bg-green-400"><FullSquareIcon className="text-xs bg-red-100" /></div>
                    <div className="flex-auto text-4xl bg-yellow-500">Hola</div>
                    <div className="flex-none self-center bg-blue-500"><FullSquareIcon className="h-full text-xs" /></div>
                </div>
                <span className="inline-block text-2xl bg-red-200">XXX</span>
            </div>

            <div>
                <span className="inline-block bg-red-200">XXX</span>
                <div className="inline-flex items-baseline bg-amber-400 lux-control-padding rounded">
                    <div className="flex-none self-center bg-green-400"><FullSquareIcon className="text-xs bg-red-100" /></div>
                    <div className="flex-auto text-4xl bg-yellow-500">Hola</div>
                    <div className="flex-none self-stretch bg-blue-500"><div className="">h</div></div>
                </div>
                <span className="inline-block text-2xl bg-red-200">XXX</span>
            </div>

        </div>
    );
};

export const _0Labeled = () => {

    const [labelPositon, setLabelPosition] = useState(true);

    return (
        <div className="bg-red-100">
            <span>X</span>
            <Extent
                variant="outlined"
                label="Color"
                labelPosition={labelPositon ? 'legend' : 'placeholder'}
                start={<FullSquareIcon className="bg-red-100 text-xs mr-4" />}
                className="inline-block"
            >
                <input type="text" className="focus:outline bg-transparent" />
            </Extent>
            <span>X</span>
            <span onClick={() => setLabelPosition(p => !p)}>toggle</span>
        </div>
    );

};

export const _1Plain = () => {
    return (
        <div>
            <span className="text-xs">Before</span>
            <Extent
                variant="plain"
                start={<FullSquareIcon className="bg-red-100 text-xs" />}
                end={<FullSquareIcon className="text-4xl" />}
                className="inline-block border-4 border-lime-500"
            >
                <span className="text-sm bg-blue-100">XXX</span>
            </Extent>
            <span className="text-8xl">After</span>
        </div>
    );
};

export const _2Inlined = () => {
    return (
        <div>
            Before
            <Extent component="span" variant="inlined">
                <span>XXX</span>
            </Extent>
            After
        </div>
    );
};
