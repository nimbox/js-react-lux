/* eslint-disable import/no-anonymous-default-export */
import React, { FC } from 'react';
import '../index.css';
import * as icons from './components';


export default {
    title: 'Icons',
    decorators: [
        (story: () => React.ReactNode) => <div className="h-full p-4 bg-green-100"><div className="bg-white">{story()}</div></div>
    ]
};

const Tile: FC<{ icon: string, className?: string }> = ({ icon, className }) => {
    const Icon = (icons as any)[icon];
    return (
        <div className="text-center">
            <div className="h-32 flex flex-row justify-center items-center">
                <Icon className={className} />
            </div>
            <div >{icon}</div>
        </div>
    );
};


export const OneRem = () => (
    <div>
        <h1 className="text-xl mb-2">Default</h1>
        <div className="grid grid-cols-8 gap-4">
            {Object.keys(icons).sort().map((i) =>
                <Tile icon={i} className="w-4 h-4" />
            )}
        </div>
    </div>
);

export const TwoRem = () => (
    <div>
        <h1 className="text-xl mb-2">Default</h1>
        <div className="grid grid-cols-8 gap-4">
            {Object.keys(icons).sort().map((i) =>
                <Tile icon={i} className="w-8 h-8" />
            )}
        </div>
    </div>
);

export const ThreeRem = () => (
    <div>
        <h1 className="text-xl mb-2">Default</h1>
        <div className="grid grid-cols-8 gap-4">
            {Object.keys(icons).sort().map((i) =>
                <Tile icon={i} className="w-12 h-12" />
            )}
        </div>
    </div>
);

export const OneRemFilled = () => (
    <div>
        <h1 className="text-xl mb-2">Default</h1>
        <div className="grid grid-cols-8 gap-4">
            {Object.keys(icons).sort().map((i) =>
                <Tile icon={i} className="w-4 h-4 text-red-500" />
            )}
        </div>
    </div>
);

export const TwoRemFilled = () => (
    <div>
        <h1 className="text-xl mb-2">Default</h1>
        <div className="grid grid-cols-8 gap-4">
            {Object.keys(icons).sort().map((i) =>
                <Tile icon={i} className="w-8 h-8 text-red-500" />
            )}
        </div>
    </div>
);

export const ForInputs = () => (
    <div>
        <icons.CalendarIcon className="" /><icons.ClockIcon className="" />
    </div>
);