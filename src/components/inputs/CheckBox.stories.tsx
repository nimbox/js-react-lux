import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { action } from 'storybook/actions';
import { ControlledCheckedTemplate, HookFormCheckedTemplate, UncontrolledCheckedTemplate } from '../../templates/CheckedInputTemplates';
import { cn } from '../utilities/cn';
import { CheckBox } from './CheckBox';
import { Radio } from './Radio';
import { TaskCheckBox } from './TaskCheckBox';


// Definition

const meta: Meta<typeof CheckBox> = {

    component: CheckBox,
    parameters: {
        // The props are intersected with every attribute of an html input, so
        // name the ones worth playing with.
        controls: {
            include: ['checked', 'defaultChecked', 'indeterminate', 'disabled', 'error', 'children', 'name']
        }
    },
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>;

// Templates

const Label = ({ className, children }: { className?: string, children: ReactNode }) =>
    <span className={cn('border-t border-b', className)}>{children}</span>;

// Stories

export const Primary: Story = {
    render: () => (
        <div>
            <div><CheckBox defaultChecked={false} /> <Label>Unchecked</Label></div>
            <div><CheckBox defaultChecked={true} /> <Label>Checked</Label></div>
            <div><CheckBox indeterminate /> <Label>Indeterminate</Label></div>
            <div><CheckBox defaultChecked={false} disabled /> <Label>Unchecked, disabled</Label></div>
            <div><CheckBox defaultChecked={true} disabled /> <Label>Checked, disabled</Label></div>
            <div><CheckBox indeterminate disabled /> <Label>Indeterminate, disabled</Label></div>
        </div>
    )
};

/**
 * `error` colours the border, the fill and the minus `danger` — the colour
 * `Field` gives a field in error, so a box and the field above it say the same
 * thing the same way.
 */
export const Error: Story = {
    render: () => (
        <div>
            <div><CheckBox error defaultChecked={false} /> <Label>Unchecked</Label></div>
            <div><CheckBox error defaultChecked={true} /> <Label>Checked</Label></div>
            <div><CheckBox error indeterminate /> <Label>Indeterminate</Label></div>
            <div><CheckBox error defaultChecked={true} disabled /> <Label>Checked, disabled</Label></div>
        </div>
    )
};

/**
 * **What to check:** click the words, not the box. `children` wraps both in a
 * real `label`, so the text is a hit target too.
 */
export const WithLabel: Story = {
    render: () => (
        <div className="space-y-1">
            <div><CheckBox name="terms" onChange={(event) => action('onChange')(event.target.checked)}>I accept the terms</CheckBox></div>
            <div><CheckBox name="news" defaultChecked>Send me the newsletter</CheckBox></div>
            <div><CheckBox name="off" disabled>Not yours to decide</CheckBox></div>
        </div>
    )
};

/**
 * `indeterminate` is a property of the node rather than an attribute, so React
 * never writes it and this sets it through the ref.
 *
 * **What to check:** press the child boxes. The parent has to be told what to
 * show. The browser clears `indeterminate` the moment a box is clicked, so it
 * is the caller's to keep, exactly as `checked` is on a controlled input.
 */
export const Indeterminate: Story = {
    render: () => {

        const [chosen, setChosen] = useState([true, false, false]);
        const count = chosen.filter(Boolean).length;

        return (
            <div className="space-y-1">
                <CheckBox
                    checked={count === chosen.length}
                    indeterminate={count > 0 && count < chosen.length}
                    onChange={(event) => setChosen(chosen.map(() => event.target.checked))}
                >All</CheckBox>
                {chosen.map((isChosen, index) =>
                    <div key={index} className="ml-6">
                        <CheckBox
                            checked={isChosen}
                            onChange={(event) => setChosen(chosen.map((c, i) => i === index ? event.target.checked : c))}
                        >Item {index + 1}</CheckBox>
                    </div>
                )}
            </div>
        );

    }
};

/**
 * **What to check:** the box sits on the text baseline inside an inline flex
 * row too. The rules above and below the label are the ruler.
 */
export const InsideInlineFlex: Story = {
    render: () => (
        <div className="text-base">
            Before <span className="inline-flex flex-row items-center space-x-1"><CheckBox checked readOnly /><Label className="self-baseline">Checked</Label></span> after
        </div>
    )
};

/**
 * Sized in `em`, so a row sets the size by setting a font size. `className`
 * lands on the box for exactly this reason — it is the element the `em`
 * resolves against.
 *
 * **What to check:** all three controls are the same size, the same corner, and
 * sit on the same baseline at every size.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-row justify-between items-baseline">
            {['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'].map(size =>
                <div key={size} className={size}>
                    <CheckBox checked readOnly /> <CheckBox indeterminate /> <Radio checked readOnly /> <TaskCheckBox defaultValue="positive" /> <Label>Aa</Label>
                </div>
            )}
        </div>
    )
};

/**
 * **What to check:** *Force* reaches the box through its ref alone —
 * `ref.current.click()`, no React involved — and the parent's state follows.
 * React detects a checkbox changing from `click` rather than `change`, which is
 * why it is a click and not a dispatched event.
 */
export const Controlled: Story = {
    render: (args) => <ControlledCheckedTemplate component={CheckBox} componentProps={args} initial={false} />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledCheckedTemplate component={CheckBox} componentProps={args} initial={false} />
};

/**
 * `{...register('field')}` and nothing else — no `Controller`.
 *
 * **What to check:** *Force* is `setValue` and *Reset* is `reset`. Both write
 * `checked` onto the node and fire no event; the box follows anyway, because it
 * reads `:checked` from the DOM, not a copy. That is why the mark is CSS.
 */
export const HookForm: Story = {
    render: (args) => <HookFormCheckedTemplate component={CheckBox} componentProps={args} initial={false} />
};
