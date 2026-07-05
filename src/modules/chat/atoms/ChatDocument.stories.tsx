import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoundingBoxSpacing as BoundingBoxSpacingCheck } from '../../../stories/utilities/BoundingBoxSpacing';
import { centered } from '../stories/decorators';
import { ChatDocument } from './ChatDocument';


const meta = {
    title: 'Chat/Atoms/ChatDocument',
    component: ChatDocument,
    decorators: [centered],
    tags: ['autodocs']
} satisfies Meta<typeof ChatDocument>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Downloadable: Story = {
    args: {
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        filename: 'animation-spec.pdf',
        size: 1048576
    }
};

export const BoundingBoxSpacing: Story = {
    args: {
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        filename: 'animation-spec.pdf',
        size: 1048576
    },
    render: () => (
        <BoundingBoxSpacingCheck>
            <ChatDocument
                url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                filename="animation-spec.pdf"
                size={1048576}
            />
        </BoundingBoxSpacingCheck>
    )
};

export const WithoutUrl: Story = {
    args: {
        filename: 'animation-spec.pdf',
        size: 1048576
    }
};
