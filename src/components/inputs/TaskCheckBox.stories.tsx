import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { action } from 'storybook/actions';
import { cn } from '../utilities/cn';
import { CheckBox } from './CheckBox';
import { TaskCheckBox, TaskCheckBoxSlot, type TaskCheckBoxState } from './TaskCheckBox';


// Definition

const meta: Meta<typeof TaskCheckBox> = {
    component: TaskCheckBox
};

export default meta;
type Story = StoryObj<typeof TaskCheckBox>;

// Templates

const Label = ({ className, children }: { className?: string, children: React.ReactNode }) =>
    <span className={cn('border-t border-b', className)}>{children}</span>;

// Stories

export const Primary: Story = {
    render: () => (
        <div>
            <div><TaskCheckBox state="idle" onChange={action('onChange')} /> <Label>Idle</Label></div>
            <div><TaskCheckBox state="positive" onChange={action('onChange')} /> <Label>Positive</Label></div>
            <div><TaskCheckBox state="negative" onChange={action('onChange')} /> <Label>Negative</Label></div>
            <div><TaskCheckBox state="idle" disabled /> <Label>Idle, not yours to decide</Label></div>
            <div><TaskCheckBox state="positive" disabled /> <Label>Positive, not yours to decide</Label></div>
            <div><TaskCheckBox state="negative" disabled /> <Label>Negative, not yours to decide</Label></div>
        </div>
    )
};

/**
 * The two boxes a task row draws: the responsible's execution outcome and the
 * accountable's approval. The point of one component for both is that
 * `rejected` and `not approved` are the same shape of outcome, so they get the
 * same mark.
 */
export const AsATaskRow: Story = {
    render: () => (
        <div className="space-y-1">
            <div>
                <TaskCheckBox state="idle" onChange={action('fulfil')} />{' '}
                <TaskCheckBox state="idle" disabled />{' '}
                <Label>Nobody has decided anything</Label>
            </div>
            <div>
                <TaskCheckBox state="positive" onChange={action('reopen')} />{' '}
                <TaskCheckBox state="idle" onChange={action('approve')} />{' '}
                <Label>Done, waiting to be approved</Label>
            </div>
            <div>
                <TaskCheckBox state="positive" disabled />{' '}
                <TaskCheckBox state="positive" onChange={action('unapprove')} />{' '}
                <Label>Done and approved</Label>
            </div>
            <div>
                <TaskCheckBox state="positive" onChange={action('reopen')} />{' '}
                <TaskCheckBox state="negative" onChange={action('approve')} />{' '}
                <Label>Done, and not accepted</Label>
            </div>
            <div>
                <TaskCheckBox state="negative" onChange={action('reopen')} />{' '}
                <TaskCheckBox state="idle" disabled />{' '}
                <Label>Given up on</Label>
            </div>
            <div>
                <TaskCheckBox state="idle" onChange={action('fulfil')} />{' '}
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
            <div><TaskCheckBox state="positive" /> <TaskCheckBox state="idle" /> <Label>Has an accountable</Label></div>
            <div><TaskCheckBox state="positive" /> <TaskCheckBoxSlot /> <Label>Has none</Label></div>
        </div>
    )
};

/**
 * Sized in `em`, so a row sets the size by setting a font size. The same story
 * `CheckBox` tells, and they are meant to match — a task row may hold both.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-row justify-between items-baseline">
            {['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'].map(size =>
                <div key={size} className={size}>
                    <TaskCheckBox state="positive" /> <TaskCheckBox state="negative" /> <CheckBox checked readOnly /> <Label>Aa</Label>
                </div>
            )}
        </div>
    )
};

/**
 * **What to check:** hover the disabled box. The tooltip must still appear — a
 * box you cannot press is precisely the one that owes the reader an explanation.
 *
 * The tooltip is set on the wrapper span rather than the button. In Chrome that
 * makes no difference: a disabled button was measured raising `mouseover`
 * normally, and `TooltipProvider`'s `closest('[data-tooltip]')` resolves it from
 * either place. The wrapper is for engines that suppress mouse events on
 * disabled form controls, as Gecko has long done. Worth re-checking here if the
 * supported browsers change.
 */
export const DisabledTooltip: Story = {
    render: () => (
        <div className="space-x-4">
            <TaskCheckBox state="idle" data-tooltip="Dar esta tarea por cumplida" onChange={action('onChange')} />
            <TaskCheckBox state="idle" disabled data-tooltip="Sólo Mey puede aprobar esta tarea" />
        </div>
    )
};

/**
 * The box holds no state of its own — it reports the press and redraws from
 * whatever it is handed back. This story cycles the three states so the
 * transitions can be watched; a real caller maps them onto task outcomes.
 */
export const Cycling: Story = {
    render: () => {

        const order: TaskCheckBoxState[] = ['idle', 'positive', 'negative'];
        const [state, setState] = useState<TaskCheckBoxState>('idle');

        return (
            <div>
                <TaskCheckBox
                    state={state}
                    onChange={() => setState(order[(order.indexOf(state) + 1) % order.length])}
                />{' '}
                <Label>{state}</Label>
            </div>
        );

    }
};
