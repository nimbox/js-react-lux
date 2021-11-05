import React from 'react';
import { ChooseInput } from '../components/controls/ChooseInput';
import { createSearchMatcher } from '../utilities/createSearchMatcher';
import timezones from './timezones.json';


interface Option {
    value: string;
    description: string
}

const recentValues = new Set([
    'America/Caracas',
    'America/Santo_Domingo'
]);

const allRecentTimezones = timezones.filter(t => recentValues.has(t.value));
const allTimezones = timezones;

export interface ZonePickerProps {

    /** Name used for the input element and returned in the change event. */
    name?: string,

    /** String representation of the item (for uncontrolled). */
    defaultValue?: string,

    /** String representation of the item (for controlled). */
    value?: string,

    /** Change event handler (for controlled). */
    onChange?: React.ChangeEventHandler<HTMLInputElement>,

    /** Show this text when the value does not represent a timezone. */
    placeholder?: string;

}

export const ZonePicker = React.forwardRef<HTMLInputElement, ZonePickerProps>((props, ref) => {

    const { defaultValue, value, onChange, placeholder } = props;

    const getOption = async (value: string, options: { name: string, options: Option[] }[]) => {

        await new Promise(resolve => setTimeout(resolve, 0));
        return timezones.find(z => z.value === value);

    };

    const getOptions = async (q: string) => {

        await new Promise(resolve => setTimeout(resolve, 0));

        if (!q || q.trim().length === 0) {

            return [{ name: 'Usuals', options: allRecentTimezones }, { name: 'Filtered', options: [] }];

        } else {

            const matcher = createSearchMatcher(q);
            const recentItems = allRecentTimezones.filter(item => matcher(item.description));
            const allFilteredItems = allTimezones.filter(item => !recentValues.has(item.value) && matcher(item.description));

            return [{ name: 'Usuals', options: recentItems }, { name: 'Filtered', options: allFilteredItems }];

        }

    };

    return (
        <ChooseInput

            withSearch

            option={getOption as any}
            options={getOptions}

            value={value}
            onChange={onChange}

            getOptions={(group) => group.options}

            getValue={(item: Option) => item.value}
            renderSelectedOption={({ option }) => <>{option ? option.description : 'Select...'}</>}

            renderGroupLabel={({ group }) =>
                <span className="font-bold">
                    {group.name} ({group.options.length})
                </span>
            }
            renderOption={({ option }) =>
                <span>
                    {option.description} 👍🏻
                </span>
            }
            renderFooter={({ options }) =>
                <div className="px-3 py-2 bg-gray-100">
                    Crear {options.values}
                </div>
            }

            placeholder={placeholder}

            className="border border-control-border rounded"

        />
    );

});
