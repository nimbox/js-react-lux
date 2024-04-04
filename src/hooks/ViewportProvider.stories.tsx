import type { Meta, StoryObj } from '@storybook/react';
import { ViewportProvider } from './ViewportProvider';
import { useViewport } from './useViewport';


// Definition

const meta: Meta<typeof ViewportProvider> = {
    component: ViewportProvider
};

export default meta;
type Story = StoryObj<typeof ViewportProvider>;

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
