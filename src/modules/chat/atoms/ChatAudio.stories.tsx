import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoundingBox } from '../../../stories/utilities/BoundingBox';
import { centered } from '../stories/decorators';
import { VOICE_AUDIO } from '../stories/media';
import { ChatAudio } from './ChatAudio';


// The chat audio atom: a native `<audio controls>` for a resolved `url` — no
// message data, no provider needed.

const meta = {
    title: 'Chat/Atoms/ChatAudio',
    component: ChatAudio,
    decorators: [centered],
    tags: ['autodocs']
} satisfies Meta<typeof ChatAudio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        url: VOICE_AUDIO,
        size: 123456
    }
};

// Spacing-neutral: `BoundingBox` frames each atom. Left hugs the lines (no
// margin); right adds `m-2`, opening a gap — spacing is the parent's job.
export const Spacing: Story = {
    args: { url: VOICE_AUDIO, size: 123456 },   // ignored by the custom render; satisfies the required-prop meta
    render: () => (
        <div className="flex items-center gap-24 px-12 py-16">
            <BoundingBox>
                <ChatAudio url={VOICE_AUDIO} size={123456} />
            </BoundingBox>
            <BoundingBox>
                <div className="m-2">
                    <ChatAudio url={VOICE_AUDIO} size={123456} />
                </div>
            </BoundingBox>
        </div>
    )
};
