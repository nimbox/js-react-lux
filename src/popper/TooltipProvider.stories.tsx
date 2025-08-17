import type { Meta, StoryObj } from '@storybook/react-vite';
import { TooltipProvider } from './TooltipProvider';


// Definition

const meta: Meta = {
};

export default meta;
type Story = StoryObj;

// Templates

const TooltipTemplate: Story = {
    decorators: [(Story) => <TooltipProvider destinationSelector="#modal" tooltipClassName="max-w-sm text-md"><Story /></TooltipProvider>]
};

// Stories

export const Basic: Story = {
    ...TooltipTemplate,
    render: () => {
        return (
            <div className="inline-block px-3 py-2 border rounded bg-red-100" data-tooltip="Hover text">Hover over me</div>
        );
    }
};

export const DifferentSizes: Story = {
    ...TooltipTemplate,
    render: () => {
        return (
            <div className="p-10 flex flex-row justify-between items-center">
                <span className="text-xs bg-red-100" data-tooltip="Hover text" data-tooltip-show>Extra Small</span>
                <span className="text-sm bg-red-100" data-tooltip="Hover text" data-tooltip-show>Small</span>
                <span className="text-base bg-red-100" data-tooltip="Hover text" data-tooltip-show>Base</span>
                <span className="text-lg bg-red-100" data-tooltip="Hover text" data-tooltip-show>Large</span>
                <span className="text-xl bg-red-100" data-tooltip="Hover text" data-tooltip-show>Extra Large</span>
            </div>
        );
    }
};

export const DifferentPlacements: Story = {
    ...TooltipTemplate,
    render: () => {
        return (
            <div className="p-10 flex flex-row justify-between items-center">
                <span className="bg-red-100" data-tooltip="Top" data-tooltip-placement="top">Top</span>
                <span className="bg-red-100" data-tooltip="Right" data-tooltip-placement="right">Right</span>
                <span className="bg-red-100" data-tooltip="Bottom" data-tooltip-placement="bottom">Bottom</span>
                <span className="bg-red-100" data-tooltip="Left" data-tooltip-placement="left">Left</span>
            </div>
        );
    }

};

export const InsideSVG: Story = {
    ...TooltipTemplate,
    render: () => {
        return (
            <svg width={256} height={64} style={{ overflow: 'visible' }}>
                <circle cx={16} cy={16} r={16} fill="gray">
                    <title>This is the title</title>
                </circle>
                <g transform="translate(64, 32)" className="has-svg-tooltip">
                    <rect x={0} y={0} width={32} height={32} fill="gray" data-tooltip="This is an svg tooltip" />
                </g>
            </svg>
        );
    }
};
