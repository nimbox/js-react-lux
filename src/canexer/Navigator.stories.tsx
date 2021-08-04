/* eslint-disable import/no-anonymous-default-export */
import _ from 'lodash';
import { useState } from 'react';
import { CheckBar } from '../components/CheckBar';
import { Control } from '../components/controls/Control';
import { CustomMultiSelect } from '../components/controls/CustomMultiSelect';
import { CustomSelect } from '../components/controls/CustomSelect';
import { SearchInput } from '../components/controls/SearchInput';


// definition

export default {
    title: 'Canexer/Navigator'
};


export const Navigator = () => {

    const options = ['BACA', 'OPA', 'OPA2', 'NIMBOX', 'NIMBOXDO'];
    const [value, onChange] = useState([1, 3, 4]);

    const label = (value: any) => {
        if (value.length > 0) {
            return _.reduce(_.take(value, 2), function (acc: string, val: number) { return acc + ' ' + options[val]; }, '') + (_.size(value) > 2 ? ` y ${_.size(value) - 2} más` : '')
        }
        return 'Ninguna';
    };

    const [value2, onChange2] = useState([1]);

    const options2 = ['USD(1.895.903,02)', 'DOP(32.338,76)']
    const [value3, onChange3] = useState(1);
    const label2 = (value: any) => (options2[value3]);

    return (
        <div className="mt-8 max-w-full h-16">
            <div className="flex flex-row flex-wrap justify-between">
                <div className="">
                    <Control>
                        <SearchInput className="" placeholder="ie. Customers, Tasks, etc." />
                    </Control>
                </div>
                <div className="flex flex-row divide-x divide-control-border space-x-2">
                    <Control >
                        <CustomMultiSelect value={value} onChange={onChange} label={label} align="start">
                            {options.map((o, i) => <CustomMultiSelect.Option value={i}>{o}</CustomMultiSelect.Option>)}
                        </CustomMultiSelect>
                    </Control>
                    <div className="flex flex-row space-x-2">
                        <div className="ml-2">
                            <Control >
                                <CheckBar value={value2} onChange={onChange2}>
                                    <CheckBar.Option value={1}>RD$</CheckBar.Option>
                                    <CheckBar.Option value={2}>USD</CheckBar.Option>
                                </CheckBar>
                            </Control>
                        </div>
                        <div className="">
                            <Control >
                                <CustomSelect value={value3} onChange={onChange3} className='' label={label2} align="start">
                                    {options2.map((o, i) => <CustomSelect.Option value={i}>{o}</CustomSelect.Option>)}
                                </CustomSelect>
                            </Control>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};