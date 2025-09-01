import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { action } from 'storybook/actions';
import { AngleDownMenuTrigger } from '../../../../components/menu/ChevronMenuTrigger';
import { Menu } from '../../../../components/menu/Menu';
import { ForwardIcon, ReplyIcon } from '../../../../icons/components';
import { messages } from '../../data/messages';
import { useMessage } from '../MessageContext';
import { TextMessage } from './TextMessage';
import chatBackground from '../../assets/chat-background.png';

dayjs.extend(calendar);


// Definition

const meta: Meta<typeof TextMessage> = {
    component: TextMessage,
    parameters: {
        layout: 'fullscreen'
    },
    decorators: [
        (Story) => (
            <div className="relative h-screen bg-chat-message-list-bg">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${chatBackground})` }} />
                <Story />
            </div>
        )
    ],
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof TextMessage>;


// Setup


const MessageMenu = () => {

    const { message } = useMessage();

    return (
        <Menu trigger={<AngleDownMenuTrigger />} withPlacement="bottom-end">
            <Menu.Item
                icon={<ReplyIcon />}
                label="Reply"
                onClick={() => action('reply')({ message })}
            />
            <Menu.Item
                icon={<ForwardIcon />}
                label="Forward"
                onClick={() => action('forward')({ message })}
            />
        </Menu>
    );

};

// Stories

export const Default: Story = {
    args: {
        message: messages[0],
        menu: <MessageMenu />
    }
};
