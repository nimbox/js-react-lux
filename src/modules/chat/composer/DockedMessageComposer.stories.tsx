import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { Menu } from '../../../components/menu/Menu';
import { FileIcon, ImageIcon, MessageIcon, PlusIcon, SmileyIcon, TemplateIcon } from '../../../icons/components';
import backgroundImage from '../assets/chat-background.png';
import { ChatProvider } from '../ChatProvider';
import { MessageData } from '../types/MessageData';
import { TemplateData } from '../types/TemplateData';
import { DockedMessageComposer } from './DockedMessageComposer';
import { MessageComposer } from './MessageComposer';
import { MessageComposerDraft } from './MessageComposerContext';
import { ComposerDocumentPanelDraft, ComposerDocumentPanel } from './panels/ComposerDocumentPanel';
import { ComposerImagePanelDraft, ComposerImagePanel } from './panels/ComposerImagePanel';
import { ComposerTemplatePanel, ComposerTemplatePanelDraft } from './panels/ComposerTemplatePanel';


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
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${backgroundImage})` }} />
                <Story />
            </div>
        )
    ],
    args: {
        onSubmit: (draft: MessageComposerDraft) => action('onSubmit')(draft),
        className: 'px-8 py-4'
    }
};

export default meta;
type Story = StoryObj<typeof MessageComposer>;


// Draft types

type ComposerDraft = MessageComposerDraft & (ComposerImagePanelDraft | ComposerDocumentPanelDraft | ComposerTemplatePanelDraft);

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
                <Menu trigger={<Button type='submit' semantic="primary" rounded={true}><PlusIcon /></Button>} withPlacement="top-start">
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

        const handleSubmit = (draft: ComposerDraft) => {
            console.log('message', draft);
        };

        return (
            <DockedMessageComposer<ComposerDraft>
                {...props}
                onSubmit={handleSubmit}
                start={<ComposerMenu key="menu" />}
                onCollapse={() => setPanel(null)}
            >

                {panel === 'image' && (
                    <ComposerImagePanel
                        onClose={() => setPanel(null)}
                        uploadImage={async () => {
                            await new Promise(resolve => setTimeout(resolve, 5000));
                            return 'image-1';
                        }}
                    />
                )}

                {panel === 'document' && (
                    <ComposerDocumentPanel
                        onClose={() => setPanel(null)}
                        uploadDocument={async () => {
                            await new Promise(resolve => setTimeout(resolve, 5000));
                            return 'doc-1';
                        }}
                    />
                )}

                {panel === 'template' && (
                    <ComposerTemplatePanel
                        onClose={() => setPanel(null)}
                        templates={sampleTemplates}
                        chatBackground={backgroundImage}
                        renderTemplate={(tpl, ctx) => {
                            // Simple template rendering - replace variables with context values
                            let bodyText = tpl.body?.content.text ?? '';

                            // Replace variables in body
                            Object.entries(ctx.body).forEach(([key, value]) => {
                                bodyText = bodyText.replace(new RegExp(`{{${key}}}`, 'g'), value);
                            });

                            return {
                                header: tpl.name,
                                body: bodyText,
                                footer: '— Company name'
                            };
                        }}
                    />
                )}

            </DockedMessageComposer>
        );

    },
    decorators: [WithReplyDecorator]
};
