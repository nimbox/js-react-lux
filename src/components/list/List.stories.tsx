import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { List } from './List';


const meta = {
    title: 'Components/List',
    component: List,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

// Stories

export const Default: Story = {
    render: () => {

        const [chosen, setChosen] = useState<string | null>(null);

        return (
            <div className="w-64">

                <List
                    tabIndex={0}
                    role="listbox"
                    className="bg-control-bg border border-control-border rounded shadow outline-none"
                >

                    <List.Header>Fruits</List.Header>
                    <List.Item role="option" onClick={() => setChosen('Apple')}>Apple</List.Item>
                    <List.Item role="option" onClick={() => setChosen('Banana')}>Banana</List.Item>
                    <List.Item role="option" disabled>Cherry (disabled)</List.Item>

                    <List.Separator />

                    <List.Header>Vegetables</List.Header>
                    <List.Item role="option" onClick={() => setChosen('Carrot')}>Carrot</List.Item>
                    <List.Item role="option" onClick={() => setChosen('Pea')}>Pea</List.Item>
                    <List.Item role="option" onClick={() => setChosen('Spinach')}>Spinach</List.Item>

                </List>

                <div className="mt-3 text-sm text-content">Chosen: {chosen ?? '—'}</div>

            </div>
        );

    }
};


// The list's spacing is em-based, so its size follows the surrounding font-size —
// wrap it in a `text-*` and the whole list (padding, rows, header, separator)
// scales proportionally, no size prop needed.

function SampleList() {
    return (
        <List
            tabIndex={0}
            role="listbox"
            className="bg-control-bg border border-control-border rounded shadow outline-none"
        >
            <List.Header>Fruits</List.Header>
            <List.Item role="option">Apple</List.Item>
            <List.Item role="option">Banana</List.Item>
            <List.Separator />
            <List.Item role="option">Carrot</List.Item>
        </List>
    );
}

export const Sizes: Story = {
    render: () => (
        <div className="flex items-start gap-8">

            <div className="text-sm">
                <div className="mb-2 text-xs text-muted">Small (text-sm)</div>
                <SampleList />
            </div>

            <div>
                <div className="mb-2 text-xs text-muted">Default</div>
                <SampleList />
            </div>

            <div className="text-xl">
                <div className="mb-2 text-xs text-muted">Large (text-xl)</div>
                <SampleList />
            </div>

        </div>
    )
};
