import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { audioMessage, documentMessage, imageMessage, textOutbound, unknownMessage } from '../stories/messages';
import { StoryChatProvider } from '../stories/StoryChatProvider';
import type { BaseMessage } from '../types/BaseMessage';
import { MessageFrame } from './MessageFrame';
import { MessageProvider } from './MessageProvider';
import { useMessageRenderer } from './useMessageRenderer';


const meta = {
    title: 'Chat/Message/Surfaces',
    tags: ['autodocs'],
    parameters: { layout: 'padded' }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function SurfaceMatrix({ message }: { message: BaseMessage }) {

    const resolveRenderer = useMessageRenderer();
    const Full = resolveRenderer(message, 'full');
    const Preview = resolveRenderer(message, 'preview');
    const Summary = resolveRenderer(message, 'summary');

    return (
        <MessageProvider message={message}>
            <div className="max-w-md flex flex-col gap-8">
                <Surface label="full — timeline bubble">
                    <MessageFrame>
                        <Full message={message} />
                    </MessageFrame>
                </Surface>
                <Surface label="preview — reply-quote / composer banner">
                    <div className="px-2 py-1 rounded-lg bg-gray-100 border-l-4 border-gray-300">
                        <Preview message={message} />
                    </div>
                </Surface>
                <Surface label="summary — conversation line (optional)">
                    {Summary
                        ? <div className="text-sm text-gray-700 truncate"><Summary message={message} /></div>
                        : <em className="text-sm text-gray-400">none (no summary registered → renders nothing)</em>}
                </Surface>
            </div>
        </MessageProvider>
    );

}

function Surface({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div>
            <div className="mb-1 text-xs uppercase tracking-wide text-gray-400">{label}</div>
            {children}
        </div>
    );
}

const render = (message: BaseMessage): Story['render'] => () => (
    <StoryChatProvider>
        <SurfaceMatrix message={message} />
    </StoryChatProvider>
);

// Stories

export const Text: Story = { render: render(textOutbound) };
export const Image: Story = { render: render(imageMessage) };
export const Audio: Story = { render: render(audioMessage) };
export const Document: Story = { render: render(documentMessage) };
export const Unknown: Story = { render: render(unknownMessage) };
