/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import timezones from '../../test/timezones.json';
import { ZonePicker } from '../../test/ZonerPicker';
import { createQueryMatcher } from '../../utilities/createQueryMatcher';
import { Choose } from './Choose';
import { action } from '@storybook/addon-actions';
import { Input } from './Input';
import { Button } from '../Buttons';


// definition

export default {
    title: 'Component/Controls/ChooseOld',
    component: Choose,
    parameters: {
        layout: 'centered'
    }
};

const primaryColors = ['Yellow', 'Blue', 'Red'];
const secondaryColors = ['Green', 'Purple', 'Orange'];
const filterColor = (query: string, colors: string[]) => {
    if (query == null || query.trim().length === 0) {
        return colors;
    } else {
        const matcher = createQueryMatcher(query);
        return colors.filter(matcher);
    }
};

// stories

export const Simple = () => {
    const [color, setColor] = useState('Blue');
    return (
        <div>
            <Choose
                options={[primaryColors]}
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
        </div>
    );
};

export const SimpleWithSearch = () => {
    const [color, setColor] = useState('Blue');
    return (
        <div>
            <Choose withSearch
                options={(query) => [filterColor(query, primaryColors)]}
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
        </div>
    );
};

export const SimpleGroup = () => {
    const [color, setColor] = useState('Blue');
    return (
        <div>
            <Choose
                options={[primaryColors, secondaryColors]}
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
        </div>
    );
};

export const SimpleGroupWithSearch = () => {
    const [color, setColor] = useState('Blue');
    return (
        <div>
            <Choose withSearch
                options={(query) => [
                    filterColor(query, primaryColors),
                    filterColor(query, secondaryColors)
                ]}
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
        </div>
    );
};

export const SimpleGroupWithName = () => {
    const [color, setColor] = useState('Blue');
    return (
        <div>
            <Choose
                options={[
                    { name: 'Primary', options: primaryColors },
                    { name: 'Secondary', options: secondaryColors }
                ]}
                getOptions={(group) => group.options}
                renderGroupLabel={({ group }) => <span className="font-bold">{group.name}</span>}
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
        </div>
    );
};

export const SimpleGroupWithNameAndSearch = () => {
    
    const [color, setColor] = useState('Blue');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setColor(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(color); }


    return (
        <form onSubmit={handleSubmit} className="w-4/5 flex flex-row space-x-2">

            <Input type="text" defaultValue=""/>

            <Choose<{ name: string, options: string[] }, string> withSearch
                options={(query) => [
                    { name: 'Primary', options: filterColor(query, primaryColors) },
                    { name: 'Secondary', options: filterColor(query, secondaryColors) }
                ]}
                getOptions={(group) => group.options}
                renderGroupLabel={({ group }) => <span className="font-bold">{group.name}</span>}
                value={color}
                onChange={handleChange}
            />

            <Input type="text" defaultValue=""/>

            <Button>Submit</Button>

        </form>
    );
};

export const SimpleAsynchronous = () => {

    const [zone, setZone] = useState('America/Santo_Domingo');
    const handleOnChange = (e: any) => {
        console.log('handleOnChange', e.target.value)
        setZone(e.target.value);
    };

    return (
        <ZonePicker

            value={zone}
            onChange={handleOnChange}

            placeholder="Select..."

        />
    );

};
