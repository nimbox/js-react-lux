/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import * as icons from '../icons';
import '../index.css';


export default {
    title: 'Icons',
    decorators: [
        (story: () => React.ReactNode) => <div className="h-full p-4 bg-green-100"><div className="bg-white">{story()}</div></div>
    ]
};


const Tile: React.FC<{ icon: string, className?: string }> = ({ icon, className }) => {
    const Icon = icons[icon];
    return (
        <div className="text-center">
            <div className="h-32 flex flex-row justify-center items-center">
                <Icon className={className} />
            </div>
            <div >{icon}</div>
        </div>
    );
}


export const Simple = () => {

    return (

        <div>

            <div className="mb-10">
                <h1 className="text-xl mb-2">Stroke 1</h1>
                <div className="grid grid-cols-8 gap-4">
                    {Object.keys(icons).sort().map((i) =>
                        <Tile icon={i} className="w-5 h-5 stroke-current stroke-1" />
                    )}
                </div>
            </div>

            <div className="mb-10">
                <h1 className="text-xl mb-2">Stroke 2</h1>
                <div className="grid grid-cols-8 gap-4">
                    {Object.keys(icons).sort().map((i) =>
                        <Tile icon={i} className="w-5 h-5 stroke-current stroke-2" />
                    )}
                </div>
            </div>

            <div className="mb-10">
                <h1 className="text-xl mb-2">Red Stroke 1</h1>
                <div className="grid grid-cols-8 gap-4">
                    {Object.keys(icons).sort().map((i) =>
                        <Tile icon={i} className="w-5 h-5 stroke-current stroke-1 text-red-500" />
                    )}
                </div>
            </div>

            <div className="mb-10">
                <h1 className="text-xl mb-2">Red Stroke 2</h1>
                <div className="grid grid-cols-8 gap-4">
                    {Object.keys(icons).sort().map((i) =>
                        <Tile icon={i} className="w-5 h-5 stroke-current stroke-2 text-red-500" />
                    )}
                </div>
            </div>

            <div className="mb-10">
                <h1 className="text-xl mb-2">Stroke 1</h1>
                <div className="grid grid-cols-8 gap-4">
                    {Object.keys(icons).sort().map((i) =>
                        <Tile icon={i} className="w-10 h-10 stroke-current stroke-1" />
                    )}
                </div>
            </div>

            <div className="mb-10">
                <h1 className="text-xl mb-2">Stroke 2</h1>
                <div className="grid grid-cols-8 gap-4">
                    {Object.keys(icons).sort().map((i) =>
                        <Tile icon={i} className="w-10 h-10 stroke-current stroke-2" />
                    )}
                </div>
            </div>

            <div className="mb-10">
                <h1 className="text-2xl">Red Large Stroke 1</h1>
                <div className="grid grid-cols-8 gap-4">
                    {Object.keys(icons).sort().map((i) =>
                        <Tile icon={i} className="w-10 h-10 stroke-current stroke-1 text-red-500" />
                    )}
                </div>
            </div>

            <div className="">
                <h1 className="text-2xl mt-10">Red Large Stroke 2</h1>
                <div className="grid grid-cols-8 gap-4">
                    {Object.keys(icons).sort().map((i) =>
                        <Tile icon={i} className="w-10 h-10 stroke-current stroke-2 text-red-500" />
                    )}
                </div>
            </div>

            <div className="">
                <h1 className="text-2xl mt-10">Red Large Stroke 2</h1>
                <div className="grid grid-cols-8 gap-4">
                    {Object.keys(icons).sort().map((i) =>
                        <Tile icon={i} className="w-10 h-10 fill-current stroke-1 text-red-500" />
                    )}
                </div>
            </div>

        </div>
    );

};


export const SideBySide = () => {

    return (
        <div>
            <icons.CalendarIcon className="inline-block"/><icons.ClockIcon className="inline-block"/>
        </div>
    );
}
