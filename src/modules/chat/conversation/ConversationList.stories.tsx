import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { AngleDownMenuTrigger } from '../../../components/menu/ChevronMenuTrigger';
import { Menu } from '../../../components/menu/Menu';
import { EditIcon } from '../../../icons/components';
import { conversations } from '../data/conversations';
import { useConversation } from './ConversationContext';
import { ConversationList } from './ConversationList';
import { buildConversationRows } from './buildConversationRows';
import { DefaultConversation } from './instances/Conversation';


// Definition

const meta: Meta<typeof ConversationList> = {
    component: ConversationList,
    parameters: {
        // layout: 'centered'
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Templates

const ConversationMenu = () => {

    const { conversation } = useConversation();

    return (
        <Menu trigger={<AngleDownMenuTrigger />} withPlacement="bottom-end">
            <Menu.Item
                icon={<EditIcon />}
                label="Edit"
                onClick={() => action('edit')({ conversation })}
            />
        </Menu>
    );

};

const ConversationTemplate = () => {

    const rows = buildConversationRows(conversations);

    return (
        <ConversationList>
            {rows.map(row => {
                switch (row.type) {
                    case 'conversation':
                        return <DefaultConversation key={row.data.id} conversation={row.data} menu={<ConversationMenu />} />;
                    default:
                        return null;
                }
            })}
        </ConversationList>
    );

};

// Stories

export const Default: Story = {
    render: ConversationTemplate
};