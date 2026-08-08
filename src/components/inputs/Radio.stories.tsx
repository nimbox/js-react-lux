import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { action } from 'storybook/actions';
import { Button } from '../Button';
import { cn } from '../utilities/cn';
import { CheckBox } from './CheckBox';
import { Input } from './Input';
import { Radio } from './Radio';
import { TaskCheckBox } from './TaskCheckBox';


// Definition

const meta: Meta<typeof Radio> = {

    component: Radio,
    parameters: {
        // The props are intersected with every attribute of an html input, so
        // name the ones worth playing with.
        controls: {
            include: ['checked', 'defaultChecked', 'disabled', 'error', 'children', 'name']
        }
    },
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>;

// Templates

const Label = ({ className, children }: { className?: string, children: ReactNode }) =>
    <span className={cn('border-t border-b', className)}>{children}</span>;

const colours = ['yellow', 'blue', 'red'];

/**
 * A tab stop either side of a group, because a group is *one* tab stop: Tab
 * enters it at the chosen box and the next Tab leaves it, while the arrows move
 * within. These make that visible, and would show a stray `tabindex` on one of
 * the drawn layers.
 */
const Neighbours = ({ children }: { children: ReactNode }) => (
    <div className="space-y-2">
        <Input type="text" className="w-16" placeholder="before" />
        {children}
        <Input type="text" className="w-16" placeholder="after" />
    </div>
);

// Stories

export const Primary: Story = {
    render: () => (
        <div>
            <div><Radio name="primary" defaultChecked={false} /> <Label>Unchosen</Label></div>
            <div><Radio name="primary" defaultChecked={true} /> <Label>Chosen</Label></div>
            <div><Radio name="off" defaultChecked={false} disabled /> <Label>Unchosen, disabled</Label></div>
            <div><Radio name="off" defaultChecked={true} disabled /> <Label>Chosen, disabled</Label></div>
        </div>
    )
};

/**
 * `error` colours the border and the fill `danger` — the colour `Field` gives
 * a field in error. On a group it goes on every box: the group is what is in
 * error, not one of its options.
 */
export const Error: Story = {
    render: () => (
        <div>
            {colours.map((value, index) =>
                <div key={value}>
                    <Radio error name="error" value={value} defaultChecked={index === 1} /> <Label>{value}</Label>
                </div>
            )}
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
            <div><Radio name="withLabel" value="daily" defaultChecked onChange={(event) => action('onChange')(event.target.value)}>Every day</Radio></div>
            <div><Radio name="withLabel" value="weekly" onChange={(event) => action('onChange')(event.target.value)}>Once a week</Radio></div>
            <div><Radio name="off" value="never" disabled>Not yours to decide</Radio></div>
        </div>
    )
};

/**
 * **What to check:** the inputs underneath are untouched natives, so the group
 * behaves like one — choosing clears the rest, and the arrows move between
 * them once the group has focus.
 */
export const AsAGroup: Story = {
    render: () => (
        <div>
            {colours.map(value =>
                <div key={value}>
                    <Radio name="group" value={value} onChange={(event) => action('onChange')(event.target.value)} /> <Label>{value}</Label>
                </div>
            )}
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
                    <Radio checked readOnly /> <Radio readOnly /> <CheckBox checked readOnly /> <TaskCheckBox defaultValue="positive" /> <Label>Aa</Label>
                </div>
            )}
        </div>
    )
};

/**
 * The trio every input here is shown through, on a group rather than one box:
 * a lone radio cannot be unchosen by pressing it, so alone it shows nothing.
 *
 * **What to check:** choosing one clears the others without the parent doing
 * anything about it.
 */
export const Controlled: Story = {
    render: () => {

        const [colour, setColour] = useState('blue');

        return (
            <form className="w-96 space-y-2" onSubmit={(event) => { event.preventDefault(); action('onSubmit')(colour); }}>
                <Neighbours>
                    {colours.map(value =>
                        <div key={value}>
                            <Radio name="controlled" value={value}
                                checked={colour === value}
                                onChange={(event) => { setColour(event.target.value); action('onChange')(event.target.value); }}
                            /> <Label>{value}</Label>
                        </div>
                    )}
                </Neighbours>
                <div className="flex flex-row gap-x-2">
                    <Button type="button" semantic="secondary" onClick={() => setColour('red')}>Force</Button>
                    <Button>Submit</Button>
                </div>
            </form>
        );

    }
};

/**
 * **What to check:** *Force* reaches the last box through its ref alone —
 * `ref.current.click()` — and the group clears the other two by itself,
 * because the inputs underneath are untouched natives.
 */
export const Uncontrolled: Story = {
    render: () => {

        const lastRef = useRef<HTMLInputElement>(null);

        return (
            <form className="w-96 space-y-2"
                onSubmit={(event) => { event.preventDefault(); action('onSubmit')(new FormData(event.currentTarget).get('uncontrolled')); }}
            >
                <Neighbours>
                    {colours.map((value, index) =>
                        <div key={value}>
                            <Radio name="uncontrolled" value={value}
                                ref={index === colours.length - 1 ? lastRef : undefined}
                                defaultChecked={index === 0}
                                onChange={(event) => action('onChange')(event.target.value)}
                            /> <Label>{value}</Label>
                        </div>
                    )}
                </Neighbours>
                <div className="flex flex-row gap-x-2">
                    <Button type="button" semantic="secondary" onClick={() => lastRef.current?.click()}>Force</Button>
                    <Button type="reset" semantic="secondary">Reset</Button>
                    <Button>Submit</Button>
                </div>
            </form>
        );

    }
};

/**
 * One `register('colour')` spread across every box in the group — no
 * `Controller`.
 *
 * **What to check:** *Force* is `setValue` and *Reset* is `reset`. Both write
 * `checked` onto the matching node and fire no event; the dot follows anyway,
 * because it reads `:checked` from the DOM rather than a copy.
 */
export const HookForm: Story = {
    render: () => {

        const { register, handleSubmit, setValue, reset } = useForm({ defaultValues: { colour: 'blue' } });

        return (
            <form className="w-96 space-y-2" onSubmit={handleSubmit((data) => action('onSubmit')(data))}>
                <Neighbours>
                    {colours.map(value =>
                        <div key={value}>
                            <Radio value={value} {...register('colour')} /> <Label>{value}</Label>
                        </div>
                    )}
                </Neighbours>
                <div className="flex flex-row gap-x-2">
                    <Button type="button" semantic="secondary" onClick={() => setValue('colour', 'red')}>Force</Button>
                    <Button type="button" semantic="secondary" onClick={() => reset({ colour: 'blue' })}>Reset</Button>
                    <Button>Submit</Button>
                </div>
            </form>
        );

    }
};
