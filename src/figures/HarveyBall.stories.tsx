import type { Meta, StoryObj } from '@storybook/react';
import { HarveyBall } from './HarveyBall';


// Definition

const meta: Meta<typeof HarveyBall> = {
    component: HarveyBall
};

export default meta;
type Story = StoryObj<typeof HarveyBall>;

// Stories

export const Primary: Story = {
    render: (args) => (
        <div>
            Hola this is
            <HarveyBall {...args}>
                <div className="w-full h-full flex flex-col justify-center items-center text-gray-700 text-sm">10</div>
            </HarveyBall>
        </div>),
    args: {
        cover: 25,
        color: 'red',
        backgroundColor: 'orange',
        foreignClassName: 'w-full h-full',
        className: 'inline-block text-5xl'
    }
};
