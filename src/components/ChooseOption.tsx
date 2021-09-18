import classnames from 'classnames';
import _debounce from 'lodash/debounce';
import _isFunction from 'lodash/isFunction';
import React, { Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Delay, Loading } from '..';
import { useKeyboardNavigator } from '../hooks/useKeyboardNavigator';
import { SearchIcon } from '../icons';
import { ChooseOptionList, ChooseOptionListProps, defaultGetOptions, defaultRenderGroupLabel, defaultRenderOption } from './ChooseOptionList';
import { Input } from './controls/Input';


//
// ChooseOption
//

export interface ChooseOptionFooterProps<G, O> extends Pick<ChooseOptionListProps<G, O>, 'options' | 'selected'> {

    value?: string | ReadonlyArray<string> | number | undefined;

}

export interface ChooseOptionProps<G, O> extends Omit<ChooseOptionListProps<G, O>, 'options' | 'selected'> {

    /**
     * Add a search bar at the top. When this option is set you need to control
     * the `value` and provide the `onChange` handler in order to provide the
     * filtered options.
     */
    withSearch?: boolean;

    //

    /**
     * Function to provide options given a search query. This function
     * can return the options or a promise that resolves to the
     * options.
     */
    options: G[] | Promise<G[]> | ((search: string) => (G[] | Promise<G[]>));

    //

    /**
     * Render the footer with the given properties.
     */
    renderFooter?: (props: ChooseOptionFooterProps<G, O>) => React.ReactNode;

    /**
     * Callback to call when escape is pressed.
     */
    onHide?: () => void;

    /**
     * Classname of the container.
     */
    className?: string;

    /**
    * Reference to the container.
    */
    containerRef?: React.Ref<HTMLDivElement>;

}

/**
 * `ChooseOption` is controlled and synchronous component that can is used by the
 * more advanced `Choose` component. The objective behind this component is to 
 * provide a very customizable (albeit simple) interface for option selection.
 * 
 */
export const ChooseOption = React.forwardRef(<G, O>(props: ChooseOptionProps<G, O> & React.InputHTMLAttributes<HTMLInputElement>, ref: Ref<HTMLInputElement & { handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void }>) => {

    // properties

    const {

        withSearch = false,

        loading,
        error,
        options,

        getOptions = defaultGetOptions,

        renderGroupLabel = defaultRenderGroupLabel,
        renderOption = defaultRenderOption,
        renderFooter,

        defaultValue,
        value,
        onChange,

        onKeyDown,

        onHide,
        onChoose,

        className,
        containerRef,

        ...inputProps


    } = props;

    // assertions

    if (process.env.NODE_ENV !== 'production') {
        if (withSearch && !_isFunction(options)) {
            console.error('Provided withSearch parameter without providing an option provider function.  Try setting options to (search ) => [[ ... ]]');
        }
    }

    // configuration

    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false);
    const searchRef = useRef<{ cancel: (() => void) } | null>(null);

    const [displayOptions, setDisplayOptions] = useState<G[]>([]);

    // search logic

    const doSearch = useCallback((search) => {

        let working = true;
        (async () => {
            const promisedOptions = await Promise.resolve(_isFunction(options) ? options(search) : options);
            if (working) {
                setDisplayOptions(promisedOptions);
                searchRef.current = null;
                setSearching(false);
            }
        })();

        return ({ cancel: () => { working = false; } });

    }, [options]);

    const handleSearch = useCallback(_debounce((search) => {

        if (searchRef.current) {
            searchRef.current.cancel();
        }

        setSearching(true);
        searchRef.current = doSearch(search);

    }, 150), []);

    useEffect(() => {
        const search = String(value != null ? value : (defaultValue || ''));
        setSearchValue(search);
        handleSearch(search);
    }, [defaultValue, handleSearch, value]);

    //

    const optionsLengths = useMemo(() => displayOptions.map(group => getOptions(group).length), [displayOptions, getOptions]);
    const { selected, handleKeyDown: navigatorHandleKeyDown } = useKeyboardNavigator(optionsLengths);

    // handlers

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (value != null) {
            onChange!(e);
        } else {
            setSearchValue(e.target.value);
            handleSearch(e.target.value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        console.log('e.key', e.key);

        switch (e.key) {

            case 'Escape':
                if (onHide) {
                    onHide();
                }
                break;

            case 'Tab':
            case 'Enter':

                if (selected != null) {
                    e.preventDefault();
                    handleChoose(selected);
                }

                break;

        }

        navigatorHandleKeyDown(e);

    };

    const handleChoose = (selected: [number, number]) => {
        const group = displayOptions[selected[0]];
        onChoose(getOptions(group)[selected[1]]);
    };

    //

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({ ...inputRef.current!, handleKeyDown }));

    // render 

    const footer = renderFooter ? renderFooter({ value, options: displayOptions, selected }) : null;

    return (
        <div
            ref={containerRef}
            className={classnames(
                'relative max-h-96 Xlux-space-y-2em flex flex-col divide-y divide-control-border overflow-y-auto',
                className
            )}
        >

            {withSearch &&
                <div className="flex-none" style={{ padding: '0.5em 0.5em 0.5em 0.5em' }}>
                    <Input

                        ref={inputRef}

                        type="text"
                        autoFocus

                        value={searchValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}

                        {...inputProps}

                        end={<>{(loading ? <Delay><Loading /></Delay> : null)}<SearchIcon /></>}

                    />
                </div>
            }

            <ChooseOptionList

                loading={loading}
                error={error}
                options={displayOptions}
                selected={selected}

                getOptions={getOptions}

                renderGroupLabel={renderGroupLabel}
                renderOption={renderOption}

                onChoose={onChoose}

                className="flex-1 min-h-0 overflow-y-auto"

            />

            {footer &&
                <div className="flex-none">
                    {footer}
                </div>
            }

        </div >
    );

});
