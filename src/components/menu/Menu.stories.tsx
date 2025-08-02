import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { EditIcon, FileCopyIcon, ForwardIcon, GearIcon, LogoutIcon, TrashIcon } from '../../icons/components';
import { AngleDownMenuTrigger } from './ChevronMenuTrigger';
import { Menu } from './Menu';


// Definition

const meta: Meta<typeof Menu> = {
    title: 'Components/Menu',
    component: Menu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Menu>;


// Stories

export const Default: Story = {
    render: () => (
        <Menu trigger={<AngleDownMenuTrigger />}>
            <Menu.Item
                icon={<EditIcon />}
                label="Edit"
                onClick={action('edit-clicked')}
            />
            <Menu.Item
                icon={<FileCopyIcon />}
                label="Copy"
                onClick={action('copy-clicked')}
            />
            <Menu.Item
                icon={<ForwardIcon />}
                label="Share"
                onClick={action('share-clicked')}
            />
            <Menu.Item
                icon={<TrashIcon />}
                label="Delete"
                onClick={action('delete-clicked')}
            />
            <Menu.Divider />
            <Menu.Item
                icon={<GearIcon />}
                label="Settings"
                onClick={action('settings-clicked')}
            />
            <Menu.Item
                icon={<LogoutIcon />}
                label="Logout"
                onClick={action('logout-clicked')}
            />
        </Menu>
    )
};