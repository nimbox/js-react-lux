/* eslint-disable import/no-anonymous-default-export */
import { action } from '@storybook/addon-actions';
import { Canvas, Meta, Story } from '@storybook/addon-docs';
import { useCallback, useState } from 'react';
import { useOptionsKeyNavigator } from '../../hooks/useOptionsKeyNavigator';
import { useSearchOptions, UseSearchOptionsProvider } from '../../hooks/useSearchOptions';
import { createSearchMatcher } from '../../utilities/createSearchMatcher';
import { ChooseOption } from './ChooseOption';
import { AsyncSearchInput } from '../controls/AsyncSearchInput';
import { SearchChoose } from './SearchChoose';
import { Button } from '../Buttons';


export default {
    title: 'Component/Choose/SearchChoose',
    component: SearchChoose,
    parameters: {
        layout: 'centered'
    }
};

interface Option {
    value: string;
    name: string;
}

interface Group {
    name: string;
    options: Option[];
}

const colors: Group[] = [
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
];

const extractor = (group: Group): Option[] => group.options;

const provider = async (query?: string) => {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));
    if (query == null || query.trim() === '') {
        return colors;
    } else {
        const matcher = createSearchMatcher(query.trim());
        return [
            { ...colors[0], options: colors[0].options.filter(o => matcher(o.name)) },
            { ...colors[1], options: colors[1].options.filter(o => matcher(o.name)) }
        ];
    }
};


//
// Stories
//


export const Default = () => {

    const [value, setValue] = useState('800080');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setValue(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <SearchChoose<Group, Option>

                provider={provider}
                extractor={extractor}
                identifier={color => color.value}

                value={value}
                onChange={handleChange}

                renderEmpty={() => 'No options'}
                renderGroupLabel={({ group }) => <span>{group.name}</span>}
                renderOption={({ option }) => <span className="lux-px-2em italic">{option.name}</span>}
                renderChosen={({ option }) => <span>{option.name}</span>}

            />
            <Button>Submit</Button>
        </form>
        // <div className="w-96 text-base border border-control-border rounded overflow-hidden">
        //     <div className="lux-p-2em">
        //         <AsyncSearchInput
        //             loading={loading}
        //             error={error}
        //             value={value}
        //             onChange={handleChange}
        //             onKeyDown={onKeyDown}
        //         />
        //     </div>
        //     <ChooseOption
        //         options={options}
        //         loading={loading}
        //         error={error}
        //         selected={selected}
        //         extractor={extractor}
        //         onChoose={handleChoose}
        //         renderEmtpy={() => 'No options'}
        //         renderGroupLabel={({ group }) => <span>{group.name}</span>}
        //         renderOption={({ option }) => <span className="lux-px-2em italic">{option.name}</span>}
        //     />
        // </div>
    );
};
