import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs } from './Tabs';


// Definition

const meta: Meta<typeof Tabs> = {
    component: Tabs
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Stories

export const Primary: Story = {
    render: () => {
        const [tab, setTab] = useState('one');
        return (
            <div>
                <Tabs value={tab} setValue={setTab}>
                    <Tabs.Option value="one">One</Tabs.Option>
                    <Tabs.Option value="two">Two</Tabs.Option>
                    <Tabs.Option value="three">Three</Tabs.Option>
                </Tabs>
                {tab === 'one' && <div className="px-4 py-2 bg-gray-200">Tab for one</div>}
                {tab === 'two' && <div className="px-4 py-2 bg-gray-200">Tab for two</div>}
                {tab === 'three' && <div className="px-4 py-2 bg-gray-200">Tab for three</div>}
            </div>
        );
    }
};

