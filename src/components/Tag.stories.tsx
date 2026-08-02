import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';
import { fn } from 'storybook/test';
import { Wrapper } from './inputs/Wrapper';
import { Input } from './inputs/Input';
import { CrossIcon } from '@nimbox/icons-react';


// Definition

const meta: Meta<typeof Tag> = {
    component: Tag
};

export default meta;
type Story = StoryObj<typeof Tag>;

// Stories

export const DifferentScalesSameBase: Story = {
    render: () => {
        return (
            <div className="p-2">
                <span className="text-sm"><span className="bg-red-100">Text Small XXX</span> <Tag>Tag</Tag> </span>
                <span className="text-base"><span className="bg-red-100">Text Base XXX</span> <Tag>Tag</Tag> </span>
                <span className="text-lg"><span className="bg-red-100">Text Large XXX</span> <Tag>Tag</Tag> </span>
                <span className="text-xl"><span className="bg-red-100">Text Extra Large XXX</span> <Tag>Tag</Tag> </span>
            </div>
        );
    }
};

/**
 * A deletable tag against a plain one, at five type sizes.
 *
 * **The two are no longer the same width**, and the name of this story is kept
 * only because renaming it would break its link. They used to match because one
 * glyph on the left did both jobs — it was a dot until the tag became
 * deletable, and then it was a cross. Now the dot stays and the cross is its
 * own control at the other end, so a deletable tag is exactly one glyph wider
 * than a plain one. That is the honest width: it has one more thing in it.
 *
 * What this story is still for is the part that has to hold — both glyphs are
 * sized in `em`, so the whole chip scales with its type rather than sitting at
 * a fixed pixel size inside larger text.
 */
export const WithAndWithoutSameWidth: Story = {
    render: () => {
        return (
            <div className="flex flex-row justify-between items-center">
                <div className="text-xs">
                    <div><Tag>TagXÉ</Tag></div>
                    <div><Tag onDelete={fn()}>TagXÉ</Tag></div>
                </div>
                <div className="text-sm">
                    <div><Tag>TagXÉ</Tag></div>
                    <div><Tag onDelete={fn()}>TagXÉ</Tag></div>
                </div>
                <div className="text-base">
                    <div><Tag>TagXÉ</Tag></div>
                    <div><Tag onDelete={fn()}>TagXÉ</Tag></div>
                </div>
                <div className="text-lg">
                    <div><Tag>TagXÉ</Tag></div>
                    <div><Tag onDelete={fn()}>TagXÉ</Tag></div>
                </div>
                <div className="text-xl">
                    <div><Tag>TagXÉ</Tag></div>
                    <div><Tag onDelete={fn()}>TagXÉ</Tag></div>
                </div>
            </div>
        );
    }
};

export const WithDifferentActions: Story = {
    render: () => {
        return (
            <div className="flex flex-row justify-between items-center">
                <div><Tag>Plain</Tag></div>
                <div><Tag onClick={fn()}>With onClick</Tag></div>
                <div><Tag onDelete={fn()}>With onDelete</Tag></div>
                <div><Tag onClick={fn()} onDelete={fn()}>Width onClick and onDelete</Tag></div>
            </div>
        );
    }
};

/**
 * The dot and the cross are two glyphs at two ends, not one glyph doing two
 * jobs. A tag can therefore show a dot *and* offer a delete at the same time,
 * which is what makes the dot free to mean something.
 *
 * `withSolidDot` fills it in the text colour. It says nothing on its own — the
 * caller decides what a solid dot is for. `TagCondition` uses it for negation.
 */
export const DotAndCross: Story = {
    render: () => {

        // Light, dark, and the no-background case where `Tag` picks the text
        // colour itself. The solid dot has to stay legible in all three, which
        // is the whole reason it is a boolean and not a colour.

        const swatches = [
            { name: 'Default', color: undefined, backgroundColor: undefined },
            { name: 'Light', color: '#7c2d12', backgroundColor: '#ffedd5' },
            { name: 'Dark', color: '#ffffff', backgroundColor: '#3730a3' },
            { name: 'Mid', color: '#1e3a5f', backgroundColor: '#bfdbfe' }
        ];

        return (
            <div className="p-4 space-y-6">

                <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider text-gray-500">Geometry</div>
                    <div className="flex flex-row items-center gap-4">
                        <Tag>dot only</Tag>
                        <Tag onDelete={fn()}>dot left, cross right</Tag>
                        <Tag withSolidDot onDelete={fn()}>solid dot and cross</Tag>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider text-gray-500">Solid against every background</div>
                    <div className="flex flex-row items-center gap-4">
                        {swatches.map(swatch =>
                            <div key={swatch.name} className="flex flex-col items-start gap-1">
                                <Tag color={swatch.color} backgroundColor={swatch.backgroundColor}>{swatch.name}</Tag>
                                <Tag withSolidDot color={swatch.color} backgroundColor={swatch.backgroundColor}>{swatch.name}</Tag>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider text-gray-500">
                        As `TagCondition` uses it — solid dot, struck label, cross to remove
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <Tag color="#7c2d12" backgroundColor="#ffedd5" onClick={fn()} onDelete={fn()}>Moroso</Tag>
                        <Tag color="#7c2d12" backgroundColor="#ffedd5" withSolidDot onClick={fn()} onDelete={fn()} className="line-through">Moroso</Tag>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider text-gray-500">Both glyphs scale with the type</div>
                    <div className="flex flex-row items-baseline gap-4">
                        <span className="text-xs"><Tag withSolidDot onDelete={fn()}>TagXÉ</Tag></span>
                        <span className="text-sm"><Tag withSolidDot onDelete={fn()}>TagXÉ</Tag></span>
                        <span className="text-base"><Tag withSolidDot onDelete={fn()}>TagXÉ</Tag></span>
                        <span className="text-lg"><Tag withSolidDot onDelete={fn()}>TagXÉ</Tag></span>
                        <span className="text-xl"><Tag withSolidDot onDelete={fn()}>TagXÉ</Tag></span>
                    </div>
                </div>

            </div>
        );
    }
};

export const SpacingWithSpaces: Story = {
    render: () => {
        return (
            <span>before <Tag>Plain</Tag> <Tag>Plain</Tag> <Tag>Plain</Tag> after</span>
        );
    }
};

export const SpacingWithFlex: Story = {
    render: () => {
        return (
            <span>before <span className="inline-flex flex-inline-row flex-wrap items-center gap-1"><Tag>Plain</Tag><Tag>Plain</Tag><Tag>Plain</Tag></span> after</span>
        );
    }
};

export const SpacingWithFlexMultiLine: Story = {
    render: () => {
        return (
            <div className="flex flex-row flex-wrap items-center gap-1 text-base">
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
                <Tag>Plain</Tag>
            </div>
        );
    }
};

export const InsideAnInputExtraSmall: Story = {
    render: () => {
        return (
            <div className="grid grid-cols-2 items-center gap-1 text-xs">
                <Wrapper className="flex flex-row flex-wrap items-center gap-1">
                    <Tag>Plain</Tag>
                    <Tag>Plain</Tag>
                    <Tag onDelete={fn()}>With onDelete</Tag>
                    <Tag onDelete={fn()}>With onDelete</Tag>
                    <Tag>Plain</Tag>
                </Wrapper>
                <Input type="text" defaultValue="Text XS" />
            </div>
        );
    }
};

export const InsideAnInputSmall: Story = {
    render: () => {
        return (
            <div className="grid grid-cols-2 items-center gap-1 text-sm">
                <Wrapper className="flex flex-row flex-wrap items-center gap-1">
                    <Tag>Plain</Tag>
                    <Tag>Plain</Tag>
                    <Tag onDelete={fn()}>With onDelete</Tag>
                    <Tag onDelete={fn()}>With onDelete</Tag>
                    <Tag>Plain</Tag>
                </Wrapper>
                <Input type="text" defaultValue="Text SM" />
            </div>
        );
    }
};

export const InsideAnInputBase: Story = {
    render: () => {
        return (
            <div className="grid grid-cols-2 items-center gap-1 text-base">
                <Wrapper className="flex flex-row flex-wrap items-center gap-1">
                    <Tag>Plain</Tag>
                    <Tag>Plain</Tag>
                    <Tag onDelete={fn()}>With onDelete</Tag>
                    <Tag onDelete={fn()}>With onDelete</Tag>
                    <Tag>Plain</Tag>
                </Wrapper>
                <Input type="text" defaultValue="Text BASE" />
            </div>
        );
    }
};

export const InsideAnInputLarge: Story = {
    render: () => {
        return (
            <div className="grid grid-cols-2 items-center gap-1 text-lg">
                <Wrapper className="flex flex-row flex-wrap items-center gap-1">
                    <Tag>Plain</Tag>
                    <Tag>Plain</Tag>
                    <Tag onDelete={fn()}>With onDelete</Tag>
                    <Tag>Plain</Tag>
                </Wrapper>
                <Input type="text" defaultValue="Text LG" />
            </div>
        );
    }
};

// For the documentation

export const DocumentationInlineBlock: Story = {
    render: () => {
        return (
            <div>
                <div>
                    before <span className="inline-block max-w-full truncate bg-red-100">tex</span> after
                </div>
                <div className="bg-gray-100">
                    before <span className="inline-block max-w-full truncate bg-red-100">tex text text text text text text text text text text text text  text text text  text text text  text text text</span> after
                </div>
            </div>
        );
    }
};

export const DocumentationFlexBlock: Story = {
    render: () => {
        return (
            <div>
                <div>
                    before <span className="inline-flex flex-row max-w-full bg-red-200">
                        <span className="inline-block max-w-full truncate bg-red-100">tex</span>
                    </span> after
                </div>
                <div className="bg-gray-100">
                    before <span className="inline-flex flex-row max-w-full bg-red-200">
                        <span className="inline-block max-w-full truncate bg-red-100">tex text text text text text text text text text text text text  text text text  text text text  text text text</span>
                    </span> after
                </div>
            </div>
        );
    }
};

export const DocumentationFlexIconBlock: Story = {
    render: () => {
        return (
            <div>
                <div>
                    before <span className="inline-flex flex-row items-baseline py-0.5 max-w-full bg-red-200"><CrossIcon className="flex-none self-center bg-red-300" width="0.75em" height="0.75em" /><span className="inline-block max-w-full truncate bg-red-100" style={{ height: '1em', lineHeight: '1em' }}>tex</span></span> after
                </div>
                <div className="bg-gray-100">
                    before <span className="inline-flex flex-row items-baseline py-0.5 max-w-full bg-red-200"><CrossIcon className="flex-none self-center bg-red-300" width="0.75em" height="0.75em" /><span className="inline-block max-w-full truncate bg-red-100" style={{ height: '1em', lineHeight: '1em' }}>tex text text text text text text text text text text text text  text text text  text text text  text text text</span></span> after
                </div>
            </div>
        );
    }
};

export const DocumentationFlexIconPaddingBlock: Story = {
    render: () => {
        return (
            <div>
                <div>
                    before <span className="inline-flex flex-row items-baseline px-1 py-0.5 max-w-full bg-red-200 rounded-full"><CrossIcon className="flex-none self-center bg-red-300 rounded rounded-full" width="0.75em" height="0.75em" style={{ marginRight: '0.25em' }} /><span className="inline-block max-w-full truncate bg-red-100" style={{ height: '1em', lineHeight: '1em' }}>tex</span></span> after
                </div>
                <div className="bg-gray-100">
                    before <span className="inline-flex flex-row items-baseline px-1 py-0.5 max-w-full bg-red-200 rounded-full"><CrossIcon className="flex-none self-center bg-red-300 rounded rounded-full" width="0.75em" height="0.75em" style={{ marginRight: '0.25em' }} /><span className="inline-block max-w-full truncate bg-red-100" style={{ height: '1em', lineHeight: '1em' }}>tex text text text text text text text text text text text text  text text text  text text text  text text text</span></span> after
                </div>
            </div>
        );
    }
};
