import { FullSquareIcon } from '../../icons/components';
import { Field } from './Field';
import type { Meta, StoryObj } from '@storybook/react';


// Definition

const meta: Meta<typeof Field> = {
    component: Field,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof Field>;

// Template

const FieldTemplate: Story = {
    render: ({ ...args }) => (
        <div className="grid grid-cols-3 gap-x-2 justify-items-center items-baseline">
            <Field variant="outlined" {...args} />
            <Field variant="filled" {...args} />
            <Field variant="inlined" {...args} />
        </div>
    )
};

// Stories

export const Default: Story = {
    ...FieldTemplate,
    args: { label: 'XXXX', shrink: true, children: 'XXXXXXXXXXXX' }
};

// Plain

export const NoLabelContent: Story = {
    ...FieldTemplate,
    args: { children: 'Content' }
};

export const LabelNoContent: Story = {
    ...FieldTemplate,
    args: { label: 'Label', children: '', className: 'w-32' }
};

export const LabelShrinkNoContent: Story = {
    ...FieldTemplate,
    args: { label: 'Label', shrink: true, children: '', className: 'w-32' }
};

export const LabelShrinkContent: Story = {
    ...FieldTemplate,
    args: { label: 'Label', shrink: true, children: 'Content' }
};

// Focus

export const NoLabelContentFocus: Story = {
    ...FieldTemplate,
    args: { ...NoLabelContent, focus: true }
};

export const LabelNoContentFocus: Story = {
    ...FieldTemplate,
    args: { ...LabelNoContent.args, focus: true }
};

export const LabelShrinkNoContentFocus: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkNoContent.args, focus: true }
};

export const LabelShrinkContentFocus: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkContent.args, focus: true }
};

// Focus Within

export const NoLabelContentFocusWithin: Story = {
    ...FieldTemplate,
    args: { ...NoLabelContent, children: <input className="max-w-full" /> }
};

export const LabelNoContentFocusWithin: Story = {
    ...FieldTemplate,
    args: { ...LabelNoContent.args, children: <input className="max-w-full" /> }
};

export const LabelShrinkNoContentFocusWithin: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkNoContent.args, children: <input className="max-w-full" /> }
};

export const LabelShrinkContentFocusWithin: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkContent.args, children: <input className="max-w-full" /> }
};


// Disabled

export const NoLabelContentDisabled: Story = {
    ...FieldTemplate,
    args: { ...NoLabelContent.args, disabled: true }
};

export const LabelNoContentDisabled: Story = {
    ...FieldTemplate,
    args: { ...LabelNoContent.args, disabled: true }
};

export const LabelShrinkNoContentDisabled: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkNoContent.args, disabled: true }
};

export const LabelShrinkContentDisabled: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkContent.args, disabled: true }
};

// Error

export const NoLabelContentError: Story = {
    ...FieldTemplate,
    args: { ...NoLabelContent.args, error: true }
};

export const LabelNoContentError: Story = {
    ...FieldTemplate,
    args: { ...LabelNoContent.args, error: true }
};

export const LabelShrinkNoContentError: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkNoContent.args, error: true }
};

export const LabelShrinkContentError: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkContent.args, error: true }
};

// Start Adornment

// Plain

export const NoLabelContentStart: Story = {
    ...FieldTemplate,
    args: { ...NoLabelContent.args, start: <FullSquareIcon /> }
};

export const LabelNoContentStart: Story = {
    ...FieldTemplate,
    args: { ...LabelNoContent.args, start: <FullSquareIcon /> }
};

export const LabelShrinkNoContentStart: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkNoContent.args, start: <FullSquareIcon /> }
};

export const LabelShrinkContentStart: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkContent.args, start: <FullSquareIcon /> }
};

// Focus

export const NoLabelContentFocusStart: Story = {
    ...FieldTemplate,
    args: { ...NoLabelContent, focus: true }
};

export const LabelNoContentFocusStart: Story = {
    ...FieldTemplate,
    args: { ...LabelNoContentStart.args, focus: true }
};

export const LabelShrinkNoContentFocusStart: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkNoContentStart.args, focus: true }
};

export const LabelShrinkContentFocusStart: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkContentStart.args, focus: true }
};

// Disabled

export const NoLabelContentDisabledStart: Story = {
    ...FieldTemplate,
    args: { ...NoLabelContentStart.args, disabled: true }
};

export const LabelNoContentDisabledStart: Story = {
    ...FieldTemplate,
    args: { ...LabelNoContentStart.args, disabled: true }
};

export const LabelShrinkNoContentDisabledStart: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkNoContentStart.args, disabled: true }
};

export const LabelShrinkContentDisabledStart: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkContentStart.args, disabled: true }
};

// Error

export const NoLabelContentErrorStart: Story = {
    ...FieldTemplate,
    args: { ...NoLabelContentStart.args, error: true }
};

export const LabelNoContentErrorStart: Story = {
    ...FieldTemplate,
    args: { ...LabelNoContentStart.args, error: true }
};

export const LabelShrinkNoContentErrorStart: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkNoContentStart.args, error: true }
};

export const LabelShrinkContentErrorStart: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkContentStart.args, error: true }
};


// End Adornment

// Plain

export const NoLabelContentEnd: Story = {
    ...FieldTemplate,
    args: { end: <FullSquareIcon />, children: 'Content' }
};

export const LabelNoContentEnd: Story = {
    ...FieldTemplate,
    args: { end: <FullSquareIcon />, label: 'Label', className: 'w-32' }
};

export const LabelShrinkNoContentEnd: Story = {
    ...FieldTemplate,
    args: { end: <FullSquareIcon />, label: 'Label', shrink: true, className: 'w-32' }
};

export const LabelShrinkContentEnd: Story = {
    ...FieldTemplate,
    args: { end: <FullSquareIcon />, label: 'Label', shrink: true, children: 'Content' }
};

// Focus

export const NoLabelContentFocusEnd: Story = {
    ...FieldTemplate,
    args: { ...NoLabelContent, focus: true }
};

export const LabelNoContentFocusEnd: Story = {
    ...FieldTemplate,
    args: { ...LabelNoContentEnd.args, focus: true }
};

export const LabelShrinkNoContentFocusEnd: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkNoContentEnd.args, focus: true }
};

export const LabelShrinkContentFocusEnd: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkContentEnd.args, focus: true }
};

// Disabled

export const NoLabelContentDisabledEnd: Story = {
    ...FieldTemplate,
    args: { ...NoLabelContentEnd.args, disabled: true }
};

export const LabelNoContentDisabledEnd: Story = {
    ...FieldTemplate,
    args: { ...LabelNoContentEnd.args, disabled: true }
};

export const LabelShrinkNoContentDisabledEnd: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkNoContentEnd.args, disabled: true }
};

export const LabelShrinkContentDisabledEnd: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkContentEnd.args, disabled: true }
};

// Error

export const NoLabelContentErrorEnd: Story = {
    ...FieldTemplate,
    args: { ...NoLabelContentEnd.args, error: true }
};

export const LabelNoContentErrorEnd: Story = {
    ...FieldTemplate,
    args: { ...LabelNoContentEnd.args, error: true }
};

export const LabelShrinkNoContentErrorEnd: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkNoContentEnd.args, error: true }
};

export const LabelShrinkContentErrorEnd: Story = {
    ...FieldTemplate,
    args: { ...LabelShrinkContentEnd.args, error: true }
};
