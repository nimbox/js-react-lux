import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { action } from 'storybook/actions';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { Button } from '../Button';
import { cn } from '../utilities/cn';
import { CheckBox } from './CheckBox';
import { Radio } from './Radio';
import { TaskCheckBox, TaskCheckBoxSlot, type TaskCheckBoxState } from './TaskCheckBox';


// Definition

const meta: Meta<typeof TaskCheckBox> = {

    component: TaskCheckBox,
    parameters: {
        // The props are intersected with every attribute of an html input, so
        // name the ones worth playing with.
        controls: {
            include: ['defaultValue', 'disabled', 'error', 'children', 'name', 'data-tooltip']
        }
    },
    tags: ['autodocs'],

    argTypes: {
        defaultValue: {
            control: 'radio',
            options: ['idle', 'positive', 'negative']
        }
    }

    // `defaultValue` stays out of `args`: the controlled template passes
    // `value`, and an input given both warns.

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
            <div><TaskCheckBox defaultValue="idle" onChange={action('onChange')} /> <Label>Idle</Label></div>
            <div><TaskCheckBox defaultValue="positive" onChange={action('onChange')} /> <Label>Positive</Label></div>
            <div><TaskCheckBox defaultValue="negative" onChange={action('onChange')} /> <Label>Negative</Label></div>
            <div><TaskCheckBox defaultValue="idle" disabled /> <Label>Idle, disabled</Label></div>
            <div><TaskCheckBox defaultValue="positive" disabled /> <Label>Positive, disabled</Label></div>
            <div><TaskCheckBox defaultValue="negative" disabled /> <Label>Negative, disabled</Label></div>
        </div>
    )
};

/**
 * `error` colours the border, the fill and the slash `danger` — the colour
 * `Field` gives a field in error, for an outcome that is overdue or one a form
 * is refusing to accept.
 */
export const Error: Story = {
    render: () => (
        <div>
            <div><TaskCheckBox error defaultValue="idle" /> <Label>Idle</Label></div>
            <div><TaskCheckBox error defaultValue="positive" /> <Label>Positive</Label></div>
            <div><TaskCheckBox error defaultValue="negative" /> <Label>Negative</Label></div>
            <div><TaskCheckBox error defaultValue="positive" disabled /> <Label>Positive, disabled</Label></div>
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
            <div><TaskCheckBox defaultValue="idle" onChange={action('onChange')}>Write the migration</TaskCheckBox></div>
            <div><TaskCheckBox defaultValue="positive" onChange={action('onChange')}>Review the schema</TaskCheckBox></div>
            <div><TaskCheckBox defaultValue="idle" disabled>Not yours to decide</TaskCheckBox></div>
        </div>
    )
};

/**
 * The two boxes a task row draws: the responsible's outcome and the
 * accountable's approval. One component serves both because `rejected` and `not
 * approved` are the same shape of outcome, so they get the same mark.
 *
 * The action names read as what the row's owner does with the change it is told
 * about. A press only ever moves between `idle` and `positive`; the `negative`
 * boxes here were set that way, not pressed there.
 */
export const AsATaskRow: Story = {
    render: () => (
        <div className="space-y-1">
            <div>
                <TaskCheckBox defaultValue="idle" onChange={action('fulfil')} />{' '}
                <TaskCheckBox defaultValue="idle" disabled />{' '}
                <Label>Nobody has decided anything</Label>
            </div>
            <div>
                <TaskCheckBox defaultValue="positive" onChange={action('reopen')} />{' '}
                <TaskCheckBox defaultValue="idle" onChange={action('approve')} />{' '}
                <Label>Done, waiting to be approved</Label>
            </div>
            <div>
                <TaskCheckBox defaultValue="positive" disabled />{' '}
                <TaskCheckBox defaultValue="positive" onChange={action('unapprove')} />{' '}
                <Label>Done and approved</Label>
            </div>
            <div>
                <TaskCheckBox defaultValue="positive" onChange={action('reopen')} />{' '}
                <TaskCheckBox defaultValue="negative" onChange={action('approve')} />{' '}
                <Label>Done, and not accepted</Label>
            </div>
            <div>
                <TaskCheckBox defaultValue="negative" onChange={action('reopen')} />{' '}
                <TaskCheckBox defaultValue="idle" disabled />{' '}
                <Label>Given up on</Label>
            </div>
            <div>
                <TaskCheckBox defaultValue="idle" onChange={action('fulfil')} />{' '}
                <TaskCheckBoxSlot />{' '}
                <Label>Nobody is accountable, so there is nothing to approve</Label>
            </div>
        </div>
    )
};

/**
 * `TaskCheckBoxSlot` holds the column open. Read down the left edge: the labels
 * start in the same place whether or not the task has an approval to show.
 */
export const WithSlot: Story = {
    render: () => (
        <div>
            <div><TaskCheckBox defaultValue="positive" /> <TaskCheckBox defaultValue="idle" /> <Label>Has an accountable</Label></div>
            <div><TaskCheckBox defaultValue="positive" /> <TaskCheckBoxSlot /> <Label>Has none</Label></div>
        </div>
    )
};

/**
 * **What to check:** the split between what a press can do and what only the
 * caller can do. A press runs `idle → positive → idle` and never reaches
 * `negative` — giving up on a task is not the same gesture as doing it. The
 * buttons set it from outside, which is the only way `negative` is entered.
 */
export const Pressing: Story = {
    render: () => {

        const [state, setState] = useState<TaskCheckBoxState>('idle');

        return (
            <div className="space-y-2">
                <div>
                    <TaskCheckBox value={state} onChange={(event) => setState(event.target.value as TaskCheckBoxState)} />{' '}
                    <Label>{state}</Label>
                </div>
                <div className="flex flex-row gap-x-2">
                    {(['idle', 'positive', 'negative'] as TaskCheckBoxState[]).map(value =>
                        <Button key={value} type="button" semantic="secondary" onClick={() => setState(value)}>{value}</Button>
                    )}
                </div>
            </div>
        );

    }
};

/**
 * **What to check:** hover the disabled box — the tooltip must still appear,
 * and a box you cannot press is the one owing the reader an explanation.
 *
 * It sits on the wrapper rather than the button. Chrome resolves it from
 * either, having been measured raising `mouseover` on a disabled button; the
 * wrapper is for the engines that suppress mouse events on disabled controls,
 * as Gecko has long done. Worth re-checking if the browsers change.
 */
export const DisabledTooltip: Story = {
    render: () => (
        <div className="space-x-4">
            <TaskCheckBox defaultValue="idle" data-tooltip="Dar esta tarea por cumplida" onChange={action('onChange')} />
            <TaskCheckBox defaultValue="idle" disabled data-tooltip="Sólo Mey puede aprobar esta tarea" />
        </div>
    )
};

/**
 * Sized in `em`, so a row sets the size by setting a font size.
 *
 * **What to check:** all three controls are the same size, the same corner, and
 * sit on the same baseline at every size.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-row justify-between items-baseline">
            {['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'].map(size =>
                <div key={size} className={size}>
                    <TaskCheckBox defaultValue="positive" /> <TaskCheckBox defaultValue="negative" /> <CheckBox checked readOnly /> <Radio checked readOnly /> <Label>Aa</Label>
                </div>
            )}
        </div>
    )
};

/**
 * **What to check:** *Force* writes `negative`, and `negative` is not somewhere
 * a press can go — so if the box shows it, it came from outside.
 */
export const Controlled: Story = {
    render: (args) => <ControlledTemplate component={TaskCheckBox} componentProps={args} initial="idle" forced="negative" />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate component={TaskCheckBox} componentProps={args} initial="idle" forced="negative" />
};

/**
 * `{...register('field')}` and nothing else — no `Controller`. Submit reports
 * the state string the box is showing, and *Force* is `setValue`.
 */
export const HookForm: Story = {
    render: (args) => <HookFormTemplate component={TaskCheckBox} componentProps={args} initial="idle" forced="negative" />
};
