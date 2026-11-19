import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../components/Card';


// The specimens for the band pattern. The rule they follow, and why, is in
// `Bands.mdx` alongside this file.

const meta: Meta = {
    title: 'Standards/Layouts/Bands',
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;

type Story = StoryObj;

// Sample data

const documents = [
    { id: 'FAC-00418', date: '12-06-2026', amount: '752,400.00' },
    { id: 'FAC-00402', date: '28-05-2026', amount: '61,050.00' },
    { id: 'FAC-00390', date: '14-05-2026', amount: '128,900.00' }
];

const older = [
    { id: 'FAC-00311', date: '03-02-2026', amount: '21,300.00' },
    { id: 'FAC-00290', date: '19-01-2026', amount: '134,750.00' }
];

// Parts
//
// A strip carries `content-fill` or it carries nothing; a row declares no
// background and inherits its ground. No part draws a line: the container
// divides its bands with `divide-y divide-content-border`.

function Caption({ children, nested }: { children: React.ReactNode, nested?: boolean }) {
    return (
        <div className={`py-2 bg-content-fill text-xs tracking-wide uppercase ${nested ? 'pl-12 pr-8 text-label' : 'px-8 font-semibold text-content'}`}>
            {children}
        </div>
    );
}

function Columns() {
    return (
        <div className="grid grid-cols-[1fr_7rem_9rem] gap-4 px-8 py-2 bg-content-fill text-xs tracking-wide text-label uppercase">
            <div>Document</div>
            <div>Date</div>
            <div className="text-right">Amount</div>
        </div>
    );
}

function Row({ id, date, amount }: { id: string, date: string, amount: string }) {
    return (
        <div className="grid grid-cols-[1fr_7rem_9rem] gap-4 px-8 py-2">
            <div className="truncate">{id}</div>
            <div className="tabular-nums">{date}</div>
            <div className="text-right tabular-nums">{amount}</div>
        </div>
    );
}

function Header() {
    return (
        <div className="flex items-center gap-4 px-8 py-4">
            <div className="flex-1 text-xl font-semibold tracking-tighter">Documents</div>
            <div className="text-sm text-label">All companies</div>
        </div>
    );
}

// Stories

// Border to border, the usual case. Both strips above the first row are filled
// and told apart by type, not by tint.

export const Bands: Story = {
    render: () => (
        <div className="min-h-screen bg-content-bg text-content divide-y divide-content-border">

            <Header />
            <Columns />

            {documents.map((d) => <Row key={d.id} {...d} />)}

            <Caption>Overdue more than 90 days</Caption>

            {older.map((d) => <Row key={d.id} {...d} />)}

        </div>
    )
};

// No groups, and nothing about the table changes.

export const BandsWithoutGroups: Story = {
    render: () => (
        <div className="min-h-screen bg-content-bg text-content divide-y divide-content-border">

            <Header />
            <Columns />

            {documents.map((d) => <Row key={d.id} {...d} />)}
            {older.map((d) => <Row key={d.id} {...d} />)}

        </div>
    )
};

// Groups two deep. Same fill; the nesting is in the indent and the weight.

export const NestedGroups: Story = {
    render: () => (
        <div className="min-h-screen bg-content-bg text-content divide-y divide-content-border">

            <Header />
            <Columns />

            <Caption>Agrifeed, S. A.</Caption>
            <Caption nested>Invoices</Caption>
            {documents.slice(0, 2).map((d) => <Row key={d.id} {...d} />)}
            <Caption nested>Credit notes</Caption>
            {documents.slice(2).map((d) => <Row key={d.id} {...d} />)}

            <Caption>Albaine SRL</Caption>
            <Caption nested>Invoices</Caption>
            {older.map((d) => <Row key={d.id} {...d} />)}

        </div>
    )
};

// The same bands inside a card. The card contributes the border, the radius,
// `overflow-hidden` and the ground — and no padding. The body divides its
// bands and the card divides the body from the footer.

export const BandsInCard: Story = {
    parameters: {
        layout: 'centered'
    },
    render: () => (
        <div className="p-8 bg-content-bg text-content">

            <Card className="w-[46rem] rounded-surface border-content-border overflow-hidden divide-y divide-content-border">

                <Card.Body className="divide-y divide-content-border">

                    <Header />
                    <Columns />

                    {documents.map((d) => <Row key={d.id} {...d} />)}

                    <Caption>Overdue more than 90 days</Caption>

                    {older.map((d) => <Row key={d.id} {...d} />)}

                </Card.Body>

                <Card.Footer noBorder className="px-8 py-2 bg-content-fill text-sm text-label">
                    5 documents
                </Card.Footer>

            </Card>

        </div>
    )
};
