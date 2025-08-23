import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { DirectoryIcon, EditIcon, ForwardIcon, GearIcon, LogoutIcon, TrashIcon } from '../../icons/components';
import { AngleDownMenuTrigger } from './ChevronMenuTrigger';
import { Menu } from './Menu';


// Definition

const meta = {
    title: 'Components/Menu',
    component: Menu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        withArrow: { control: 'boolean' },
        withPlacement: { control: 'select', options: ['top-start', 'top-end', 'bottom-start', 'bottom-end'] }
    }
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof Menu>;

// Stories

export const Default: Story = {
    render: (props) => (
        <Menu {...props}>
            <Menu.Item icon={<EditIcon />} label="Edit" onClick={action('edit-clicked')} />
            <Menu.Item icon={<DirectoryIcon />} label="Copy" onClick={action('copy-clicked')} />
            <Menu.Item icon={<ForwardIcon />} label="Share" onClick={action('share-clicked')} />
            <Menu.Item icon={<TrashIcon />} label="Delete" onClick={action('delete-clicked')} />
            <Menu.Divider />
            <Menu.Item icon={<GearIcon />} label="Settings" onClick={action('settings-clicked')} />
            <Menu.Item icon={<LogoutIcon />} label="Logout" onClick={action('logout-clicked')} />
        </Menu>
    ),
    args: {
        trigger: <AngleDownMenuTrigger />
    }
};

export const WithPlacement: Story = {
    ...Default,
    args: {
        ...Default.args,
        withPlacement: 'top-end'
    }
};

export const WithArrow: Story = {
    ...Default,
    args: {
        ...Default.args,
        withArrow: true
    }
};
