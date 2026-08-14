import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './Button';
import { RadioBar } from './RadioBar';
import { Tabs, type TabsProps } from './Tabs';
import { cn } from './utilities/cn';


// Definition

const meta: Meta<typeof Tabs> = {
    component: Tabs,
    tags: ['autodocs'],
    parameters: {

        // List what the panel shows rather than what it hides, so a prop added
        // to `Tabs` later has to be opted in. `value` and `setValue` are left
        // out because the preview holds the selection to keep the strip live.

        controls: { include: ['variant', 'withFullWidth', 'withEqualWidthOptions', 'className'] }

    }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Template

const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Something longer' },
    { value: 'three', label: 'Two' }
];

const manyOptions = Array.from({ length: 12 }, (_, index) => ({
    value: `option-${index}`,
    label: `Option ${index + 1}`
}));

/**
 * A live strip: it holds the selection itself and hands everything else
 * through, so every prop on it can be driven from the Controls panel.
 *
 * The rule under the strip is the caller's to draw, and only `underlined`
 * wants one — so the preview draws it the way a real screen would, and
 * switching `variant` in the panel takes it away. Anything passed as
 * `className` still lands on top of that.
 */
function TabsPreview({ options, variant, className, ...props }: Partial<TabsProps> & {
    options: typeof manyOptions
}) {

    const [tab, setTab] = useState<string | number | undefined>(options[0].value);

    return (
        <div className="w-96">
            <Tabs
                {...props}
                variant={variant}
                value={tab}
                setValue={setTab}
                className={cn(variant !== 'solid' && 'border-b border-control-border', className)}
            >
                {options.map((option) => (
                    <Tabs.Option key={option.value} value={option.value}>
                        {option.label}
                    </Tabs.Option>
                ))}
            </Tabs>
            <div role="tabpanel" className="mt-2 px-4 py-2 bg-gray-200">
                Panel for {tab}
            </div>
        </div>
    );

}

const TabsTemplate: Story = {
    render: (args) => <TabsPreview {...args} options={options} />
};

// Stories

export const Underlined: Story = {
    ...TabsTemplate,
    args: {
        variant: 'underlined',
        withFullWidth: false,
        withEqualWidthOptions: false
    }
};

export const Solid: Story = {
    ...TabsTemplate,
    args: {
        ...Underlined.args,
        variant: 'solid'
    }
};

export const FullWidth: Story = {
    ...TabsTemplate,
    args: {
        ...Underlined.args,
        withFullWidth: true
    }
};

export const EqualWidthOptions: Story = {
    ...TabsTemplate,
    args: {
        ...Underlined.args,
        withEqualWidthOptions: true
    }
};

export const FullWidthEqualWidthOptions: Story = {
    ...TabsTemplate,
    args: {
        ...Underlined.args,
        withFullWidth: true,
        withEqualWidthOptions: true
    }
};

/**
 * Tabs against the buttons they have to be told apart from. A tab is smaller,
 * tighter and — when selected — pill-shaped, where a button is at the full
 * type scale on `--radius-control`.
 */
export const BesideButtons: Story = {
    render: () => {
        const [tab, setTab] = useState<string | number | undefined>('one');
        return (
            <div className="space-y-6">
                {(['underlined', 'solid'] as const).map((variant) => (
                    <div key={variant} className="flex flex-row items-center gap-4">
                        <Tabs variant={variant} value={tab} setValue={setTab}>
                            {options.map((option) => (
                                <Tabs.Option key={option.value} value={option.value}>
                                    {option.label}
                                </Tabs.Option>
                            ))}
                        </Tabs>
                        <Button variant="filled">Save</Button>
                        <Button variant="outlined">Cancel</Button>
                        <Button variant="text">More</Button>
                    </div>
                ))}
            </div>
        );
    }
};

/**
 * Tabs against the `RadioBar` they are nearly the same control as. Both are a
 * row of exclusive labels, so the shape has to carry the difference: a filled
 * pill swaps the panel, a bare rule narrows what is already on it.
 *
 * The third row is why `underlined` wants the caller's rule. Without one it is
 * drawn exactly as the `RadioBar` beside it, and nothing tells a reader which
 * of the two will move them.
 */
export const BesideRadioBar: Story = {
    render: () => {
        const [tab, setTab] = useState<string | number | undefined>('one');
        const [currency, setCurrency] = useState<string | number>('all');
        const strip = (variant: TabsProps['variant'], className?: string) => (
            <Tabs variant={variant} value={tab} setValue={setTab} className={className}>
                {options.map((option) => (
                    <Tabs.Option key={option.value} value={option.value}>
                        {option.label}
                    </Tabs.Option>
                ))}
            </Tabs>
        );
        const bar = (
            <RadioBar value={currency} onChange={setCurrency}>
                <RadioBar.Option value="all">Todo</RadioBar.Option>
                <RadioBar.Option value="DOP">DOP</RadioBar.Option>
                <RadioBar.Option value="USD">USD</RadioBar.Option>
            </RadioBar>
        );
        return (
            <div className="space-y-8">
                <div className="flex flex-row items-baseline gap-6">
                    {strip('solid')}
                    {bar}
                </div>
                <div className="flex flex-row items-baseline gap-6">
                    {strip('underlined', 'border-b border-control-border')}
                    {bar}
                </div>
                <div className="flex flex-row items-baseline gap-6">
                    {strip('underlined')}
                    {bar}
                </div>
            </div>
        );
    }
};

/**
 * More options than the strip has room for. Each combination scrolls rather
 * than squashing the labels.
 */
export const Overflowing: Story = {
    render: () => (
        <div className="space-y-8">
            <TabsPreview options={manyOptions} variant="underlined" />
            <TabsPreview options={manyOptions} variant="solid" />
            <TabsPreview options={manyOptions} variant="underlined" withFullWidth />
            <TabsPreview options={manyOptions} variant="underlined" withEqualWidthOptions />
        </div>
    )
};
