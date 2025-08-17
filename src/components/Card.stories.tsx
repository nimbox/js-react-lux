import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Card } from './Card';
import { Tabs } from './Tabs';


const meta: Meta<typeof Card> = {
    component: Card
};

export default meta;
type Story = StoryObj<typeof Card>;

// Stories

export const Primary: Story = {
    render: () => {
        return (
            <Card>
                <Card.Header>
                    <div>Header</div>
                </Card.Header>
                <Card.Body>
                    <div>Content</div>
                </Card.Body>
                <Card.Footer>
                    <div>Footer</div>
                </Card.Footer>
            </Card>
        );
    }
};

export const PrimaryWithTabs: Story = {
    render: () => {
        const [tab, setTab] = useState('one');
        return (
            <Card>
                <Card.Header className="pb-0">
                    <Tabs value={tab} setValue={setTab}>
                        <Tabs.Option value="one">One</Tabs.Option>
                        <Tabs.Option value="two">Two</Tabs.Option>
                        <Tabs.Option value="three">Three</Tabs.Option>
                    </Tabs>
                </Card.Header>
                <Card.Body>
                    <div>Content</div>
                </Card.Body>
                <Card.Footer>
                    <div>Footer</div>
                </Card.Footer>
            </Card>
        );
    }
};
