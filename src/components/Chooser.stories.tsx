import React from 'react';
import timezones from '../test/timezones.json';
import { ArrayItemProvider } from '../types/ArrayItemProvider';
import { Chooser } from './Chooser';


// definition

export default {
    title: 'Component/Chooser',
    component: Chooser
};

// stories

interface Item {
    value: string;
    description: string
}

const arrayData = new ArrayItemProvider<string, Item>(
    timezones,
    (item: Item) => item.value,
    (items: Item[], q: string) => { const regexp = new RegExp(q, "i"); return items.filter(item => regexp.test(item.description)); }
);

const defaultValues = [
    "America/Caracas",
    "America/Santo_Domingo"
];

export const ArrayData = () => {
    return (
        <Chooser
            provider={arrayData}
            defaultValues={defaultValues}
            renderListItem={({ item }) => <>{item.description}</>}
            className="space-y-2"
        />
    );
};
