/* eslint-disable import/no-anonymous-default-export */
import React, { FC, useCallback, useRef, useState } from 'react';
import { render } from 'react-dom';
import { SwatchPicker } from '../..';
import { useOptionsKeyNavigator } from '../../hooks/useOptionsKeyNavigator';
import { useSearchOptions } from '../../hooks/useSearchOptions';
import { AngleDownIcon, WarningIcon } from '../../icons';
import { createSearchMatcher } from '../../utilities/createSearchMatcher';
import { Button } from '../Buttons';
import { Input } from '../controls/Input';
import { WrapperPopper } from '../controls/WrapperPopper';
import { Choose } from './Choose';
import { SearchableChoose } from './SearchableChoose';
import { SearchableChooseOption } from './SearchableChooseOption';


// definition

export default {
    title: 'Component/Choose/SearchableChooseOption',
    component: SearchableChooseOption,
    parameters: {
        layout: 'centered'
    }
};

// stories

const colors = [
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

const provider = (value?: string) => {
    if (value == null || value.trim() === '') {
        return colors;
    } else {
        const matcher = createSearchMatcher(value);
        return [
            { ...colors[0], options: colors[0].options.filter(o => matcher(o.name)) },
            { ...colors[1], options: colors[1].options.filter(o => matcher(o.name)) }
        ];
    }
};

export const Default = () => {

    const handleChoose = (option: any) => console.log('choose', option);

    const extractor = useCallback((group) => group.options, []);
    const searchable = useSearchOptions(provider);
    const navigator = useOptionsKeyNavigator(searchable.options, { extractor, onChoose: handleChoose });

    return (
        <div className="text-base">

            <SearchableChooseOption

                {...searchable}
                {...navigator}

                extractor={extractor}
                onChoose={handleChoose}

                renderEmtpy={({ value }) => <div>No options for {value}</div>}
                renderOption={({ option }: { option: any }) => (<>{option.name}</>)}
                renderFooter={({ value }) => <CreateColor value={value} />}


                className="border divide-y-2 border-control-border rounded"

            />

        </div>
    );

};

export const ChoosePopper = () => {

    // const lastInput = useRef<HTMLInputElement>(null);
    // setTimeout(() => { lastInput.current?.focus(); }, 5000);

    // handlers

    const [color, setColor] = useState<{ value: string, name: string } | null>(null);

    const extractor = useCallback((group) => group.options, []);
    const handleChoose = useCallback((option: any) => {
        console.log('choose', option);
        setColor(option);
    }, []);

    // render

    return (
        <div className="grid grid-cols-5 gap-2 text-base">
            <Input />
            <div className="col-span-3">
                <Choose

                    withHideOnChoose

                    options={colors}
                    extractor={extractor}
                    onChoose={handleChoose}

                    renderEmpty={() => <div>No options</div>}
                    renderOption={({ option }: { option: any }) => (<>{option.name}</>)}
                    renderFooter={() => <CreateColor value={'#906090'} />}

                >
                    {color ? <>{color.name}</> : <div>Choose a color</div>}
                </Choose>
            </div>
            <Input />
        </div>
    );

};

export const SearchableChoosePopper = () => {

    const lastInput = useRef<HTMLInputElement>(null);
    setTimeout(() => { lastInput.current?.focus(); }, 5000);

    // handlers

    const extractor = useCallback((group) => group.options, []);
    const handleChoose = useCallback((option: any) => {
        console.log('choose', option);
    }, []);

    // render

    return (
        <div className="grid grid-cols-5 gap-2 text-base">
            <Input />
            <div className="col-span-3">
                <SearchableChoose

                    provider={provider}
                    extractor={extractor}
                    onChoose={handleChoose}

                    renderEmtpy={({ value }) => <div>No options for {value}</div>}
                    renderOption={({ option }: { option: any }) => (<>{option.name}</>)}
                    renderFooter={({ value }) => <CreateColor value={value} />}

                >
                    The inside of the popper
                </SearchableChoose>
            </div>
            <Input ref={lastInput} />
        </div>
    );

};

const CreateColor: FC<{ value: string }> = ({ value }) => {

    const [color, setColor] = useState('#906090');

    return (
        <form className="grid grid-cols-1 gap-2 lux-p-2em">
            <p>Create new color</p>
            <Input value={value} disabled />
            <SwatchPicker value={color} onChange={(e) => setColor(e.target.value)} />
            <Button type="button">Create</Button>
        </form>
    );

};
