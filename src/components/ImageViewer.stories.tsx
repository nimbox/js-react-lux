import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageViewer } from './ImageViewer';


const meta: Meta<typeof ImageViewer> = {
    component: ImageViewer
};

export default meta;
type Story = StoryObj<typeof ImageViewer>;

// The viewer fills its parent (`w-full h-full`), so every story frames it in a
// sized box — the host's job in production (a lightbox overlay, a gallery cell, …).

const LANDSCAPE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80';
const PORTRAIT = 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&h=1600&q=80';

// Stories

export const Default: Story = {
    render: () => (
        <div className="w-[32rem] h-[24rem]">
            <ImageViewer src={LANDSCAPE} alt="Mountain lake" />
        </div>
    )
};

export const Portrait: Story = {
    render: () => (
        <div className="w-[24rem] h-[32rem]">
            <ImageViewer src={PORTRAIT} alt="Waterfall" />
        </div>
    )
};

export const Wide: Story = {
    render: () => (
        <div className="w-[40rem] h-[16rem]">
            <ImageViewer src={LANDSCAPE} alt="Mountain lake" />
        </div>
    )
};

export const WithoutAlt: Story = {
    render: () => (
        <div className="w-[32rem] h-[24rem]">
            <ImageViewer src={LANDSCAPE} />
        </div>
    )
};
