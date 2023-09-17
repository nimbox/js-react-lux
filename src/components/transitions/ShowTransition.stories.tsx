/* eslint-disable import/no-anonymous-default-export */
import { Story } from '@storybook/react';
import { ShowTransition, ShowTransitionProps } from './ShowTransition';
import classnames from 'classnames';
import React from 'react';


// definition

export default {
    title: 'Component/Transitions/ShowTransition',
    component: ShowTransition,
    parameters: {
        layout: 'centered'
    }
};

// stories

const Template: Story<ShowTransitionProps> = ({ show, mountClassName, showClassName, unmountClassName, }) => {

    return (
        <div className="relative w-96 h-96 bg-red-100 flex flex-row justify-center items-center">
            <ShowTransition
                show={show}
                className={classnames(
                    'w-32 h-32 bg-blue-100',
                    'transform-gpu',
                    'transition duration-700 ease-in-out transition-transform'
                )}
                mountClassName={mountClassName}
                showClassName={showClassName}
                unmountClassName={unmountClassName}
            >
                Element
            </ShowTransition>
        </div>
    );

};

export const Base = Template.bind({});

export const SlideLeftRigh = Template.bind({});
SlideLeftRigh.args = {
    show: false,
    mountClassName: 'translate-x-full',
    showClassName: 'translate-0',
};

export const SlideLeftDown = Template.bind({});
SlideLeftDown.args = {
    show: false,
    mountClassName: 'translate-x-full',
    showClassName: 'translate-0',
    unmountClassName: 'translate-y-full',
};

export const Rotate180 = Template.bind({});
Rotate180.args = {
    show: false,
    mountClassName: 'origin-bottom-right rotate-180',
    showClassName: 'origin-bottom-right rotate-0',
    unmountClassName: 'origin-bottom-right -rotate-180',
};
