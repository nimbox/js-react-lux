import type { Meta, StoryObj } from '@storybook/react-vite';
import { withReactionsInbound } from '../stories/messages';
import { StoryChatProvider } from '../stories/StoryChatProvider';
import type { ReactionDetail } from '../types/ReactionDetail';
import { MessageProvider } from './MessageProvider';
import { MessageReactionDetails } from './MessageReactionDetails';
import { MessageReactionPicker } from './MessageReactionPicker';
import { MessageReactionsCluster } from './MessageReactionsCluster';
import { MessageReactionsExpanded } from './MessageReactionsExpanded';


// Frame chrome — auto-mounted by `MessageFrame`, NOT slots (§6).
// The envelope carries author-free PILLS; the who-reacted DETAILS load lazily via
// `getReactionDetails`. These stories mount the pieces directly inside a
// `MessageProvider` (the context the timeline's dispatch layer supplies) to show each
// in isolation. The reactions come from the `withReactionsInbound` fixture.

const meta = {
    title: 'Chat/Message/Reactions',
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// The default form: all emojis in ONE clustered pill + total. Click it for the
// unfiltered who-reacted popover. Highlighted = the viewer reacted with something.
export const Cluster: Story = {
    render: () => (
        <StoryChatProvider>
            <MessageProvider message={withReactionsInbound}>
                <MessageReactionsCluster />
            </MessageProvider>
        </StoryChatProvider>
    )
};

// The alternative form: one chip per emoji, each with its own count and popover
// (filtered to that emoji).
export const Expanded: Story = {
    render: () => (
        <StoryChatProvider>
            <MessageProvider message={withReactionsInbound}>
                <MessageReactionsExpanded />
            </MessageProvider>
        </StoryChatProvider>
    )
};

// The add-reaction affordance — separate always-on chrome, present when
// `onCreateReaction` is supplied (NOT a menu option). It reveals on hover of the row
// `group`; hover the frame below to show it, then click for the emoji picker.
export const Picker: Story = {
    render: () => (
        <StoryChatProvider>
            <MessageProvider message={withReactionsInbound}>
                <div className="group inline-flex items-center gap-3 p-6 rounded-lg bg-gray-50">
                    <span className="text-sm text-gray-500">Hover here →</span>
                    <MessageReactionPicker />
                </div>
            </MessageProvider>
        </StoryChatProvider>
    )
};

// The who-reacted popover (`MessageReactionDetails`) — one row per reactor: author name
// + the emoji they used. The viewer's own row (`removable`) offers a "click to remove".
export const DetailsLoaded: Story = {
    render: () => (
        <StoryChatProvider>
            <MessageProvider message={withReactionsInbound}>
                <DetailsCard />
            </MessageProvider>
        </StoryChatProvider>
    )
};

// While the lazy fetch is in flight.
export const DetailsLoading: Story = {
    render: () => (
        <StoryChatProvider getReactionDetails={() => new Promise<ReactionDetail[]>(() => { })}>
            <MessageProvider message={withReactionsInbound}>
                <DetailsCard />
            </MessageProvider>
        </StoryChatProvider>
    )
};

// No reactors returned.
export const DetailsEmpty: Story = {
    render: () => (
        <StoryChatProvider getReactionDetails={async () => []}>
            <MessageProvider message={withReactionsInbound}>
                <DetailsCard />
            </MessageProvider>
        </StoryChatProvider>
    )
};

// The fetch rejected.
export const DetailsError: Story = {
    render: () => (
        <StoryChatProvider getReactionDetails={async () => { throw new Error('Failed to load reactions'); }}>
            <MessageProvider message={withReactionsInbound}>
                <DetailsCard />
            </MessageProvider>
        </StoryChatProvider>
    )
};

function DetailsCard() {
    return (
        <div className="inline-block rounded border border-control-border bg-white">
            <MessageReactionDetails />
        </div>
    );
}
