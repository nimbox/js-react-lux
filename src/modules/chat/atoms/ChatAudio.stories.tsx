import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoundingBoxSpacing as BoundingBoxSpacingCheck } from '../../../stories/utilities/BoundingBoxSpacing';
import { centered } from '../stories/decorators';
import { VOICE_AUDIO } from '../stories/media';
import { ChatAudio } from './ChatAudio';


const meta = {
    title: 'Chat/Atoms/ChatAudio',
    component: ChatAudio,
    decorators: [centered],
    tags: ['autodocs']
} satisfies Meta<typeof ChatAudio>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Default: Story = {
    args: {
        url: VOICE_AUDIO,
        size: 123456
    }
};

export const BoundingBoxSpacing: Story = {
    args: { url: VOICE_AUDIO, size: 123456 },
    render: () => (
        <BoundingBoxSpacingCheck>
            <ChatAudio url={VOICE_AUDIO} size={123456} />
        </BoundingBoxSpacingCheck>
    )
};
