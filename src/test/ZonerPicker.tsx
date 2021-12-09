import React, { useCallback } from 'react';
import { UseOptionsSupplier } from '..';
import { Choose } from '../components/choose/Choose';
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

    const chooser = useCallback(async (value: string) => {

        await new Promise(resolve => setTimeout(resolve, 0));
        return timezones.find(z => z.value === value);

    }, []);

    const supplier = useCallback(async (query: string): Promise<Array<{ name: string, options: Option[] }>> => {

        await new Promise(resolve => setTimeout(resolve, 0));

        if (!query || query.trim().length === 0) {

            return [{ name: 'Usuals', options: allRecentTimezones }, { name: 'Filtered', options: [] }];

        } else {

            const matcher = createSearchMatcher(query);
            const recentItems = allRecentTimezones.filter(item => matcher(item.description));
            const allFilteredItems = allTimezones.filter(item => !recentValues.has(item.value) && matcher(item.description));

            return [{ name: 'Usuals', options: recentItems }, { name: 'Filtered', options: allFilteredItems }];

        }

    }, []);

    return (
        <Choose<Option, { name: string, options: Option[] }>

            withSearch

            chooser={chooser as any}
            supplier={supplier as any}

            value={value}
            onChange={onChange}

            extractor={(group) => group.options}
            identifier={(item: Option) => item.value}

            renderChosen={({ option }) => <>{option ? option.description : 'Select...'}</>}

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

            placeholder={placeholder}

            className="border border-control-border rounded"

        />
    );

});
