import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Avatar } from '../components/displays/Avatar';
import { Button } from '../components/Button';


// The specimens for the summary of a detail page. The rule they follow is in
// `Summaries.mdx` alongside this file. The values are plain strings: formatting
// them is the application's job.

const meta: Meta = {
    title: 'Standards/Layouts/Summaries',
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;

type Story = StoryObj;

// Parts

// The status tag stays outside this standard until Lux has status roles.

function StatusTag({ failed }: { failed?: boolean }) {
    return (
        <span className={`inline-block rounded-full px-2 text-xs font-bold leading-5 text-white ${failed ? 'bg-danger-600' : 'bg-neutral-500'}`}>
            {failed ? 'Failed' : 'Completed'}
        </span>
    );
}

function TitleRow({ title, children }: { title: string, children?: ReactNode }) {
    return (
        <div className="flex items-center gap-4 px-8 py-4">
            <h1 className="flex-1 text-xl font-semibold tracking-tighter">{title}</h1>
            {children}
        </div>
    );
}

interface Cell {
    label: string;
    value: ReactNode;
    detail?: string;
}

// One strip. The cells share the width equally; the lines between them are
// the strip's own `divide-x`.

function Strip({ cells, measures }: { cells: Cell[], measures?: boolean }) {
    return (
        <div className="grid bg-content-fg divide-x divide-content-border" style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}>
            {cells.map((c) => (
                <div key={c.label} className="min-w-0 px-8 py-4">
                    <div className="text-sm text-label">{c.label}</div>
                    <div className={measures
                        ? `text-3xl font-semibold tracking-tight tabular-nums ${c.value === '0' ? 'text-label' : 'text-content'}`
                        : 'truncate text-lg font-semibold tabular-nums'}>
                        {c.value}
                    </div>
                    {c.detail && <div className="text-sm text-label">{c.detail}</div>}
                </div>
            ))}
        </div>
    );
}

function Person({ initials, name }: { initials: string, name: string }) {
    return (
        <span className="whitespace-nowrap">
            <Avatar color="#ffffff" backgroundColor="#656568">{initials}</Avatar>
            <span className="ml-2">{name}</span>
        </span>
    );
}

function FailureBand() {
    return (
        <div role="alert" className="flex items-baseline gap-4 px-8 py-4 bg-content-fg">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 flex-none self-center fill-none stroke-current stroke-2 text-danger-600">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 7v6M12 16.5v.5" strokeLinecap="round"/>
            </svg>
            <div className="min-w-0">
                <div className="font-semibold text-danger-600">Failed in the flow Representative · ContactPhone</div>
                <div className="text-content">The TCP/IP connection to the host host.docker.internal, port 4433 has failed: connection refused.</div>
            </div>
            <a href="#flow" className="ml-auto flex-none whitespace-nowrap text-content underline">See flow</a>
        </div>
    );
}

const server: Cell[] = [
    { label: 'Server', value: 'devrmarimon' },
    { label: 'Profile', value: 'development' },
    { label: 'Mode', value: 'run' },
    { label: 'Up', value: '15h4m', detail: 'since 18 Nov 10:07pm' }
];

const context: Cell[] = [
    { label: 'By', value: <Person initials="RM" name="Marimon, Ricardo"/> },
    { label: 'Queued', value: '19 Nov 1:06pm' },
    { label: 'Waited', value: '<1s' },
    { label: 'Took', value: '14s' }
];

const result: Cell[] = [
    { label: 'Read', value: '92,687' },
    { label: 'Created', value: '0' },
    { label: 'Updated', value: '0' },
    { label: 'Deleted', value: '0' }
];

// Stories

// A strip that describes. The fact with no value (the server's label) is left
// out.

export const Describing: Story = {
    render: () => (
        <div className="min-h-screen bg-content-bg text-content divide-y divide-content-border">
            <TitleRow title="Artifacts"/>
            <Strip cells={server}/>
            <div/>
        </div>
    )
};

// A strip that describes over a strip that measures, in the same grid. The
// status is at the right of the title row, before the page's action.

export const DescribingAndMeasuring: Story = {
    render: () => (
        <div className="min-h-screen bg-content-bg text-content divide-y divide-content-border">
            <TitleRow title="Synchronization of demo">
                <StatusTag/>
                <Button variant="outlined" semantic="neutral" className="text-sm">Run again</Button>
            </TitleRow>
            <Strip cells={context}/>
            <Strip cells={result} measures/>
            <div/>
        </div>
    )
};

// A failed run: the band says where and why, between the title row and the
// strips.

export const Failed: Story = {
    render: () => (
        <div className="min-h-screen bg-content-bg text-content divide-y divide-content-border">
            <TitleRow title="Synchronization of demo">
                <StatusTag failed/>
            </TitleRow>
            <FailureBand/>
            <Strip cells={context}/>
            <Strip cells={[{ label: 'Read', value: '61,204' }, { label: 'Created', value: '12' }, { label: 'Updated', value: '0' }, { label: 'Deleted', value: '0' }]} measures/>
            <div/>
        </div>
    )
};
