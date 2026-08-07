import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { SearchInput } from './SearchInput';


// Definition

const meta: Meta<typeof SearchInput> = {
    component: SearchInput,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

// Templates

const SearchInputTemplate: Story = {
    render: (args) => {
        return (
            <div className="flex flex-row justify-between items-baseline gap-4 ">
                <SearchInput variant="filled" {...args} />
                <SearchInput variant="outlined" {...args} />
                <SearchInput variant="inlined" {...args} />
                <SearchInput variant="pill" {...args} />
                <SearchInput variant="plain" {...args} />
            </div>
        );
    }
};

// Stories

export const Primary: Story = {
    args: {
        variant: 'outlined',
        label: 'Label'
    }
};

export const All: Story = {
    ...SearchInputTemplate,
    args: {
        defaultValue: 'Enabled'
    }
};

export const Disabled: Story = {
    ...SearchInputTemplate,
    args: {
        defaultValue: 'Disabled',
        disabled: true
    }
};

/**
 * The magnifier is the field's own, and sits at the start whatever else the
 * field carries.
 */
export const Empty: Story = {
    ...SearchInputTemplate,
    args: {
        placeholder: 'Search'
    }
};

/**
 * The cross only shows once there is something to clear, so empty the field
 * and it goes away rather than sitting there offering a press that does
 * nothing. A search field always offers it — there is no flag to ask for it.
 */
export const Clearing: Story = {
    args: {
        variant: 'outlined',
        label: 'Label',
        placeholder: 'Search',
        defaultValue: 'Type over me, then empty me'
    }
};

/**
 * Anything passed as `end` keeps its place, and the cross falls in beside it.
 */
export const WithEnd: Story = {
    args: {
        variant: 'outlined',
        label: 'Label',
        defaultValue: 'Enabled',
        end: <span className="text-muted text-[0.75em]">⌘K</span>
    }
};

export const Controlled: Story = {
    render: (args) => <ControlledTemplate component={SearchInput} componentProps={args} initial="Hello" forced="Bye" />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate component={SearchInput} componentProps={args} initial="Hello" forced="Bye" />
};

export const HookForm: Story = {
    render: (args) => <HookFormTemplate component={SearchInput} componentProps={args} initial="Hello" forced="Bye" />
};
