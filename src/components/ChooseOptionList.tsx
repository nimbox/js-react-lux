/* eslint-disable @typescript-eslint/no-unused-vars */
import classnames from 'classnames';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { consumeEvent } from '../utilities/consumeEvent';


//
// ChooseOptionList
//

export interface ChooseOptionListProps<G, O> {

    /** 
     * Display a loading indicator as part of the list. The data that
     * needs to be shown is on its way. (Does nothing for now).
     */
    loading?: boolean;

    /** 
     * Display an error indicator as part of the list. The data did not load
     * correctly. (Does nothing for now).
     */
    error?: any;

    /**
     * The data structure representing groups and options. Given a `Group`
     * interface and an `Option` interface, it has to be the case that `options`
     * is options is an array of `Group` and for each element in that array
     * `getOptions(group)` provides an array of `Option`.
     */
    options: G[];

    /**
     * The index for the element that needs to be shown as selected. This is
     * used to draw a `cursor` like visualization when navigating with the 
     * keyboard.
     */
    selected?: [number, number] | null;

    //

    /**
     * Extractor to get the options of a given group. Default is
     * `(group) => group`.
     */
    getOptions?: (group: G) => O[];

    //

    /**
     * Render the group label from the provided group. Defaults to `() => null`
     * for no group labels.
     */
    renderGroupLabel?: (props: { group: G }) => React.ReactNode

    /**
     * Render the option from the provided option. Defaults to 
     * `({option }) => String(option)` 
     */
    renderOption?: (props: { option: O }) => React.ReactNode;

    //

    /**
     * Handler to call when one of the elements is clicked inside the list. The
     * handler receives the option. 
     */
    onChoose: (option: O) => void;

    //

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
 * ChooseOptionList. The list display for `ChooseOption`.
 * 
 * @param props 
 * @returns 
 */
export const ChooseOptionList = <G, O>(props: ChooseOptionListProps<G, O>) => {

    // properties

    const {

        loading = false,
        error = false,
        options,
        selected,

        getOptions = defaultGetOptions,

        renderGroupLabel = defaultRenderGroupLabel,
        renderOption = defaultRenderOption,

        onChoose,

        className,
        containerRef

    } = props;

    // configuration

    // create option references to scroll into view when the chosen
    // option changes

    const optionsRef = useRef<(HTMLLIElement | null)[][]>();
    const [optionsRefAvailable, setOptionsRefAvailable] = useState(false);
    useEffect(() => {

        console.log('populating refs', options);

        optionsRef.current = options.map(group => getOptions(group).map(option => null));
        setOptionsRefAvailable(true);

    }, [options, getOptions]);

    useLayoutEffect(() => {
        if (optionsRef.current != null && selected != null) {
            const li = optionsRef.current?.[selected[0]][selected[1]];
            if (li) {
                li.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }
        }
    }, [optionsRefAvailable, selected]);

    // handlers

    const handleClick = (e: React.MouseEvent<HTMLLIElement>, g: number, i: number) => {
        e.preventDefault();
        e.stopPropagation();
        onChoose(getOptions(options[g])[i]);
    };

    // render

    const optionsCount = useMemo(
        () => options.reduce((a, group) => a + getOptions(group).length, 0),
        [getOptions, options]
    );
    if (optionsCount === 0) {
        return null
    }

    // render when there is at least one option

    return (
        <div

            ref={containerRef}
            onMouseDown={consumeEvent}

            className={className}
            style={{ padding: '0.5em 0' }}

        >

            {options.map((group, g) =>
                getOptions(group).length > 0 &&
                <div key={g}>

                    <div style={{ padding: '0 0.5em' }}>
                        {renderGroupLabel({ group })}
                    </div>

                    <ul className="list-none">
                        {getOptions(group).map((option, i) =>
                            <li key={i}
                                ref={element => {
                                    if (optionsRef.current != null && g < optionsRef.current.length) {
                                        optionsRef.current[g][i] = element;
                                    }
                                }}
                                onClick={(e) => handleClick(e, g, i)}
                                className={classnames(
                                    {
                                        'bg-primary-500': selected != null && selected[0] === g && selected[1] === i
                                    },
                                    'hover:bg-secondary-500',
                                    'cursor-pointer'
                                )}
                                style={{ padding: '0 0.5em' }}
                            >
                                {renderOption({ option })}
                            </li>
                        )}
                    </ul>

                </div>
            )}

        </div>
    );

};

// default properties

export const defaultGetOptions = <G, O>(group: G) => group as unknown as O[];
export const defaultRenderGroupLabel = () => null;
export const defaultRenderOption = <O,>({ option }: { option: O }) => String(option);
