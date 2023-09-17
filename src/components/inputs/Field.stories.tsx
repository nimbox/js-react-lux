/* eslint-disable import/no-anonymous-default-export */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FullSquareIcon } from '../../icons/components';
import { Field } from './Field';
import React from 'react';


// Definition

export default {
    title: 'Components/Inputs/Field',
    component: Field,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = ({ variant, ...args }) => (
    <div className="grid grid-cols-3 gap-x-2 justify-items-center items-baseline">
        <Field variant="outlined" {...args} />
        <Field variant="filled" {...args} />
        <Field variant="inlined" {...args} />
    </div>
);

// Default

export const Default = Template.bind({});
Default.args = { label: 'XXXX', shrink: true, children: 'XXXXXXXXXXXX' };

// Plain

export const NoLabelContent = Template.bind({});
NoLabelContent.args = { children: 'Content' };

export const LabelNoContent = Template.bind({});
LabelNoContent.args = { label: 'Label', children: '', className: 'w-32' };

export const LabelShrinkNoContent = Template.bind({});
LabelShrinkNoContent.args = { label: 'Label', shrink: true, children: '', className: 'w-32' };

export const LabelShrinkContent = Template.bind({});
LabelShrinkContent.args = { label: 'Label', shrink: true, children: 'Content' };

// Focus

export const NoLabelContentFocus = Template.bind({});
NoLabelContentFocus.args = { ...NoLabelContent, focus: true };

export const LabelNoContentFocus = Template.bind({});
LabelNoContentFocus.args = { ...LabelNoContent.args, focus: true };

export const LabelShrinkNoContentFocus = Template.bind({});
LabelShrinkNoContentFocus.args = { ...LabelShrinkNoContent.args, focus: true };

export const LabelShrinkContentFocus = Template.bind({});
LabelShrinkContentFocus.args = { ...LabelShrinkContent.args, focus: true };

// Focus Within

export const NoLabelContentFocusWithin = Template.bind({});
NoLabelContentFocusWithin.args = { ...NoLabelContent, children: <input className="max-w-full" /> };

export const LabelNoContentFocusWithin = Template.bind({});
LabelNoContentFocusWithin.args = { ...LabelNoContent.args, children: <input className="max-w-full" /> };

export const LabelShrinkNoContentFocusWithin = Template.bind({});
LabelShrinkNoContentFocusWithin.args = { ...LabelShrinkNoContent.args, children: <input className="max-w-full" /> };

export const LabelShrinkContentFocusWithin = Template.bind({});
LabelShrinkContentFocusWithin.args = { ...LabelShrinkContent.args, children: <input className="max-w-full" /> };


// Disabled

export const NoLabelContentDisabled = Template.bind({});
NoLabelContentDisabled.args = { ...NoLabelContent.args, disabled: true };

export const LabelNoContentDisabled = Template.bind({});
LabelNoContentDisabled.args = { ...LabelNoContent.args, disabled: true };

export const LabelShrinkNoContentDisabled = Template.bind({});
LabelShrinkNoContentDisabled.args = { ...LabelShrinkNoContent.args, disabled: true };

export const LabelShrinkContentDisabled = Template.bind({});
LabelShrinkContentDisabled.args = { ...LabelShrinkContent.args, disabled: true };

// Error

export const NoLabelContentError = Template.bind({});
NoLabelContentError.args = { ...NoLabelContent.args, error: true };

export const LabelNoContentError = Template.bind({});
LabelNoContentError.args = { ...LabelNoContent.args, error: true };

export const LabelShrinkNoContentError = Template.bind({});
LabelShrinkNoContentError.args = { ...LabelShrinkNoContent.args, error: true };

export const LabelShrinkContentError = Template.bind({});
LabelShrinkContentError.args = { ...LabelShrinkContent.args, error: true };

// Start Adornment

// Plain

export const NoLabelContentStart = Template.bind({});
NoLabelContentStart.args = { ...NoLabelContent.args, start: <FullSquareIcon /> };

export const LabelNoContentStart = Template.bind({});
LabelNoContentStart.args = { ...LabelNoContent.args, start: <FullSquareIcon /> };

export const LabelShrinkNoContentStart = Template.bind({});
LabelShrinkNoContentStart.args = { ...LabelShrinkNoContent.args, start: <FullSquareIcon /> };

export const LabelShrinkContentStart = Template.bind({});
LabelShrinkContentStart.args = { ...LabelShrinkContent.args, start: <FullSquareIcon /> };

// Focus

export const NoLabelContentFocusStart = Template.bind({});
NoLabelContentFocusStart.args = { ...NoLabelContent, focus: true };

export const LabelNoContentFocusStart = Template.bind({});
LabelNoContentFocusStart.args = { ...LabelNoContentStart.args, focus: true };

export const LabelShrinkNoContentFocusStart = Template.bind({});
LabelShrinkNoContentFocusStart.args = { ...LabelShrinkNoContentStart.args, focus: true };

export const LabelShrinkContentFocusStart = Template.bind({});
LabelShrinkContentFocusStart.args = { ...LabelShrinkContentStart.args, focus: true };

// Disabled

export const NoLabelContentDisabledStart = Template.bind({});
NoLabelContentDisabledStart.args = { ...NoLabelContentStart.args, disabled: true };

export const LabelNoContentDisabledStart = Template.bind({});
LabelNoContentDisabledStart.args = { ...LabelNoContentStart.args, disabled: true };

export const LabelShrinkNoContentDisabledStart = Template.bind({});
LabelShrinkNoContentDisabledStart.args = { ...LabelShrinkNoContentStart.args, disabled: true };

export const LabelShrinkContentDisabledStart = Template.bind({});
LabelShrinkContentDisabledStart.args = { ...LabelShrinkContentStart.args, disabled: true };

// Error

export const NoLabelContentErrorStart = Template.bind({});
NoLabelContentErrorStart.args = { ...NoLabelContentStart.args, error: true };

export const LabelNoContentErrorStart = Template.bind({});
LabelNoContentErrorStart.args = { ...LabelNoContentStart.args, error: true };

export const LabelShrinkNoContentErrorStart = Template.bind({});
LabelShrinkNoContentErrorStart.args = { ...LabelShrinkNoContentStart.args, error: true };

export const LabelShrinkContentErrorStart = Template.bind({});
LabelShrinkContentErrorStart.args = { ...LabelShrinkContentStart.args, error: true };


// End Adornment

// Plain

export const NoLabelContentEnd = Template.bind({});
NoLabelContentEnd.args = { end: <FullSquareIcon />, children: 'Content' };

export const LabelNoContentEnd = Template.bind({});
LabelNoContentEnd.args = { end: <FullSquareIcon />, label: 'Label', className: 'w-32' };

export const LabelShrinkNoContentEnd = Template.bind({});
LabelShrinkNoContentEnd.args = { end: <FullSquareIcon />, label: 'Label', shrink: true, className: 'w-32' };

export const LabelShrinkContentEnd = Template.bind({});
LabelShrinkContentEnd.args = { end: <FullSquareIcon />, label: 'Label', shrink: true, children: 'Content' };

// Focus

export const NoLabelContentFocusEnd = Template.bind({});
NoLabelContentFocusEnd.args = { ...NoLabelContent, focus: true };

export const LabelNoContentFocusEnd = Template.bind({});
LabelNoContentFocusEnd.args = { ...LabelNoContentEnd.args, focus: true };

export const LabelShrinkNoContentFocusEnd = Template.bind({});
LabelShrinkNoContentFocusEnd.args = { ...LabelShrinkNoContentEnd.args, focus: true };

export const LabelShrinkContentFocusEnd = Template.bind({});
LabelShrinkContentFocusEnd.args = { ...LabelShrinkContentEnd.args, focus: true };

// Disabled

export const NoLabelContentDisabledEnd = Template.bind({});
NoLabelContentDisabledEnd.args = { ...NoLabelContentEnd.args, disabled: true };

export const LabelNoContentDisabledEnd = Template.bind({});
LabelNoContentDisabledEnd.args = { ...LabelNoContentEnd.args, disabled: true };

export const LabelShrinkNoContentDisabledEnd = Template.bind({});
LabelShrinkNoContentDisabledEnd.args = { ...LabelShrinkNoContentEnd.args, disabled: true };

export const LabelShrinkContentDisabledEnd = Template.bind({});
LabelShrinkContentDisabledEnd.args = { ...LabelShrinkContentEnd.args, disabled: true };

// Error

export const NoLabelContentErrorEnd = Template.bind({});
NoLabelContentErrorEnd.args = { ...NoLabelContentEnd.args, error: true };

export const LabelNoContentErrorEnd = Template.bind({});
LabelNoContentErrorEnd.args = { ...LabelNoContentEnd.args, error: true };

export const LabelShrinkNoContentErrorEnd = Template.bind({});
LabelShrinkNoContentErrorEnd.args = { ...LabelShrinkNoContentEnd.args, error: true };

export const LabelShrinkContentErrorEnd = Template.bind({});
LabelShrinkContentErrorEnd.args = { ...LabelShrinkContentEnd.args, error: true };
