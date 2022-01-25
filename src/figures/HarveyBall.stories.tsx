/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { HarveyBall, HarveyBallProps } from './HarveyBall';


// definition

export default {
    title: 'Figures/HarveyBall',
    component: HarveyBall,
};

//  parameterized

export const Default = ({ ...props }: HarveyBallProps) => {
    return (
        <div>
            Hola this is
            <HarveyBall {...props}>
                <div className="w-full h-full flex flex-col justify-center items-center text-gray-700 text-sm">10</div>
            </HarveyBall>
        </div>
    );
};
Default.args = {
    cover: 25,
    color: 'red',
    backgroundColor: 'orange',
    className: 'inline-block text-5xl'
};
