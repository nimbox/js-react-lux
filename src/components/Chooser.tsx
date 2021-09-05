import classnames from 'classnames';
import _debounce from 'lodash/debounce';
import { ReactElement, useEffect, useState } from 'react';
import { useKeyboardNavigator } from '../hooks/useKeyboardNavigator';
import { ItemProvider } from '../types/ItemProvider';
import { Input } from './controls/Input';


export interface ChooserProps<V, T> {

    provider: ItemProvider<V, T>

    noSearch?: boolean;

    defaultValues?: V[];

    /** Component to render an item while in the dropdown list. */
    renderListItem?: (props: { item: T }) => React.ReactNode;

    className?: string;

}

/**
 * Items go through this process before being shown. All default value items are
 * read and filtered against the query string. All searched items are retrieved 
 * and filtered against all default value items. Whenever there is a new query 
 * string, the default values are filtered, and the searched items are 
 * retrieved. 
 * 
 */
export const Chooser = <T,>({ provider, noSearch, defaultValues = [], renderListItem, className }: ChooserProps<string, T>): ReactElement<any, any> | null => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(undefined);

    const [allDefaultItems, setAllDefaultItems] = useState<T[]>([]);
    const [defaultItems, setDefaultItems] = useState<T[]>([]);

    const [allSearchedItems, setAllSearchedItems] = useState<T[]>([]);
    const [searchedItems, setSearchedItems] = useState<T[]>([]);

    const load = async (promise: Promise<void>) => {
        try {
            setLoading(true);
            setError(undefined);
            await promise;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    // Manage default items

    const getAllDefaultItems = async (defaultValues: string[]) => {
        if (defaultValues) {
            await load(Promise.resolve(provider.get(...defaultValues)).then(items => {
                setAllDefaultItems(items);
                setDefaultItems(provider.find(items, search));
            }));
        } else {
            setAllDefaultItems([]);
            setDefaultItems([]);
        }
    };
    useEffect(() => {
        getAllDefaultItems(defaultValues);
    }, [defaultValues]);

    // searched items

    const getAllSearchedItems = async (search: string) => {
        await load(Promise.resolve(provider.search(search)).then(items => {
            setAllSearchedItems(items);
        }));
    };
    useEffect(() => {
        const ids = new Set(allDefaultItems.map(item => provider.value(item)));
        setSearchedItems(allSearchedItems.filter(item => !ids.has(provider.value(item))));
    }, [allDefaultItems, allSearchedItems]);

    // The cursor moves with the up and down key events.

    const { cursor, setCursor, handle, reset } = useKeyboardNavigator([defaultItems, searchedItems]);

    // handlers

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Escape':
                console.log('Escape');
                reset();
                break;
            case 'Tab':
            case 'Enter':
                setSearch('');
                if (cursor != null) {
                    console.log('keyboard', [defaultItems, searchedItems][cursor[0]][cursor[1]]);
                }
                break;
            default:
                handle(e);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLLIElement>, cursor: [number, number]) => {
        e.stopPropagation();
        e.preventDefault();
        setCursor(cursor);
        console.log('mouse', cursor);
    }

    const handleSearch = _debounce((search: string) => {
        setDefaultItems(provider.find(allDefaultItems, search));
        getAllSearchedItems(search);
    }, 150);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (e.target.value.length > 0) {
            handleSearch(e.target.value);
        } else {
            setDefaultItems(allDefaultItems);
            setAllSearchedItems([]);
        }
    };

    // render

    return (
        <div className={className}>

            {!noSearch &&
                <Input type="text" autoComplete="off"
                    name="search" value={search}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                />
            }

            <div className="list-none border border-control-border rounded overflow-hidden">

                <ul>
                    {defaultItems.map((item, i) =>
                        <li key={String(provider.value(item))}
                            onClick={(e) => handleClick(e, [0, i])}
                            className={classnames('px-3', { 'bg-primary-500': cursor && cursor[0] === 0 && cursor[1] === i }, 'hover:bg-secondary-500', 'cursor-pointer')}
                        >
                            {renderListItem!({ item })}
                        </li>
                    )}
                </ul>

                {defaultItems.length > 0 && searchedItems.length > 0 && <hr />}

                <ul>
                    {searchedItems.map((item, i) =>
                        <li key={String(provider.value(item))}
                            onClick={(e) => handleClick(e, [1, i])}
                            className={classnames('px-3', { 'bg-primary-500': cursor && cursor[0] === 1 && cursor[1] === i }, 'hover:bg-secondary-500', 'cursor-pointer')}
                        >
                            {renderListItem!({ item })}
                        </li>
                    )}
                </ul>

            </div>

        </div>
    );

};
