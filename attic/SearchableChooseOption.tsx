import React, { FC, Ref, useMemo, useState } from 'react';
import { AsyncSearchInput } from '../controls/AsyncSearchInput';
import { ChooseOption, ChooseOptionProps } from './ChooseOption';
import { DEFAULT_RENDER_GROUP_LABEL, DEFAULT_RENDER_NO_OPTIONS, DEFAULT_RENDER_OPTION, EXTRACTOR } from './options';


//
// SearchableChooseOption
//

export interface SearchableChooseOptionNoOptionsProps {

    /**
     * The search input value.
     */
    value: string;

}

export interface SearchableChooseOptionFooterProps<G, O> extends ChooseOptionFooterProps<G, O> {

    /**
     * The search input value.
     */
    value: string;

}

export interface SearchableChooseOptionProps<G, O> extends 
    Omit<ChooseOptionProps<G, O>, 'renderEmtpy' | 'renderFooter'> {

    //

    /**
     * Render this element when there are no options. It there are no options
     * and this function returns null, the component is rendered as null.
     * Defaults to `() => null` 
     */
    renderEmtpy?: (props: SearchableChooseOptionNoOptionsProps) => React.ReactNode;

    /**
     * Render the footer with the given properties.
     */
    renderFooter?: FC<SearchableChooseOptionFooterProps<G, O>>;

}

/**
 * ChooseOption is a `div` that internally has an `input` that can be accessed
 * via its `inputRef` (usually to set its focus). The input automatically calls
 * the options promise and manages the loading and error state.
 * 
 * The standard way to call this is using the helper hook useSearchOptions:
 * 
 * ```jsx
 * const options = useSearchOptions(provider);
 * return (<ChooseOption {...options}/>);
 * ```
 */
export const SearchableChooseOption = React.forwardRef(<G, O>(
    props: SearchableChooseOptionProps<G, O> & React.InputHTMLAttributes<HTMLDivElement>,
    ref: Ref<HTMLDivElement>
) => {

    // properties

    const {

        // useSearchOptions

        options,
        loading,
        error,
        search: search,

        // useOptionsKeyNavigator

        selected,
        reset,
        onKeyDown,

        // input

        autoFocus,

        // renderers

        renderEmtpy = DEFAULT_RENDER_NO_OPTIONS,
        renderGroupLabel = DEFAULT_RENDER_GROUP_LABEL,
        renderOption = DEFAULT_RENDER_OPTION,
        renderFooter,

        extractor = EXTRACTOR,
        onChoose: onPropsChoose,

        ...divProps

    } = props;

    // configuration

    const [value, setValue] = useState('');
    const showFooter = useMemo(() => {
        return (
            value != null && value.trim().length > 0 &&
            options != null && options.reduce((a, g) => a + extractor(g).length, 0) === 0
        );
    }, [options, extractor, value]);

    // handlers

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
        search(value);
    }

    const handleChoose = (option: O) => {
        onPropsChoose(option);
        if (withClearOnChoose) {
            setValue('');
            search('');
        }
    };

    // render



    return (
        <div {...divProps}>

            <div className="lux-p-2em">
                <AsyncSearchInput

                    autoFocus={autoFocus}

                    value={value}
                    onChange={handleChange}

                    onKeyDown={onKeyDown}
                
                />
            </div>

            <ChooseOption

                options={options}
                loading={loading}
                error={error}
                selected={selected}

                extractor={extractor}
                onChoose={handleChoose}

                renderEmpty={() => showFooter && renderFooter ? null : <div className="lux-p-2em">{renderEmtpy({ value })}</div>}
                renderGroupLabel={renderGroupLabel}
                renderOption={renderOption}

                className="flex-1 min-h-0 overflow-y-auto"

            />

        </div>
    );

});
