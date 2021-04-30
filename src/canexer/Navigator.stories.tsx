import { withKnobs } from '@storybook/addon-knobs';
import _ from 'lodash';
import { useState } from 'react';
import { CheckBar } from '../components/CheckBar';
import { CustomMultiSelect } from '../components/CustomMultiSelect';
import { Control } from '../components/controls/Control';
import { Search } from '../components/controls/IconInput';
import { RadioSelect } from '../components/RadioSelect';


// definition

export default {
    title: 'Canexer/Navigator',
    decorators: [
        withKnobs
    ]
};


export const Navigator = () => {

    const options = ['BACA', 'OPA', 'OPA2', 'NIMBOX', 'NIMBOXDO'];
    const [value, onChange] = useState([1, 4, 5]);
    const label = _.take(value, 2).reduce((acc: string, val: number) => acc + ' ' + options[val], '') + (_.size(value) > 2 ? ` y ${_.size(value) - 2} más` : '');

    const [value2, onChange2] = useState([1]);

    const options2 = ['USD(1.895.903,02)', 'DOP(32.338,76)']
    const [value3, onChange3] = useState(1);
    const label2 = options2[value3];

    return (
        <div className="mt-8 max-w-full h-16">
            <div className="flex flex-row flex-wrap justify-between">
                <div className="">
                    <Control>
                        <Search className="w-100" placeholder="ie. Customers, Tasks, etc." />
                    </Control>
                </div>
                <div className="">
                    <Control >
                        <CustomMultiSelect value={value} onChange={onChange} label={label || 'Ninguna'}>
                            {options.map((o, i) => <CustomMultiSelect.Option value={i}>{o}</CustomMultiSelect.Option>)}
                        </CustomMultiSelect>
                    </Control>
                </div>
                <div className="pl-4 border-l border-control-border">
                    <div className="flex flex-row space-x-2">
                        <div className="">
                            <Control >
                                <CheckBar value={value2} onChange={onChange2}>
                                    <CheckBar.Option value={1}>RD$</CheckBar.Option>
                                    <CheckBar.Option value={2}>USD</CheckBar.Option>
                                </CheckBar>
                            </Control>
                        </div>
                        <div className="">
                            <Control >
                                <RadioSelect value={value3} onChange={onChange3} className='' label={label2 || 'Ninguna'}>
                                    {options2.map((o, i) => <RadioSelect.Option value={i}>{o}</RadioSelect.Option>)}
                                </RadioSelect>
                            </Control>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};