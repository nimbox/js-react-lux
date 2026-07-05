import type { Meta, StoryObj } from '@storybook/react-vite';
import { centered } from '../stories/decorators';
import { ChatDocument } from './ChatDocument';


// A download tile from a resolved `url` / `filename` / `size`. With no `url` it renders
// a plain (non-link) tile.

const meta = {
    title: 'Chat/Atoms/ChatDocument',
    component: ChatDocument,
    decorators: [centered],
    tags: ['autodocs']
} satisfies Meta<typeof ChatDocument>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Downloadable: Story = {
    args: {
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        filename: 'animation-spec.pdf',
        size: 1048576
    }
};

export const WithoutUrl: Story = {
    args: {
        filename: 'animation-spec.pdf',
        size: 1048576
    }
};
