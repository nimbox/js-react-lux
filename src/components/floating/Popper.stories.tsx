import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { Button } from '../Button';
import { cn } from '../utilities/cn';
import { Popper, type PopperPlacement } from './Popper';


// Definition

const meta: Meta<typeof Popper> = {
    component: Popper,
    parameters: {
        layout: 'centered',
        // `reference` is a DOM element the story owns, and `ref` is how it
        // gets one back, so neither is the panel's to set.
        controls: { include: ['withPlacement', 'withArrow', 'withSameWidth', 'className'] }
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Popper>;

// Templates

/**
 * The surface a caller has to bring. `Popper` positions and portals, and draws
 * nothing at all — no background, no border, no radius — so a popper with no
 * classes of its own is invisible over whatever it lands on.
 */
const SURFACE = 'p-3 bg-control-bg border border-control-border rounded-surface shadow';

/**
 * `reference` takes a DOM element rather than a ref object, so the trigger is
 * held in state: a ref object would still be `null` on the render that mounts
 * the panel, and nothing would tell the story to render again once it filled.
 * Hence `useState` and the `!` on first use — the panel only renders once
 * there is something to hang it on.
 */
const PopperTemplate: Story = {
    render: (args) => {

        const [reference, setReference] = useState<HTMLButtonElement | null>(null);
        const [show, setShow] = useState(true);

        return (
            <div className="p-16">
                <Button ref={setReference} variant="outlined" onClick={() => setShow(!show)}>
                    {show ? 'Hide' : 'Show'} the popper
                </Button>
                {show && reference &&
                    <Popper {...args} reference={reference} className={args.className ?? SURFACE}>
                        <div className="w-48">Anchored to the button.</div>
                    </Popper>
                }
            </div>
        );

    }
};

// Stories

export const Primary: Story = {
    ...PopperTemplate,
    args: {
        withPlacement: 'bottom-start',
        withArrow: false,
        withSameWidth: false
    }
};

export const WithArrow: Story = {
    ...PopperTemplate,
    args: {
        ...Primary.args,
        withPlacement: 'bottom',
        withArrow: true
    }
};

/**
 * Every placement at once. `flip` and `shift` are always on, so a popper with
 * no room where it was asked to go moves rather than spilling off screen —
 * which is why these are spaced out enough to each get their way.
 */
export const Placements: Story = {
    render: () => {
        const placements: PopperPlacement[] = [
            'top-start', 'top', 'top-end',
            'left-start', 'left', 'left-end',
            'right-start', 'right', 'right-end',
            'bottom-start', 'bottom', 'bottom-end'
        ];
        return (
            <div className="grid grid-cols-3 gap-x-40 gap-y-28 p-28">
                {placements.map((placement) => (
                    <PlacedPopper key={placement} placement={placement} />
                ))}
            </div>
        );
    }
};

function PlacedPopper({ placement }: { placement: PopperPlacement }) {

    const [reference, setReference] = useState<HTMLDivElement | null>(null);

    return (
        <div
            ref={setReference}
            className="w-28 py-2 text-center text-xs bg-control-fill rounded-control"
        >
            {placement}
            {reference &&
                <Popper reference={reference} withPlacement={placement} withArrow className={SURFACE}>
                    <div className="text-xs whitespace-nowrap">{placement}</div>
                </Popper>
            }
        </div>
    );

}

/**
 * `withSameWidth` pins the panel to the width of what it is anchored to. It is
 * what makes a select's list line up with its field rather than sizing itself
 * to the longest option.
 */
export const SameWidth: Story = {
    render: () => {

        const [narrow, setNarrow] = useState<HTMLDivElement | null>(null);
        const [wide, setWide] = useState<HTMLDivElement | null>(null);

        return (
            <div className="flex flex-row gap-16 p-16 pb-40">
                <div ref={setNarrow} className="w-40 py-2 text-center text-xs bg-control-fill rounded-control">
                    narrow reference
                    {narrow &&
                        <Popper reference={narrow} withSameWidth className={SURFACE}>
                            <div className="text-xs">matches the width above</div>
                        </Popper>
                    }
                </div>
                <div ref={setWide} className="w-80 py-2 text-center text-xs bg-control-fill rounded-control">
                    wide reference
                    {wide &&
                        <Popper reference={wide} withSameWidth className={SURFACE}>
                            <div className="text-xs">matches the width above</div>
                        </Popper>
                    }
                </div>
            </div>
        );

    }
};

/**
 * A reference in the corner of the viewport, with a panel too wide to sit over
 * it. `shift()` slides the panel back into view and the arrow would otherwise
 * follow the reference to the far end of it, where the outline breaks: the
 * arrow's base runs out of straight border to stand on, the radius having
 * already curved it away.
 *
 * `ARROW_PADDING` is what holds it clear of the corner, so here the arrow stops
 * short of the reference rather than hanging off the curve. This is the case
 * that padding exists for — keep it working.
 */
export const ArrowOverTheCorner: Story = {
    render: () => {

        const [reference, setReference] = useState<HTMLButtonElement | null>(null);

        return (
            <div className="h-screen w-screen">
                <p className="p-4 text-sm text-muted">
                    The trigger is pinned to the bottom-right of the viewport.
                </p>
                <button
                    ref={setReference}
                    className="fixed right-2 bottom-16 px-2 text-lg leading-none"
                >
                    &hellip;
                </button>
                {reference &&
                    <Popper
                        reference={reference}
                        withPlacement="top"
                        withArrow
                        className={SURFACE}
                    >
                        <div className="w-96 text-sm">
                            A panel far wider than the room to the right of its trigger.
                        </div>
                    </Popper>
                }
            </div>
        );

    }
};

/**
 * A reference inside something that scrolls. Scroll the list and the trigger
 * leaves; the panel has to leave with it.
 *
 * It would not otherwise. `shift()` holds the panel inside view, which is what
 * keeps it from being cut off at an edge and equally what strands it here — the
 * reference goes, the panel is held back, and it hangs over the list anchored
 * to nothing. `hide()` is what notices.
 */
export const ScrolledOutOfView: Story = {
    render: () => {

        const [reference, setReference] = useState<HTMLDivElement | null>(null);

        return (
            <div className="p-16">
                <div className="h-48 w-72 overflow-y-auto border border-control-border rounded-surface">
                    {Array.from({ length: 20 }, (_, index) => (
                        <div
                            key={index}
                            ref={index === 2 ? setReference : undefined}
                            className={cn(
                                'px-3 py-2 text-sm',
                                index === 2 && 'bg-control-fill font-bold'
                            )}
                        >
                            Row {index + 1}{index === 2 ? ' — the trigger' : ''}
                        </div>
                    ))}
                </div>
                {reference &&
                    <Popper reference={reference} withPlacement="right" withArrow className={SURFACE}>
                        <div className="w-56 text-sm">Anchored to row 3.</div>
                    </Popper>
                }
            </div>
        );

    }
};

/**
 * `Popper` does not dismiss itself — it has no opinion about why it is open,
 * so closing is the caller's. Pair it with `useOnOutsideClick`, passing both
 * the trigger and the panel so that clicking either one is not "outside".
 *
 * This is the whole of what `ActionButton` does, and what the `*Popper` field
 * wrappers do for a field.
 */
export const Dismissal: Story = {
    render: () => {

        const [show, setShow] = useState(false);
        const [reference, setReference] = useState<HTMLButtonElement | null>(null);
        const [panel, setPanel] = useState<HTMLDivElement | null>(null);

        useOnOutsideClick(show, () => setShow(false), reference, panel);

        return (
            <div className="p-16">
                <Button ref={setReference} variant="outlined" onClick={() => setShow(!show)}>
                    Open, then click away
                </Button>
                {show && reference &&
                    <Popper ref={setPanel} reference={reference} className={SURFACE}>
                        <div className="w-56 text-sm">
                            Clicking anywhere outside this panel or the button closes it.
                        </div>
                    </Popper>
                }
            </div>
        );

    }
};
