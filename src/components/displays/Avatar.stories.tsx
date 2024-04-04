import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { CalendarIcon, FullCircleIcon, FullSquareIcon } from '../../icons/components';


// Definition

const meta: Meta<typeof Avatar> = {
    component: Avatar,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Templates

const AvatarTemplate: Story = {
    render: (args) => {
        return (
            <span><Avatar {...args}>KE</Avatar><span className="ml-2">Katnis Everdeen</span></span>
        );
    }
};

// Story

export const Primary: Story = {
    ...AvatarTemplate,
    args: {
        color: '#ecf0f1',
        backgroundColor: '#e74c3c'
    }
};

export const OneColor: Story = {
    render: () => (
        <div>
            <div><Avatar color="#e74c3c">KE</Avatar>&nbsp;Katniss Everdeen</div>
            <div><Avatar color="#f1c40f">KE</Avatar>&nbsp;Katniss Everdeen</div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'If only one color is provided it is assumed to be the background color and the foreground color is choosen as white or black depending on the luminosity of the background.'
            }
        }
    }
};

export const Image: Story = {
    render: () => (
        <div>
            <span><Avatar color="#ecf0f1" backgroundColor="#e74c3c" src="https://nimbox.com/wp-content/uploads/2021/02/person-04.jpg">KE</Avatar>&nbsp;Katniss Everdeeen</span>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'If an image is provided then the initials, color and background color are ommitted. And the image is placed instead.'
            }
        }
    }
};

export const Icon: Story = {
    render: () => (
        <div>
            <span><Avatar color="#e74c3c"><CalendarIcon /></Avatar>&nbsp;Katniss Everdeen</span>
            <span><Avatar color="#f1c40f"><FullSquareIcon /></Avatar>&nbsp;Katniss Everdeen</span>
            <span className="text-4xl"><Avatar color="#8e44ad"><FullCircleIcon /></Avatar>&nbsp;Katniss Everdeen</span>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Icons can also be used'
            }
        }
    }
};

export const Anchors: Story = {
    render: () => (
        <div>
            <a href="#"><Avatar color="#ecf0f1" backgroundColor="#e74c3c" className="hover:underline">KE</Avatar>&nbsp;Katniss Everdeen</a>
            <a href="#" className="hover:underline"><Avatar color="#ecf0f1" backgroundColor="#e74c3c" src="https://nimbox.com/wp-content/uploads/2021/02/person-04.jpg">KE</Avatar>&nbsp;Katniss Everdeen</a>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'To use as a link wrap the `Avatar` inside an `a` tag so that the image can be clicked also.'
            }
        }
    }
};

export const Sizes: Story = {
    render: () => (
        <div className="space-x-1">
            <span className="text-xs">
                <Avatar color="#ecf0f1" backgroundColor="#e74c3c" src="https://nimbox.com/wp-content/uploads/2021/02/person-04.jpg" />
                <Avatar color="#ecf0f1" backgroundColor="#e74c3c">KE</Avatar>&nbsp;Katniss
            </span>
            <span className="text-sm">
                <Avatar color="#ecf0f1" backgroundColor="#e74c3c" src="https://nimbox.com/wp-content/uploads/2021/02/person-04.jpg" />
                <Avatar color="#ecf0f1" backgroundColor="#e74c3c">KE</Avatar>&nbsp;Katniss
            </span>
            <span className="">
                <Avatar color="#ecf0f1" backgroundColor="#e74c3c" src="https://nimbox.com/wp-content/uploads/2021/02/person-04.jpg" />
                <Avatar color="#ecf0f1" backgroundColor="#e74c3c">KE</Avatar>&nbsp;Katniss
            </span>
            <span className="text-lg">
                <Avatar color="#ecf0f1" backgroundColor="#e74c3c" src="https://nimbox.com/wp-content/uploads/2021/02/person-04.jpg" />
                <Avatar color="#ecf0f1" backgroundColor="#e74c3c">KE</Avatar>&nbsp;Katniss
            </span>
            <span className="text-5xl">
                <Avatar color="#ecf0f1" backgroundColor="#e74c3c" src="https://nimbox.com/wp-content/uploads/2021/02/person-04.jpg" />
                <Avatar color="#ecf0f1" backgroundColor="#e74c3c">KE</Avatar>&nbsp;Katniss
            </span>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The size changes based on the size of the text in the container'
            }
        }
    }
};

export const SizesByContainer: Story = {
    render: () => (
        <div>
            <div className="text-xs bg-gray-200"><Avatar initials="KE" color="#ecf0f1" backgroundColor="#e74c3c">KE</Avatar>&nbsp;Katniss Everdeen</div>
            <div>&nbsp;</div>
            <div className="text-sm bg-gray-200"><Avatar initials="KE" color="#ecf0f1" backgroundColor="#e74c3c">KE</Avatar>&nbsp;Katniss Everdeen</div>
            <div>&nbsp;</div>
            <div className="bg-gray-200"><Avatar initials="KE" color="#ecf0f1" backgroundColor="#e74c3c">KE</Avatar>&nbsp;Katniss Everdeen</div>
            <div>&nbsp;</div>
            <div className="text-lg bg-gray-200"><Avatar initials="KE" color="#ecf0f1" backgroundColor="#e74c3c">KE</Avatar>&nbsp;Katniss Everdeen</div>
            <div>&nbsp;</div>
            <div className="text-4xl bg-gray-200"><Avatar initials="KE" color="#ecf0f1" backgroundColor="#e74c3c">KE</Avatar>&nbsp;Katniss Everdeen</div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The size changes based on the size of the text in the container.'
            }
        }
    }
};

export const MultipleWithPositiveSpace: Story = {
    render: () => (
        <div>
            <div className="space-x-2">
                <Avatar color="#27ae60">KE</Avatar>
                <Avatar color="#2980b9">RM</Avatar>
                <Avatar color="#f39c12">JM</Avatar>
                <Avatar color="#8e44ad">KA</Avatar>
                <Avatar color="#c0392b">PH</Avatar>
            </div>
            <div className="space-x-2">
                <Avatar color="#27ae60" src="https://nimbox.com/wp-content/uploads/2021/02/person-03.jpg" />
                <Avatar color="#2980b9" src="https://nimbox.com/wp-content/uploads/2021/02/person-04.jpg" />
                <Avatar color="#f39c12" src="https://nimbox.com/wp-content/uploads/2021/02/person-05.jpg" />
                <Avatar color="#8e44ad" src="https://nimbox.com/wp-content/uploads/2021/02/person-06.jpg" />
                <Avatar color="#c0392b" src="https://nimbox.com/wp-content/uploads/2021/02/person-03.jpg" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showing multiple avatars without names is possible but you need to control the spacing.'
            }
        }
    }
};

export const MultipleWithNegativeSpace: Story = {
    render: () => (
        <div>
            <div>
                <div className="-space-x-2">
                    <Avatar color="#27ae60">KE</Avatar>
                    <Avatar color="#2980b9">RM</Avatar>
                    <Avatar color="#f39c12">JM</Avatar>
                    <Avatar color="#8e44ad">KA</Avatar>
                    <Avatar color="#c0392b">PH</Avatar>
                </div>
                <div className="-space-x-2">
                    <Avatar color="#27ae60" src="https://nimbox.com/wp-content/uploads/2021/02/person-03.jpg" />
                    <Avatar color="#2980b9" src="https://nimbox.com/wp-content/uploads/2021/02/person-04.jpg" />
                    <Avatar color="#f39c12" src="https://nimbox.com/wp-content/uploads/2021/02/person-05.jpg" />
                    <Avatar color="#8e44ad" src="https://nimbox.com/wp-content/uploads/2021/02/person-06.jpg" />
                    <Avatar color="#c0392b" src="https://nimbox.com/wp-content/uploads/2021/02/person-03.jpg" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showing multiple avatars without names is possible but you need to control the spacing.'
            }
        }
    }
};
