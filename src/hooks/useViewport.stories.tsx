import type { Meta, StoryObj } from '@storybook/react';
import { ViewportProvider, useViewport } from './useViewport';


// Definition

const meta: Meta = {
};

export default meta;
type Story = StoryObj;


// Templates

const UseViewportTemplate: Story = {
    render: () => {
        const size = useViewport();
        return (<div>{JSON.stringify(size)}</div>);
    }
};

// Stories

export const WithNoWait: Story = {
    ...UseViewportTemplate,
    decorators: [(Story) => <ViewportProvider wait={0}>{<Story />}</ViewportProvider>]
};

export const WithTwoSecondWait: Story = {
    ...UseViewportTemplate,
    decorators: [(Story) => <ViewportProvider wait={2000}>{<Story />}</ViewportProvider>]
};
