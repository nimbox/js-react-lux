import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Card } from '../Card';
import { CheckBox } from './CheckBox';
import { Control } from './Control';
import { Input } from './Input';
import { NativeSelect } from './NativeSelect';
import { Option } from './Option';
import { Radio } from './Radio';
import { SearchInput } from './SearchInput';
import { Tabs } from '../Tabs';
import { CheckBar } from '../CheckBar';
import { RadioBar } from '../RadioBar';
import { CustomMultiSelect } from './CustomMultiSelect';

// Definition

const meta: Meta<typeof Control> = {
    component: Control
};

export default meta;
type Story = StoryObj<typeof Control>;

//  Stories

export const Primary: Story = {
    render: ({ error }) => {

        return (
            <div className="mt-8 max-w-full">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Control error={error}>
                            <Control.Label badge="1/60">Label</Control.Label>
                            <Input />
                            <Control.Message>Mensaje text</Control.Message>
                            {error && <Control.Error>Error</Control.Error>}
                        </Control>
                    </div>
                    <div>
                        <Control error={error}>
                            <Control.Label badge="1/60">Label disabled</Control.Label>
                            <Input disabled />
                            <Control.Message>Mensaje text</Control.Message>
                            {error && <Control.Error>Error</Control.Error>}
                        </Control>
                    </div>
                    <div>
                        <Control error={error}>
                            <SearchInput />
                        </Control>
                    </div>
                    <div>
                        <Control error={error}>
                            <SearchInput disabled placeholder="disabled" />
                        </Control>
                    </div>
                    <div>
                        <Control>
                            <Control.Label >LABEL</Control.Label>
                            <NativeSelect>
                                <Option value="1">Option one</Option>
                                <Option value="2">Option two</Option>
                            </NativeSelect>
                        </Control>
                    </div>
                    <div>
                        <Control >
                            <Control.Label >LABEL DISABLED</Control.Label>
                            <NativeSelect disabled>
                                <Option value="1">Option one</Option>
                                <Option value="2">Option two</Option>
                            </NativeSelect>
                        </Control>
                    </div>
                    <div>
                        <Control >
                            <CheckBox /> Text text text and more text
                        </Control>
                    </div>
                    <div>
                        <Control >
                            <CheckBox disabled /> Disabled text text text and more text
                        </Control>
                    </div>
                    <div>
                        <Control >
                            <Radio >Text text text and more text</Radio>
                        </Control>
                    </div>
                    <div>
                        <Control >
                            <Radio disabled />&nbsp;Disabled text text text and more text
                        </Control>
                    </div>
                </div>
            </div>
        );

    },
    args: {
        error: false
    }
};

export const ControlsInCard: Story = {
    render: () => {

        const [checkbox, setChecbox] = useState([1]);
        const [checkSelect, setChecboxSelect] = useState([1]);
        const [radio, setRadio] = useState(1);
        const [tab, setTab] = useState(1);

        return (
            <Card>
                <Card.Header className="pb-0 flex flex-row space-x-4 items-center">
                    <Tabs value={tab} setValue={setTab} className="text-xs">
                        <Tabs.Option value="one">One</Tabs.Option>
                        <Tabs.Option value="two">Two</Tabs.Option>
                        <Tabs.Option value="three">Three</Tabs.Option>
                    </Tabs>
                    <CheckBar value={checkbox} onChange={setChecbox} className="text-xs">
                        <CheckBar.Option value={1}>1</CheckBar.Option>
                        <CheckBar.Option value={2}>2</CheckBar.Option>
                        <CheckBar.Option value={3}>3</CheckBar.Option>
                        <CheckBar.Option value={6}>6</CheckBar.Option>
                        <CheckBar.Option value={12}>12 months</CheckBar.Option>
                    </CheckBar>
                    <RadioBar value={radio} onChange={setRadio} className="text-xs">
                        <RadioBar.Option value={1}>1</RadioBar.Option>
                        <RadioBar.Option value={2}>2</RadioBar.Option>
                        <RadioBar.Option value={3}>3</RadioBar.Option>
                        <RadioBar.Option value={6}>6</RadioBar.Option>
                        <RadioBar.Option value={12}>12 months</RadioBar.Option>
                    </RadioBar>
                    <CheckBox className="text-xs"/>
                    <CustomMultiSelect value={checkSelect} onChange={setChecboxSelect} label={ () => 'Months' } className="text-xs">
                        <CustomMultiSelect.Option value={1}>1</CustomMultiSelect.Option>
                        <CustomMultiSelect.Option value={2}>2</CustomMultiSelect.Option>
                        <CustomMultiSelect.Option value={3}>3</CustomMultiSelect.Option>
                        <CustomMultiSelect.Option value={6}>6</CustomMultiSelect.Option>
                        <CustomMultiSelect.Option value={12}>12 months</CustomMultiSelect.Option>
                    </CustomMultiSelect>
                </Card.Header>
                <Card.Body>
                    A great Body
                </Card.Body>
            </Card>
        );

    }
};
