import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Splitter, type PaneSize } from './Splitter';


// Definition

const meta: Meta<typeof Splitter> = {
    component: Splitter
};

export default meta;
type Story = StoryObj<typeof Splitter>;

// Templates

// A splitter fills its container, so every story needs a box with a
// definite size to divide.

const Frame = ({ children }: { children?: React.ReactNode }) => (
    <div className="h-96 w-full rounded-lg border border-content-border">
        {children}
    </div>
);

// The dividers paint nothing at rest, so a seam between two panes comes
// from the panes themselves rather than from the splitter.

const Fill = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="h-full w-full overflow-auto border border-content-border bg-content-bg p-4">
        <div className="font-bold">{title}</div>
        <div className="text-muted">{children}</div>
    </div>
);

// Stories

export const Primary: Story = {
    render: (args) => (
        <Frame>
            <Splitter {...args}>
                <Splitter.Pane minimumSize={120}>
                    <Fill title="Left">Drag the divider to resize.</Fill>
                </Splitter.Pane>
                <Splitter.Pane minimumSize={120}>
                    <Fill title="Right">Double click it to even the pair out.</Fill>
                </Splitter.Pane>
            </Splitter>
        </Frame>
    ),
    args: {
        direction: 'horizontal'
    }
};

export const Vertical: Story = {
    render: () => (
        <Frame>
            <Splitter direction="vertical">
                <Splitter.Pane minimumSize={60}><Fill title="Top" /></Splitter.Pane>
                <Splitter.Pane minimumSize={60}><Fill title="Middle" /></Splitter.Pane>
                <Splitter.Pane minimumSize={60}><Fill title="Bottom" /></Splitter.Pane>
            </Splitter>
        </Frame>
    )
};

export const Nested: Story = {
    render: () => (
        <Frame>
            <Splitter direction="horizontal" defaultSizes={['1fr', '2fr']}>
                <Splitter.Pane minimumSize={140}>
                    <Fill title="Navigator" />
                </Splitter.Pane>
                <Splitter.Pane>
                    <Splitter direction="vertical" defaultSizes={['3fr', '1fr']}>
                        <Splitter.Pane minimumSize={80}><Fill title="Editor" /></Splitter.Pane>
                        <Splitter.Pane minimumSize={80}><Fill title="Console" /></Splitter.Pane>
                    </Splitter>
                </Splitter.Pane>
            </Splitter>
        </Frame>
    )
};

export const PaneDefaultSizes: Story = {
    render: () => (
        <Frame>
            <Splitter direction="horizontal">
                <Splitter.Pane defaultSize="1fr" minimumSize={80}>
                    <Fill title="1 share" />
                </Splitter.Pane>
                <Splitter.Pane defaultSize="3fr" minimumSize={80}>
                    <Fill title="3 shares">
                        Each pane declares its own starting share, so there is no
                        positional array to keep in step with the children.
                    </Fill>
                </Splitter.Pane>
                <Splitter.Pane defaultSize="2fr" minimumSize={80}>
                    <Fill title="2 shares" />
                </Splitter.Pane>
            </Splitter>
        </Frame>
    )
};

export const Pinned: Story = {
    render: () => (
        <Frame>
            <Splitter direction="horizontal">
                <Splitter.Pane defaultSize="120px" minimumSize={80}>
                    <Fill title="120px">Stays 120px as the window resizes.</Fill>
                </Splitter.Pane>
                <Splitter.Pane>
                    <Fill title="Flexible">Absorbs everything the pinned panes leave over.</Fill>
                </Splitter.Pane>
                <Splitter.Pane defaultSize="240px" minimumSize={120}>
                    <Fill title="240px">Drag it and the new width sticks too.</Fill>
                </Splitter.Pane>
            </Splitter>
        </Frame>
    )
};

// The same splitter, 400px of pinned panes, rendered at three container
// widths. It shows what pinned panes do as the room runs out, without
// anyone having to resize a window.

export const PinnedOvercommitted: Story = {
    render: () => {

        const splitter = (
            <Splitter direction="horizontal">
                <Splitter.Pane defaultSize="200px">
                    <Fill title="200px" />
                </Splitter.Pane>
                <Splitter.Pane>
                    <Fill title="Flexible" />
                </Splitter.Pane>
                <Splitter.Pane defaultSize="200px">
                    <Fill title="200px" />
                </Splitter.Pane>
            </Splitter>
        );

        return (
            <div className="space-y-6">
                {[
                    { width: 640, note: 'Room to spare — both pinned panes sit at 200px and the middle takes the remaining 240px.' },
                    { width: 400, note: 'Exactly committed — the pinned panes still hold 200px each and the middle is squeezed to nothing.' },
                    { width: 240, note: 'Over-committed — the pinned panes give way together rather than overflowing the container.' }
                ].map(({ width, note }) => (
                    <div key={width}>
                        <div className="mb-1 font-bold">{width}px container</div>
                        <div className="h-24 max-w-full rounded-lg border border-content-border" style={{ width }}>
                            {splitter}
                        </div>
                        <div className="mt-1 text-muted">{note}</div>
                    </div>
                ))}
            </div>
        );

    }
};

export const Collapsible: Story = {
    render: () => (
        <Frame>
            <Splitter direction="horizontal" defaultSizes={['1fr', '3fr']}>
                <Splitter.Pane minimumSize={160} collapsible>
                    <Fill title="Sidebar">Drag well past the minimum to snap it shut.</Fill>
                </Splitter.Pane>
                <Splitter.Pane minimumSize={160}>
                    <Fill title="Content">Focus the divider and press Enter to toggle the sidebar.</Fill>
                </Splitter.Pane>
            </Splitter>
        </Frame>
    )
};

export const Controlled: Story = {
    render: () => {

        const [sizes, setSizes] = useState<PaneSize[]>(['1fr', '1fr', '240px']);

        return (
            <div className="space-y-2">
                <Frame>
                    <Splitter sizes={sizes} onSizesChange={setSizes}>
                        <Splitter.Pane minimumSize={80}><Fill title="One" /></Splitter.Pane>
                        <Splitter.Pane minimumSize={80}><Fill title="Two" /></Splitter.Pane>
                        <Splitter.Pane defaultSize="240px" minimumSize={80}><Fill title="Three" /></Splitter.Pane>
                    </Splitter>
                </Frame>
                <div className="text-muted">
                    {/* Every size says what it is, so the payload reads on its own. */}
                    {sizes.join(' · ')}
                </div>
            </div>
        );

    }
};

export const Persisted: Story = {
    render: () => (
        <Frame>
            <Splitter persistenceKey="stories/splitter">
                <Splitter.Pane minimumSize={120}>
                    <Fill title="Left">Resize, then reload the page.</Fill>
                </Splitter.Pane>
                <Splitter.Pane minimumSize={120}>
                    <Fill title="Right">The layout comes back as you left it.</Fill>
                </Splitter.Pane>
            </Splitter>
        </Frame>
    )
};

export const Disabled: Story = {
    render: () => (
        <Frame>
            <Splitter disabled>
                <Splitter.Pane><Fill title="Left">The dividers are frozen.</Fill></Splitter.Pane>
                <Splitter.Pane><Fill title="Right" /></Splitter.Pane>
            </Splitter>
        </Frame>
    )
};
