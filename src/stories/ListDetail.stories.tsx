import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { Avatar } from '../components/displays/Avatar';
import { Button } from '../components/Button';
import { CheckBox } from '../components/inputs/CheckBox';
import { Control } from '../components/inputs/Control';
import { Input } from '../components/inputs/Input';
import { NativeSelect } from '../components/inputs/NativeSelect';
import { Option } from '../components/inputs/Option';
import { RadioBar } from '../components/RadioBar';
import { Tabs } from '../components/Tabs';


// The specimens for the list-detail page. The rule they follow is in
// `ListDetail.mdx` alongside this file. The values are plain strings.

const meta: Meta = {
    title: 'Standards/Layouts/List-detail',
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;

type Story = StoryObj;

// Sample data

interface Person {
    id: string;
    initials: string;
    name: string;
    alias: string;
}

const people: Person[] = [
    { id: 'ka', initials: 'KA', name: 'Alzuro, Karla', alias: 'karla' },
    { id: 'af', initials: 'AF', name: 'Figueira, Andrea', alias: 'figueira' },
    { id: 'mg', initials: 'MG', name: 'González, María', alias: 'maria' },
    { id: 'rm', initials: 'RM', name: 'Marimon, Ricardo', alias: 'rick' },
    { id: 'et', initials: 'ET', name: 'Torres, Esteban', alias: 'esteban' }
];

const applications = ['admin', 'ar', 'sales', 'analysis', 'hermes'];

// Parts

const container = 'mx-auto w-full max-w-[54rem] px-8';

function PersonAvatar({ initials, quiet }: { initials: string, quiet?: boolean }) {
    return <Avatar inline={false} color="#ffffff" backgroundColor={quiet ? '#9ea0a5' : '#00607f'}>{initials}</Avatar>;
}

function Square({ text, size = 'size-7' }: { text: string, size?: string }) {
    return (
        <span aria-hidden="true" className={`${size} flex-none inline-flex items-center justify-center rounded-lg bg-content-border/60 text-xs font-bold text-content`}>
            {text}
        </span>
    );
}

function ListPane({ title, newLabel, children, count }: { title: string, newLabel?: string, count: number, children: ReactNode }) {
    return (
        <section aria-label={title} className="w-[300px] flex-none border-r border-content-border bg-content-bg divide-y divide-content-border">
            <div className="flex items-center gap-4 px-6 py-4">
                <h1 className="flex-1 text-xl font-semibold tracking-tighter">{title}</h1>
                {newLabel && <Button variant="outlined" semantic="neutral" className="text-sm">{newLabel}</Button>}
            </div>
            <div className="px-6 py-3">
                <Input type="search" placeholder="Search" aria-label={`Search ${title}`}/>
            </div>
            <div className="px-6 pt-3 pb-2 text-sm font-semibold tracking-wide uppercase text-label">{title} ({count})</div>
            {children}
        </section>
    );
}

function ListRow({ identity, name, detail, selected }: { identity: ReactNode, name: string, detail: string, selected?: boolean }) {
    return (
        <a
            href={`#${name}`}
            aria-current={selected ? 'page' : undefined}
            className={`flex items-center gap-3 px-6 py-2.5 text-content no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary-200 ${selected ? 'bg-primary-100' : 'hover:bg-neutral-100'}`}
        >
            {identity}
            <div className="min-w-0">
                <div className="truncate font-semibold">{name}</div>
                <div className="text-sm text-label">{detail}</div>
            </div>
        </a>
    );
}

function Header({ identity, title, context, status }: { identity: ReactNode, title: string, context: string, status?: string }) {
    return (
        <div className="bg-content-fg">
            <div className={`${container} flex items-center gap-5 pt-6 pb-4`}>
                {identity}
                <div className="min-w-0 flex-1">
                    <h1 className="text-2xl font-semibold tracking-tighter">{title}</h1>
                    <div className="text-label">{context}</div>
                </div>
                {status && <span className="rounded-full bg-content-border/60 px-2 text-xs font-bold leading-5">{status}</span>}
            </div>
        </div>
    );
}

function SaveBar({ children }: { children: ReactNode }) {
    return (
        <div className="sticky bottom-0 border-t border-content-border bg-content-fg">
            <div className={`${container} flex items-center gap-3 py-3`}>
                <span className="flex-1 text-sm text-label">Unsaved changes</span>
                {children}
            </div>
        </div>
    );
}

function Group({ title, children }: { title: string, children: ReactNode }) {
    return (
        <div>
            <h2 className="mb-3 font-semibold">{title}</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">{children}</div>
        </div>
    );
}

function Field({ label, value, message }: { label: string, value?: string, message?: string }) {
    return (
        <Control>
            <Control.Label>{label}</Control.Label>
            <Input defaultValue={value}/>
            {message && <Control.Message>{message}</Control.Message>}
        </Control>
    );
}

function Profile({ creating }: { creating?: boolean }) {
    return (
        <div className={`${container} flex flex-col gap-8 py-6`}>
            <Group title="Identity">
                <Field label="First name" value={creating ? '' : 'Karla'}/>
                <Field label="Last name" value={creating ? '' : 'Alzuro'}/>
                <Field label="Alias" value={creating ? '' : 'karla'} message="Short name for @mentions"/>
                {creating
                    ? <Field label="UID" message="Used to sign in; it does not change later"/>
                    : <div><div className="mb-1 text-sm text-label">UID</div><div className="font-mono leading-9">kalzuro</div></div>}
            </Group>
            <Group title="Access">
                <Control>
                    <Control.Label>Role</Control.Label>
                    <NativeSelect defaultValue={creating ? 'user' : 'admin'}>
                        <Option value="admin">Administrator</Option>
                        <Option value="user">User</Option>
                    </NativeSelect>
                </Control>
                <Control>
                    <Control.Label>Enabled</Control.Label>
                    <CheckBox defaultChecked>Can sign in</CheckBox>
                    <Control.Message>A disabled user cannot sign in</Control.Message>
                </Control>
            </Group>
        </div>
    );
}

function RoleBar({ initial }: { initial: string }) {
    const [role, setRole] = useState<string | number>(initial);
    return (
        <RadioBar value={role} onChange={setRole}>
            <RadioBar.Option value="member">Member</RadioBar.Option>
            <RadioBar.Option value="admin">Admin</RadioBar.Option>
        </RadioBar>
    );
}

function AccessHeading({ title, note }: { title: string, note?: string }) {
    return (
        <div className="mb-3 flex items-baseline gap-4">
            <h2 className="flex-1 font-semibold">{title}</h2>
            {note && <span className="text-sm text-label">{note}</span>}
        </div>
    );
}

// Stories

// A person's record: header, tabs, the profile as a form with the save bar,
// and her applications as access lists that save at once.

export const Detail: Story = {
    render: function Render() {

        const [tab, setTab] = useState<string | number | undefined>('profile');
        const has: Record<string, string> = { ar: 'member', sales: 'admin' };

        return (
            <div className="flex min-h-screen bg-content-bg text-content">
                <ListPane title="Users" newLabel="New" count={people.length}>
                    {people.map((p, i) => <ListRow key={p.id} identity={<PersonAvatar initials={p.initials}/>} name={p.name} detail={`@${p.alias}`} selected={i === 0}/>)}
                </ListPane>
                <main className="flex min-w-0 flex-1 flex-col">
                    <Header identity={<span className="text-xl"><PersonAvatar initials="KA"/></span>} title="Karla Alzuro" context="@karla · Administrator · kalzuro@nimbox.com" status="Enabled"/>
                    <div className="border-b border-content-border bg-content-fg">
                        <div className={container}>
                            <Tabs value={tab} setValue={setTab}>
                                <Tabs.Option value="profile">Profile</Tabs.Option>
                                <Tabs.Option value="applications">Applications</Tabs.Option>
                                <Tabs.Option value="password">Password</Tabs.Option>
                            </Tabs>
                        </div>
                    </div>
                    <div className="flex-1">
                        {tab === 'profile' && <Profile/>}
                        {tab === 'applications' && (
                            <div className={`${container} flex flex-col gap-9 py-6`}>
                                <div>
                                    <AccessHeading title={`Has access (${Object.keys(has).length})`} note="Member uses the application · Admin also configures it"/>
                                    <div className="border-t border-content-border divide-y divide-content-border">
                                        {applications.filter((a) => has[a]).map((a) => (
                                            <div key={a} className="grid min-h-11 grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-7">
                                                <div className="flex items-center gap-3"><Square text={a.slice(0, 2).toUpperCase()}/><span className="font-semibold">{a}</span></div>
                                                <RoleBar initial={has[a]}/>
                                                <button type="button" className="text-label">Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <AccessHeading title={`No access (${applications.length - Object.keys(has).length})`}/>
                                    <div className="border-t border-content-border divide-y divide-content-border">
                                        {applications.filter((a) => !has[a]).map((a) => (
                                            <div key={a} className="flex min-h-10 items-center gap-3">
                                                <Square text={a.slice(0, 2).toUpperCase()} size="size-6"/>
                                                <span className="flex-1 text-label">{a}</span>
                                                <Button variant="outlined" semantic="neutral" className="text-sm">Give access</Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {tab === 'password' && (
                            <div className={`${container} grid grid-cols-2 gap-6 py-6`}>
                                <div className="flex flex-col gap-5">
                                    <Field label="New password"/>
                                    <Field label="Confirm"/>
                                    <div><Button>Change password</Button></div>
                                </div>
                                <div className="text-sm text-label">More than 8 characters, with an uppercase letter, a lowercase letter, a number and a special character.</div>
                            </div>
                        )}
                    </div>
                    {tab === 'profile' && (
                        <SaveBar>
                            <Button variant="text" semantic="neutral">Discard</Button>
                            <Button>Save</Button>
                        </SaveBar>
                    )}
                </main>
            </div>
        );

    }
};

// Creating: a provisional row in the list, an empty identity, no tabs, the
// profile's layout with fewer fields.

export const Creating: Story = {
    render: () => (
        <div className="flex min-h-screen bg-content-bg text-content">
            <ListPane title="Users" newLabel="New" count={people.length}>
                <ListRow identity={<span aria-hidden="true" className="size-7 flex-none rounded-full border border-dashed border-label"/>} name="New user" detail="not saved" selected/>
                {people.map((p) => <ListRow key={p.id} identity={<PersonAvatar initials={p.initials}/>} name={p.name} detail={`@${p.alias}`}/>)}
            </ListPane>
            <main className="flex min-w-0 flex-1 flex-col">
                <div className="border-b border-content-border">
                    <Header identity={<span aria-hidden="true" className="size-14 flex-none rounded-full border border-dashed border-label"/>} title="New user" context="Avatar, preferences, access and password are set after creating."/>
                </div>
                <div className="flex-1"><Profile creating/></div>
                <SaveBar>
                    <Button variant="text" semantic="neutral">Cancel</Button>
                    <Button variant="outlined" semantic="neutral">Create without inviting</Button>
                    <Button>Create and invite</Button>
                </SaveBar>
            </main>
        </div>
    )
};

// Access from the thing's side: the list holds applications, the detail who
// opens the selected one. It saves at once and has no save bar.

export const Access: Story = {
    render: () => (
        <div className="flex min-h-screen bg-content-bg text-content">
            <ListPane title="Application access" count={applications.length}>
                {applications.map((a, i) => <ListRow key={a} identity={<Square text={a.slice(0, 2).toUpperCase()}/>} name={a} detail={`${[1, 5, 2, 3, 0][i] || 'nobody'}${[1, 5, 2, 3, 0][i] ? ' users' : ''}`} selected={a === 'sales'}/>)}
            </ListPane>
            <main className="flex min-w-0 flex-1 flex-col">
                <div className="border-b border-content-border">
                    <Header identity={<Square text="SA" size="size-14"/>} title="sales" context="canexer-application-sales · 2 of 5 users have access"/>
                </div>
                <div className={`${container} flex flex-col gap-9 py-6`}>
                    <div>
                        <AccessHeading title="Has access (2)" note="Member uses the application · Admin also configures it"/>
                        <div className="border-t border-content-border divide-y divide-content-border">
                            {people.slice(0, 2).map((p, i) => (
                                <div key={p.id} className="grid min-h-11 grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-7">
                                    <div className="flex items-center gap-3"><PersonAvatar initials={p.initials}/><div><div className="font-semibold">{p.name}</div><div className="text-sm text-label">@{p.alias}</div></div></div>
                                    <RoleBar initial={i === 0 ? 'admin' : 'member'}/>
                                    <button type="button" className="text-label">Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <AccessHeading title="No access (3)"/>
                        <div className="border-t border-content-border divide-y divide-content-border">
                            {people.slice(2).map((p) => (
                                <div key={p.id} className="flex min-h-10 items-center gap-3">
                                    <PersonAvatar initials={p.initials} quiet/>
                                    <span className="flex-1 text-label">{p.name}</span>
                                    <Button variant="outlined" semantic="neutral" className="text-sm">Give access</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};
