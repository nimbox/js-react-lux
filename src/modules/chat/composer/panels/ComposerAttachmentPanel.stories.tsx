import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { action } from 'storybook/actions';
import background from '../../assets/chat-background.png';
import { DockedMessageComposer } from '../DockedMessageComposer';
import { ComposerAttachmentPanel, type ComposerAttachmentPanelProps } from './ComposerAttachmentPanel';


// Definition

const meta: Meta<typeof ComposerAttachmentPanel> = {
    component: ComposerAttachmentPanel,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="relative min-w-96 h-[640px] bg-chat-message-list-bg">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${background})` }} />
                <DockedMessageComposer className="p-8" onSubmit={function (): Promise<void> {
                    throw new Error('Function not implemented.');
                }}>
                    <Story />
                </DockedMessageComposer>
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof ComposerAttachmentPanel>;

// Template

function Template(props: Pick<ComposerAttachmentPanelProps, 'type'>) {

    const { type } = props;
    const [attachments, setAttachments] = useState<{ file: File; caption?: string }[]>([]);

    return (
        <ComposerAttachmentPanel

            type={type}

            attachments={attachments}
            onAttachmentsChange={setAttachments}

            onClose={() => { action('onClose')() }}
            onSubmit={async (data) => { action('onSubmit')(data) }}

        />
    );

}


// Stories

export const Image: Story = {
    render: (props) => <Template {...props} />,
    args: {
        type: 'image'
    }
};

export const Document: Story = {
    render: (props) => <Template {...props} />,
    args: {
        type: 'document'
    }
};
