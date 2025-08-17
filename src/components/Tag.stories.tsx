import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';
import { fn } from 'storybook/test';
import { Wrapper } from './inputs/Wrapper';
import { Input } from './inputs/Input';
import Cross from '../icons/components/Cross';


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
                    before <span className="inline-flex flex-row items-baseline py-0.5 max-w-full bg-red-200"><Cross className="flex-none self-center bg-red-300" width="0.75em" height="0.75em" /><span className="inline-block max-w-full truncate bg-red-100" style={{ height: '1em', lineHeight: '1em' }}>tex</span></span> after
                </div>
                <div className="bg-gray-100">
                    before <span className="inline-flex flex-row items-baseline py-0.5 max-w-full bg-red-200"><Cross className="flex-none self-center bg-red-300" width="0.75em" height="0.75em" /><span className="inline-block max-w-full truncate bg-red-100" style={{ height: '1em', lineHeight: '1em' }}>tex text text text text text text text text text text text text  text text text  text text text  text text text</span></span> after
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
                    before <span className="inline-flex flex-row items-baseline px-1 py-0.5 max-w-full bg-red-200 rounded-full"><Cross className="flex-none self-center bg-red-300 rounded rounded-full" width="0.75em" height="0.75em" style={{ marginRight: '0.25em' }} /><span className="inline-block max-w-full truncate bg-red-100" style={{ height: '1em', lineHeight: '1em' }}>tex</span></span> after
                </div>
                <div className="bg-gray-100">
                    before <span className="inline-flex flex-row items-baseline px-1 py-0.5 max-w-full bg-red-200 rounded-full"><Cross className="flex-none self-center bg-red-300 rounded rounded-full" width="0.75em" height="0.75em" style={{ marginRight: '0.25em' }} /><span className="inline-block max-w-full truncate bg-red-100" style={{ height: '1em', lineHeight: '1em' }}>tex text text text text text text text text text text text text  text text text  text text text  text text text</span></span> after
                </div>
            </div>
        );
    }
};
