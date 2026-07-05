import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { deletedMessage, withReactions } from '../stories/messages';
import { StoryChatProvider } from '../stories/StoryChatProvider';
import type { MessageOption } from '../types/MessageOption';
import { MessageProvider } from './MessageProvider';
import { MessageOptions } from './MessageOptions';


// Viewer options — operations the viewer performs ON a message (reply/copy/forward/
// delete), declared as DATA and rendered by one opinionated overflow menu. Rendered =
// requested ∩ permitted (capabilities) ∩ applicable (`applies`). In the timeline this
// menu is a hover overlay at the bubble's top-right; here it is mounted directly. §7.

const meta = {
    title: 'Chat/Message/Options',
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function OptionsCard() {
    return (
        <div className="p-4 rounded-lg bg-gray-50">
            <MessageOptions />
        </div>
    );
}

// The default sample set (reply / copy / forward / delete). Click the dots.
export const Menu: Story = {
    render: () => (
        <StoryChatProvider>
            <MessageProvider message={withReactions}>
                <OptionsCard />
            </MessageProvider>
        </StoryChatProvider>
    )
};

// Capability gating: the option set declares required capabilities; only those in the
// scope's `capabilities` render. Here only reply + copy are permitted.
const gatedOptions: MessageOption[] = [
    { type: 'reply', placement: 'menu', capability: 'send-reply', resolve: (message) => ({ label: 'Reply', onSelect: () => action('reply')(message.id) }) },
    { type: 'copy', placement: 'menu', resolve: (message) => ({ label: 'Copy', onSelect: () => action('copy')(message.id) }) },
    { type: 'forward', placement: 'menu', capability: 'send-forward', resolve: (message) => ({ label: 'Forward', onSelect: () => action('forward')(message.id) }) },
    { type: 'delete', placement: 'menu', capability: 'delete-message', resolve: (message) => ({ label: 'Delete', onSelect: () => action('delete')(message.id) }) }
];

export const CapabilityGated: Story = {
    render: () => (
        <StoryChatProvider messageOptions={gatedOptions} capabilities={new Set(['send-reply'])}>
            <MessageProvider message={withReactions}>
                <OptionsCard />
            </MessageProvider>
        </StoryChatProvider>
    )
};

// `applies` gating: the default options exclude deleted messages, so a tombstone shows
// NO menu at all (the component renders nothing).
export const NoMenuOnTombstone: Story = {
    render: () => (
        <StoryChatProvider>
            <MessageProvider message={deletedMessage}>
                <div className="p-4 rounded-lg bg-gray-50 text-sm text-gray-500">
                    (a tombstone resolves to zero applicable options → no menu)
                    <MessageOptions />
                </div>
            </MessageProvider>
        </StoryChatProvider>
    )
};
