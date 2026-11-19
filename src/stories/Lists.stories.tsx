import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { Button } from '../components/Button';
import { Avatar } from '../components/displays/Avatar';
import { NativeSelect } from '../components/inputs/NativeSelect';
import { Option } from '../components/inputs/Option';
import { RadioBar } from '../components/RadioBar';


// The specimens for the list page. The rule they follow is in `Lists.mdx`
// alongside this file. The values are plain strings: formatting them is the
// application's job.

const meta: Meta = {
    title: 'Standards/Layouts/Lists',
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;

type Story = StoryObj;

// Sample data

type Status = 'completed' | 'failed';

interface Run {
    id: string;
    day: string;
    time: string;
    company: string;
    status: Status;
    duration: string;
    origin: string;
    user?: string;
    cause?: string;
}

const runs: Run[] = [
    { id: 'r8', day: 'Today', time: '10:00', company: 'demo', status: 'completed', duration: '18s', origin: 'Schedule' },
    { id: 'r7', day: 'Today', time: '09:45', company: 'demo', status: 'completed', duration: '15s', origin: 'Schedule' },
    { id: 'r6', day: 'Today', time: '09:16', company: 'demo', status: 'completed', duration: '18s', origin: 'Schedule', user: 'rmarimon' },
    { id: 'r5', day: 'Today', time: '09:15', company: 'demo', status: 'failed', duration: '31s', origin: 'Schedule', cause: 'The TCP/IP connection to the host host.docker.internal, port 4433 has failed.' },
    { id: 'r4', day: 'Yesterday', time: '22:12', company: 'demo', status: 'completed', duration: '15s', origin: 'Schedule', user: 'rmarimon' },
    { id: 'r3', day: 'Yesterday', time: '22:08', company: 'demo', status: 'completed', duration: '19s', origin: 'Schedule', user: 'rmarimon' }
];

const companies = [
    { id: 'demo', code: 'demo', schedule: '*/15 * * * *', next: 'Next 10:15', status: 'completed' as Status, last: 'Today 10:00', took: '18s', origin: 'Schedule' },
    { id: 'acme', code: 'acme-do', schedule: '0 * * * *', next: 'Next 11:00', status: 'failed' as Status, last: 'Today 10:00', took: '31s', origin: 'Schedule' }
];

// Parts

const columns = 'grid grid-cols-[auto_auto_auto_auto_auto_minmax(0,1fr)_auto] gap-4 items-baseline';

// The status tag stays outside this standard until Lux has status roles.

function StatusTag({ status }: { status: Status }) {
    return (
        <span className={`inline-block rounded-full px-2 text-xs font-bold leading-5 text-white ${status === 'failed' ? 'bg-danger-600' : 'bg-neutral-500'}`}>
            {status === 'failed' ? 'Failed' : 'Completed'}
        </span>
    );
}

function Chevron() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-2 text-label opacity-0 group-hover:opacity-100 pointer-coarse:opacity-100">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
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

function Caption({ children }: { children: ReactNode }) {
    return (
        <div className="px-8 pt-3 pb-2 text-sm font-semibold tracking-wide uppercase text-label">
            {children}
        </div>
    );
}

function HeaderCell({ children, right }: { children?: ReactNode, right?: boolean }) {
    return <div className={right ? 'text-right pr-4' : undefined}>{children}</div>;
}

function RunsHeader() {
    return (
        <div className={`${columns} px-8 py-2 bg-content-fill text-xs tracking-wide uppercase text-label`}>
            <HeaderCell>Queued</HeaderCell>
            <HeaderCell>Company</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell right>Duration</HeaderCell>
            <HeaderCell>By</HeaderCell>
            <HeaderCell>Cause</HeaderCell>
            <HeaderCell/>
        </div>
    );
}

function DayCaption({ children }: { children: ReactNode }) {
    return (
        <div className="px-8 py-2 bg-content-fill text-xs font-semibold tracking-wide uppercase text-content">
            {children}
        </div>
    );
}

function RunRow({ run }: { run: Run }) {
    return (
        <div className={`group relative ${columns} min-h-11 px-8 py-2 hover:bg-neutral-100`}>
            <a href={`#${run.id}`} className="font-semibold tabular-nums text-content after:absolute after:inset-0">{run.time}</a>
            <div>{run.company}</div>
            <div><StatusTag status={run.status}/></div>
            <div className="text-right tabular-nums pr-4">{run.duration}</div>
            <div className="whitespace-nowrap">
                {run.user ? <><Avatar color="#ffffff" backgroundColor="#656568">RM</Avatar><span className="ml-2">{run.user}</span></> : run.origin}
            </div>
            <div className="truncate">{run.cause}</div>
            <div className="flex justify-end"><Chevron/></div>
        </div>
    );
}

// Stories

// A log ordered in time, grouped by day. Each row carries only the time; the
// day is in the caption above it.

export const LogGroupedByDay: Story = {
    render: function Render() {

        const [status, setStatus] = useState<string | number>('all');

        const shown = runs.filter((r) => status === 'all' || r.status === status);
        const days = [...new Set(shown.map((r) => r.day))];

        return (
            <div className="min-h-screen bg-content-bg text-content divide-y divide-content-border">

                <TitleRow title="History"/>

                <div className="flex items-center gap-4 px-8 py-2">
                    <RadioBar value={status} onChange={setStatus}>
                        <RadioBar.Option value="all">All</RadioBar.Option>
                        <RadioBar.Option value="running">Running</RadioBar.Option>
                        <RadioBar.Option value="failed">Failed</RadioBar.Option>
                        <RadioBar.Option value="stopped">Stopped</RadioBar.Option>
                    </RadioBar>
                    <div className="ml-auto w-56">
                        <NativeSelect aria-label="Company">
                            <Option value="">All companies</Option>
                            <Option value="demo">demo</Option>
                        </NativeSelect>
                    </div>
                </div>

                <Caption>Synchronizations ({shown.length})</Caption>

                <RunsHeader/>

                {days.map((day) => (
                    <div key={day} className="divide-y divide-content-border">
                        <DayCaption>{day}</DayCaption>
                        {shown.filter((r) => r.day === day).map((r) => <RunRow key={r.id} run={r}/>)}
                    </div>
                ))}

            </div>
        );

    }
};

// Records with an action on every row. The row opens the record; the button
// keeps its own click above the stretched link. The one filled primary is the
// page's action, in the title row.

const companyColumns = 'grid grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto_auto] gap-4 items-baseline';

export const RecordsWithActions: Story = {
    render: () => (
        <div className="min-h-screen bg-content-bg text-content divide-y divide-content-border">

            <TitleRow title="Synchronization">
                <Button>Synchronize all</Button>
            </TitleRow>

            <Caption>Companies ({companies.length})</Caption>

            <div className={`${companyColumns} px-8 py-2 bg-content-fill text-xs tracking-wide uppercase text-label`}>
                <HeaderCell>Company</HeaderCell>
                <HeaderCell>Schedule</HeaderCell>
                <HeaderCell>Status</HeaderCell>
                <HeaderCell>Last</HeaderCell>
                <HeaderCell>Origin</HeaderCell>
                <HeaderCell/>
                <HeaderCell/>
            </div>

            {companies.map((c) => (
                <div key={c.id} className={`group relative ${companyColumns} min-h-15 px-8 py-2 hover:bg-neutral-100`}>
                    <div>
                        <a href={`#${c.id}`} className="font-semibold text-content after:absolute after:inset-0">{c.id}</a>
                        <div className="text-sm text-label">{c.code}</div>
                    </div>
                    <div>
                        <div className="font-mono text-sm">{c.schedule}</div>
                        <div className="text-sm text-label tabular-nums">{c.next}</div>
                    </div>
                    <div><StatusTag status={c.status}/></div>
                    <div className="tabular-nums">
                        <div>{c.last}</div>
                        <div className="text-sm text-label">{c.took}</div>
                    </div>
                    <div>{c.origin}</div>
                    <div className="relative z-10">
                        <Button variant="outlined" semantic="neutral" className="text-sm">Synchronize</Button>
                    </div>
                    <div className="flex justify-end"><Chevron/></div>
                </div>
            ))}

        </div>
    )
};
