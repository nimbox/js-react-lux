import { action } from 'storybook/actions';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { Menu } from '../../../components/menu/Menu';
import { FileIcon, ImageIcon, MessageIcon, PlusIcon, SmileyIcon, TemplateIcon } from '../../../icons/components';
import chatBackground from '../assets/chat-background.png';
import { ChatProvider } from '../ChatProvider';
import { MessageData } from '../types/MessageData';
import { TemplateData } from '../types/TemplateData';
import { renderTemplate } from '../utils/renderTemplate';
import { DockedMessageComposer } from './DockedMessageComposer';
import { MessageComposer, MessageComposerSubmitData } from './MessageComposer';
import { ComposerMediaPanel } from './panels/ComposerMediaPanel';
import { ComposerTemplatePanel } from './panels/ComposerTemplatePanel';


// Definition

const meta: Meta<typeof DockedMessageComposer> = {
    component: DockedMessageComposer,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="relative min-w-96 h-screen bg-chat-message-list-bg">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${chatBackground})` }} />
                <Story />
            </div>
        )
    ],
    args: {
        onSubmit: async (data) => action('onSubmit')(data),
        className: 'px-8 py-4'
    }
};

export default meta;
type Story = StoryObj<typeof MessageComposer>;


// Definitions

// Sample data

const sampleReplyMessage: Omit<MessageData, 'replyTo'> = {
    id: 'reply-1',
    author: {
        id: '1',
        type: 'recipient',
        remoteId: 'user-1',
        name: 'Sarah Johnson'
    },
    direction: 'inbound',
    type: 'text',
    body: 'That sounds amazing! I spent most of the weekend working on that new project we discussed.'
};

// Decorators

const WithReplyDecorator = (Story: StoryFn) => {
    const ChatProviderWithReply = () => {
        return (
            <ChatProvider replyTo={sampleReplyMessage}>
                <Story />
            </ChatProvider>
        );
    };
    return <ChatProviderWithReply />;
};

// Stories

export const Default: Story = {
};

export const WithReply: Story = {
    render: (props) => (
        <MessageComposer {...props} />
    ),
    decorators: [WithReplyDecorator]
};

export const WithButtons: Story = {
    render: (props) => (
        <MessageComposer
            {...props}
            start={
                <Button type="button" semantic="muted" rounded={true}>
                    <SmileyIcon />
                </Button>
            }
            end={
                <Button type="button" semantic="muted" rounded={true}>
                    <MessageIcon />
                </Button>
            }
        />
    )
};

export const WithSimpleChildren: Story = {
    render: (props) => {

        const [panel, setPanel] = useState<string | null>();

        const sampleTemplates: TemplateData[] = [
            {
                name: 'Order confirmation',
                description: 'Sent after purchase',
                header: {
                    type: 'text',
                    content: {
                        text: 'Order {{priority}}',
                        context: {
                            priority: { required: true }
                        }
                    }
                },
                body: {
                    type: 'text',
                    content: {
                        text: 'Hi {{customer}}, your order {{orderId}} has been confirmed.',
                        context: {
                            customer: { required: true },
                            orderId: { required: true }
                        }
                    }
                }
            },
            {
                name: 'Appointment reminder',
                description: 'Reminder one day before appointment',
                body: {
                    type: 'text',
                    content: {
                        text: 'Hello {{name}}, this is a reminder for your appointment on {{date}}.',
                        context: {
                            name: { required: true },
                            date: { required: true }
                        }
                    }
                }
            }
        ];

        const ComposerMenu = () => {
            return (
                <Menu trigger={<Button type='button' semantic="primary" rounded={true}><PlusIcon /></Button>} withPlacement="top-start">
                    <Menu.Item
                        icon={<ImageIcon />}
                        label="Imagen"
                        onClick={() => setPanel('image')}
                    />
                    <Menu.Item
                        icon={<FileIcon />}
                        label="Documento"
                        onClick={() => setPanel('document')}
                    />
                    <Menu.Item
                        icon={<TemplateIcon />}
                        label="Plantilla"
                        onClick={() => setPanel('template')}
                    />
                </Menu>
            );
        };

        const handleSubmit = async (draft: MessageComposerSubmitData) => {
            console.log('message', draft);
        };

        return (
            <DockedMessageComposer
                {...props}
                start={<ComposerMenu key="menu" />}
                onSubmit={handleSubmit}
            >

                {panel === 'image' && (
                    <ComposerMediaPanel
                        title="Upload images"
                        type="image"
                        files={[]}
                        autoOpen={true}
                        onClose={() => setPanel(null)}
                        onSubmit={async (data) => {
                            console.log('DATA', data);
                            await new Promise(resolve => setTimeout(resolve, 5000));
                        }}
                    />
                )}

                {panel === 'document' && (
                    <ComposerMediaPanel
                        title="Upload documents"
                        type="document"
                        files={[]}
                        onClose={() => setPanel(null)}
                        onSubmit={async (data) => {
                            console.log('DATA', data);
                            await new Promise(resolve => setTimeout(resolve, 5000));
                        }}
                    />
                )}

                {panel === 'template' && (
                    <ComposerTemplatePanel
                        templates={sampleTemplates}
                        render={renderTemplate}
                        onClose={() => setPanel(null)}
                        onSubmit={async (data) => {
                            console.log('DATA', data);
                            await new Promise(resolve => setTimeout(resolve, 5000));
                        }}
                        chatBackground={chatBackground}
                    />
                )}

            </DockedMessageComposer>
        );

    },
    decorators: [WithReplyDecorator]
};
