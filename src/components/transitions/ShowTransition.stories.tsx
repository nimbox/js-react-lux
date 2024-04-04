import type { Meta, StoryObj } from '@storybook/react';
import classnames from 'classnames';
import { ShowTransition } from './ShowTransition';


// Definition

const meta: Meta<typeof ShowTransition> = {
    component: ShowTransition,
    parameters: {
        layout: 'centered'
    }
};


export default meta;
type Story = StoryObj<typeof ShowTransition>;

// Template

const ShowTransitionTemplate: Story = {
    render: ({ show, mountClassName, showClassName, unmountClassName }) => {
        return (
            <div className="relative w-96 h-96 bg-red-100 flex flex-row justify-center items-center">
                <ShowTransition
                    show={show}
                    className={classnames(
                        'w-32 h-32 bg-blue-100',
                        'transform-gpu',
                        'transition-all duration-700 ease-in-out'
                    )}
                    mountClassName={mountClassName}
                    showClassName={showClassName}
                    unmountClassName={unmountClassName}
                >
                    Element
                </ShowTransition>
            </div>
        );
    },
    args: {
        show: false,
        showClassName: 'block'
    }
};

// Stories

export const Primary: Story = {
    ...ShowTransitionTemplate,
    args: {
        show: false,
        mountClassName: 'translate-x-full',
        showClassName: 'translate-0 bg-green-100',
        unmountClassName: 'translate-x-full bg-yellow-100'
    }
};

export const SlideLeftRigh: Story = {
    ...ShowTransitionTemplate,
    args: {
        show: false,
        mountClassName: 'translate-x-full',
        showClassName: 'translate-0'
    }
};

export const SlideLeftDown: Story = {
    ...ShowTransitionTemplate,
    args: {
        show: false,
        mountClassName: 'translate-x-full',
        showClassName: 'translate-0',
        unmountClassName: 'translate-y-full'
    }
};

export const Rotate180: Story = {
    ...ShowTransitionTemplate,
    args: {
        show: false,
        mountClassName: 'origin-bottom-right rotate-180',
        showClassName: 'origin-bottom-right rotate-0',
        unmountClassName: 'origin-bottom-right -rotate-180'
    }
};
