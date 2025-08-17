import { action } from 'storybook/actions';
import { Meta, StoryObj } from '@storybook/react-vite';
import chatBackground from '../../assets/chat-background.png';
import { TemplateData } from '../../types/TemplateData';
import { renderTemplate } from '../../utils/renderTemplate';
import { DockedMessageComposer } from '../DockedMessageComposer';
import { ComposerTemplatePanel } from './ComposerTemplatePanel';

// Definition

const meta: Meta<typeof ComposerTemplatePanel> = {
    component: ComposerTemplatePanel,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="relative min-w-96 h-[640px] bg-chat-message-list-bg">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${chatBackground})` }} />
                <DockedMessageComposer className="p-8" onSubmit={function (): Promise<void> {
                    throw new Error('Function not implemented.');
                } }>
                    <Story />
                </DockedMessageComposer>
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof ComposerTemplatePanel>;


// Stories

export const Default: Story = {
    args: {
        templates: [
            {
                name: 'Welcome message',
                description: 'Welcome new customers to our service',
                header: {
                    type: 'text',
                    content: {
                        text: 'Welcome to {{company}}!',
                        context: {
                            company: { required: true, example: 'Acme Corp' }
                        }
                    }
                },
                body: {
                    type: 'text',
                    content: {
                        text: 'Hello {{name}}, welcome to {{company}}! We are excited to have you on board. Your account has been successfully created and you can start using our services immediately.',
                        context: {
                            name: { required: true, example: 'John Doe' },
                            company: { required: true, example: 'Acme Corp' }
                        }
                    }
                },
                footer: {
                    type: 'text',
                    content: {
                        text: 'Best regards, {{sender}} from {{company}}',
                        context: {
                            sender: { required: true, example: 'Jane Smith' },
                            company: { required: true, example: 'Acme Corp' }
                        }
                    }
                }
            },
            {
                name: 'Appointment reminder',
                description: 'Remind customers about upcoming appointments',
                body: {
                    type: 'text',
                    content: {
                        text: 'Hi {{name}}, this is a friendly reminder about your appointment on {{date}} at {{time}}. Please arrive 10 minutes early. If you need to reschedule, please contact us at {{phone}}.',
                        context: {
                            name: { required: true, example: 'John Doe' },
                            date: { required: true, example: 'March 15, 2024' },
                            time: { required: true, example: '2:00 PM' },
                            phone: { required: true, example: '(555) 123-4567' }
                        }
                    }
                }
            },
            {
                name: 'Order confirmation',
                description: 'Confirm customer orders with details',
                header: {
                    type: 'text',
                    content: {
                        text: 'Order Confirmation - {{orderNumber}}',
                        context: {
                            orderNumber: { required: true, example: 'ORD-2024-001' }
                        }
                    }
                },
                body: {
                    type: 'text',
                    content: {
                        text: 'Thank you for your order, {{name}}! Your order #{{orderNumber}} has been confirmed and is being processed. Total amount: {{amount}}. Expected delivery: {{deliveryDate}}.',
                        context: {
                            name: { required: true, example: 'John Doe' },
                            orderNumber: { required: true, example: 'ORD-2024-001' },
                            amount: { required: true, example: '$99.99' },
                            deliveryDate: { required: true, example: 'March 20, 2024' }
                        }
                    }
                }
            }
        ],
        chatBackground,
        render: renderTemplate,
        onClose: action('onClose')
    }
};

const t1: TemplateData = {
    name: 'Welcome message',
    description: 'Welcome new customers to our service',
    body: {
        type: 'text',
        content: {
            text: 'Hello {{name}}, welcome to {{company}}! We are excited to have you on board. Your account has been successfully created and you can start using our services immediately.',
        }
    }
};

export const ManyTemplates: Story = {
    args: {
        templates: [t1, t1, t1, t1, t1, t1, t1, t1, t1, t1, t1, t1],
        chatBackground,
        render: renderTemplate,
        onClose: action('onClose')
    }
};

const t2: TemplateData = {
    name: 'Welcome message',
    body: {
        type: 'text',
        content: {
            text: 'Hello {{name}}, welcome to {{company}}! We are excited to have you on board. Your account has been successfully created and you can start using our services immediately.',
        }
    }
};

export const IncompleteTemplates: Story = {
    args: {
        templates: [t1, t2, t1, t2, t1, t2, t1, t2, t1, t2, t1, t2],
        chatBackground,
        render: renderTemplate,
        onClose: action('onClose')
    }
};
