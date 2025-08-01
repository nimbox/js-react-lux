import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { AngleDownMenuTrigger } from '../../../components/menu/ChevronMenuTrigger';
import { Menu } from '../../../components/menu/Menu';
import { EditIcon } from '../../../icons/components';
import { Conversation } from './Conversation';
import { useConversation } from './ConversationContext';


// Definition

const meta: Meta<typeof Conversation> = {
    component: Conversation,
    parameters: {
        layout: 'padded'
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

const ConversationMenu = () => {

    const { conversation } = useConversation();

    return (
        <Menu trigger={<AngleDownMenuTrigger className="hidden group-hover:block" />} withPlacement="bottom-end">
            <Menu.Item
                icon={<EditIcon />}
                label="Edit"
                onClick={() => action('edit')({ conversation })}
            />
        </Menu>
    );

};

export const Default: Story = {
    args: {
        menu: <ConversationMenu />,
        conversation: {
            id: 'conv-1',
            name: 'John Doe',
            avatar: {
                color: 'blue',
                initials: 'JD'
            },
            unread: 10,
            timestamp: new Date().toISOString()
        }
    }
};

export const LongName: Story = {
    args: {
        conversation: {
            id: 'conv-2',
            name: 'This is a very long conversation name that should be truncated when displayed',
            avatar: {
                color: 'green',
                initials: 'VL'
            },
            timestamp: '2024-01-01T00:00:00Z'
        },
        selected: true
    }
};

export const WithAvatar: Story = {
    args: {
        conversation: {
            id: 'conv-3',
            name: 'Jane Smith',
            avatar: {
                color: 'purple',
                initials: 'JS',
                src: 'https://picsum.photos/40/40?random=1',
                alt: 'Jane Smith avatar'
            },
            timestamp: '2024-01-01T00:00:00Z'
        }
    }
};
