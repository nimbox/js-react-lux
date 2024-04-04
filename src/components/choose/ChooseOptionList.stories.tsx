import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { ChooseOptionList } from './ChooseOptionList';
import * as data from './data';


// Definition

const meta: Meta<typeof ChooseOptionList> = {
    component: ChooseOptionList,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof ChooseOptionList>;

// Template


const ChooseOptionListTemplate: Story = {
    render: (args) => {
        return (<ChooseOptionList
            {...args}
            extractor={(group) => group.options}
            onChoose={option => action('onChoose')(option)}
            renderEmpty={() => 'No options'}
            renderGroupLabel={({ group }) => <span>{group.name}</span>}
            renderOption={({ option }) => <span className="lux-px-2em italic">{option.name}</span>}
        />);
    }
};

//Story

export const Primary: Story = {
    ...ChooseOptionListTemplate,
    args: {
        options: data.colors,
        loading: false,
        loadingError: false,
        selected: [1, 1],
        className: 'w-96 text-base border border-control-border rounded overflow-hidden'
    }
};

export const ChooseOptionListWithOptions: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[['Yellow', 'Blue', 'Red']]}
                onChoose={option => action('onChoose')(option)}
                className="w-96 border border-control-border rounded overflow-hidden"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'The options are rendered when present.'
            }
        }
    }
};

export const ChooseOptionListWithOptionsAndGroup: Story = {
    render: () => {
        return (
            <ChooseOptionList
                onChoose={option => action('onChoose')(option)}
                options={[['Yellow', 'Blue', 'Red'], ['Green', 'Purple', 'Orange']]}
                className="w-96 border border-control-border rounded overflow-hidden"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'When there are two groups of options.'
            }
        }
    }
};

export const ChooseOptionListNoOptions: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[[]]}
                onChoose={option => action('onChoose')(option)}
                className="w-96 border border-control-border rounded overflow-hidden"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'When there are no options nothing is rendered.'
            }
        }
    }
};

export const ChooseOptionListNoOptionsWithRenderEmpty: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[[]]}
                onChoose={option => action('onChoose')(option)}
                renderEmpty={() => <div className="text-center">No options!</div>}
                className="w-96 border border-control-border rounded overflow-hidden"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'When there are no options but a `renderEmpty` function is passed, the result of the function is rendered.'
            }
        }
    }
};

export const ChooseOptionListWithLoading: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[['Yellow', 'Blue', 'Red']]}
                loading={true}
                onChoose={option => action('onChoose')(option)}
                className="w-96 border border-control-border rounded overflow-hidden"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'When there are options but `loading` is set, nothing is rendered.'
            }
        }
    }
};

export const ChooseOptionListWithLoadingError: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[['Yellow', 'Blue', 'Red']]}
                loadingError={true}
                onChoose={option => action('onChoose')(option)}
                className="w-96 border border-control-border rounded overflow-hidden"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'When there are options but `loadingError` is set, nothing is rendered.'
            }
        }
    }
};

export const ChooseOptionListWithSelected: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[['Yellow', 'Blue', 'Red'], ['Green', 'Purple', 'Orange']]}
                selected={[0, 0]}
                onChoose={option => action('onChoose')(option)}
                className="w-96 border border-control-border rounded overflow-hidden"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'To show a selection of one of the options pass a non null `selected` property.'
            }
        }
    }
};

export const ChooseOptionListwithSelectedAndAutoScroll: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[['Yellow', 'Blue', 'Red'], ['Green', 'Purple', 'Orange']]}
                selected={[1, 2]}
                onChoose={option => action('onChoose')(option)}
                className="w-96 border border-control-border rounded overflow-hidden max-h-16 overflow-y-scroll"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'The selection will be automatically be brought into view.'
            }
        }
    }
};

export const ChooseOptionListExtraSmall: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[['Yellow', 'Blue', 'Red']]}
                className="w-32 text-xs border border-control-border rounded overflow-hidden"
            />
        );
    }
};

export const ChooseOptionListSmall: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[['Yellow', 'Blue', 'Red']]}
                className="w-32 text-sm border border-control-border rounded overflow-hidden"
            />
        );
    }
};

export const ChooseOptionListBase: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[['Yellow', 'Blue', 'Red']]}
                className="w-32 text-base border border-control-border rounded overflow-hidden"
            />
        );
    }
};

export const ChooseOptionListLarge: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[['Yellow', 'Blue', 'Red']]}
                className="w-32 text-lg border border-control-border rounded overflow-hidden"
            />
        );
    }
};

export const ChooseOptionListExtraLarge: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[['Yellow', 'Blue', 'Red']]}
                className="w-32 text-xl border border-control-border rounded overflow-hidden"
            />
        );
    }
};

export const ChooseOptionList4ExtraLarge: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[['Yellow', 'Blue', 'Red']]}
                className="w-32 text-4xl border border-control-border rounded overflow-hidden"
            />
        );
    }
};

export const ChooseOptionListWithRender: Story = {
    render: () => {
        return (
            <ChooseOptionList
                options={[
                    {
                        name: 'Primary', options: [
                            { value: 'ffff00', name: 'Yellow' },
                            { value: '0000ff', name: 'Blue' },
                            { value: 'ff0000', name: 'Red' }
                        ]
                    },
                    {
                        name: 'Secondary', options: [
                            { value: '00ff00', name: 'Green' },
                            { value: '800080', name: 'Purple' },
                            { value: 'ffa500', name: 'Orange' }
                        ]
                    }
                ]}
                selected={[1, 2]}
                extractor={(group) => group.options}
                onChoose={option => action('onChoose')(option)}
                renderGroupLabel={({ group }) =>
                    <div className="font-bold">
                        {group.name} ({group.options.length})
                    </div>
                }
                renderOption={({ option }) =>
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-base">{option.name}</span>
                        <span className="text-sm text-gray-300">{option.value}</span>
                    </div>
                }
                className="w-96 border border-control-border rounded overflow-hidden"
            />
        );
    }
};
