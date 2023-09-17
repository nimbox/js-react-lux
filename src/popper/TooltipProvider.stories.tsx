/* eslint-disable import/no-anonymous-default-export */
import React from 'react';


// Definition

export default {
    title: 'Component/TooltipProvider',
    parameters: {
        layout: 'centered'
    }
};


// 
// Stories
//

export const Default = () => {

    return (
        <div>

            <div data-tooltip="My first tooltip">Hello</div>
            <div data-tooltip="My second <bold>tooltip</bold>" data-tooltip-placement="bottom">Hello</div>
            <div data-tooltip="Left" data-tooltip-placement="left">Target</div>
            <div data-tooltip="Right" data-tooltip-placement="auto">Target</div>
            <div data-tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." data-tooltip-placement="right">Super long</div>

        </div>
    );

};
