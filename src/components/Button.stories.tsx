import type { Meta, StoryObj } from '@storybook/react-vite';
import { FullSquareIcon } from '@nimbox/icons-react';
import { Button } from './Button';


// Definition

const meta: Meta<typeof Button> = {
    component: Button
};

export default meta;
type Story = StoryObj<typeof Button>;

// Templates

const ButtonTemplate: Story = {
    render: (args) => {
        return (
            <div className="space-x-4">
                <Button variant="filled" {...args} />
                <Button variant="outlined" {...args} />
                <Button variant="text" {...args} />
                <Button variant="link" {...args} />
                <Button variant="inline" {...args} />
                <Button variant="filled" {...args} disabled />
                <Button variant="outlined" {...args} disabled />
                <Button variant="text" {...args} disabled />
                <Button variant="link" {...args} disabled />
                <Button variant="inline" {...args} disabled />
            </div>
        );
    }
};

// Stories

export const Primary: Story = {
    ...ButtonTemplate,
    args: {
        semantic: 'primary',
        children: 'Button'
    }
};

export const Secondary: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        semantic: 'secondary'
    }
};

export const Danger: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        semantic: 'danger'
    }
};

export const Muted: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        semantic: 'muted'
    }
};

/**
 * What the `inline` variant is for. The two paragraphs are identical except
 * that the first has a button in it; their lines have to stay evenly spaced
 * and the two blocks have to end at the same height. A `filled` button is
 * shown in the third paragraph as the contrast — it is what pushing the
 * leading apart looks like.
 */

export const InlineInText: Story = {
    render: (args) => (
        <div className="space-y-6 max-w-lg">
            <p>
                Prose that runs on for long enough to wrap over several lines, with an
                {' '}<Button variant="inline" {...args}>inline</Button>{' '} button sitting
                in the middle of it, and then more text after so the line it lands on is
                not the last one in the paragraph.
            </p>
            <p>
                Prose that runs on for long enough to wrap over several lines, with an
                {' '}plain word{' '} sitting in the middle of it, and then more text after
                so the line it lands on is not the last one in the paragraph.
            </p>
            <p>
                Prose that runs on for long enough to wrap over several lines, with a
                {' '}<Button variant="filled" {...args}>filled</Button>{' '} button sitting
                in the middle of it, and then more text after so the line it lands on is
                not the last one in the paragraph.
            </p>
        </div>
    ),
    args: { semantic: 'primary' }
};

export const StartIcon: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        start: <FullSquareIcon />
    }
};

export const EndIcon: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        end: <FullSquareIcon />
    }
};

export const StartEndIcon: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        start: <FullSquareIcon />,
        end: <FullSquareIcon />
    }
};

export const StartEndIconWidth: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        children: 'B',
        start: <FullSquareIcon />,
        end: <FullSquareIcon />,
        className: 'w-24'
    }
};

export const StartEndIconHeight: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        centered: true,
        start: <FullSquareIcon />,
        end: <FullSquareIcon />,
        className: 'h-24'
    }
};

export const StartIconNoText: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        children: null,
        start: <FullSquareIcon />
    }
};

export const EndIconNoText: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        children: null,
        end: <FullSquareIcon />
    }
};

export const StartEndIconNoText: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        children: null,
        start: <FullSquareIcon />,
        end: <FullSquareIcon />
    }
};
