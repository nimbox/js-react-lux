import classnames from 'classnames';
import React, { type Ref, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useOptionsCount } from '../../hooks/useOptionsCount';
import { DEFAULT_ON_CHOOSE, DEFAULT_RENDER_GROUP_LABEL, DEFAULT_RENDER_OPTION, EXTRACTOR } from './options';


//
// ChooseOptionList
//

export interface ChooseOptionListProps<O, G = O[]> {

    /**
     * The data structure representing groups and options. Given a `Group`
     * interface and an `Option` interface, it has to be the case that `options`
     * is options is an array of `Group` and for each element in that array
     * `getOptions(group)` provides an array of `Option`.
     */
    options?: G[] | null;

    /** 
     * Display a loading indicator as part of the list. The data that
     * needs to be shown is on its way. (Does nothing for now).
     * @default `false`
     */
    loading?: boolean;

    /** 
     * Display an error indicator as part of the list. The data did not load
     * correctly. (Does nothing for now).
     * @default `false`
     */
    loadingError?: boolean;

    /**
     * The index for the element that needs to be shown as selected. This is
     * used to draw a `cursor` like visualization when navigating with the 
     * keyboard.
     */
    selected?: [number, number] | null;

    //

    /**
     * Extractor to get the options of a given group.
     * @default `(group) => group`
     */
    extractor?: (group: G) => O[];

    /**
    * Handler to call when one of the elements is clicked inside the list. The
    * handler receives the option. 
    */
    onChoose?: (option: O) => void;

    //

    /**
     * Render this element when there are no options. It there are no options
     * and this function returns null, the component is rendered as null.
     * @default `() => null`
     */
    renderEmpty?: () => React.ReactNode;

    /**
     * Render the group label from the provided group.
     * @default `() => null`
     */
    renderGroupLabel?: (props: { group: G }) => React.ReactNode

    /**
     * Render the option from the provided option.
     * @default `({ option }) => String(option)`
     */
    renderOption?: (props: { option: O }) => React.ReactNode;

    //

    /**
     * The class name to use for the root div element.
     * @default `blank`
     */
    className?: string;

}

/**
 * Component to choose from a list of options. When an option is clicked on the
 * `onChoose` callback is called with the option. Treat this component as an
 * unstyled `div`.
 *
 * The options are be provided in groups, so in the usual case, an array with
 * the array of options is required (note the double brackets at the begining
 * and the end): 
 *
 * ```js
 * [[ 'Yellow', 'Blue', 'Red' ]]
 * [[ 'Yellow', 'Blue', 'Red' ], [ 'Green', 'Purple', 'Orange' ]]
 * ```
 */
export const ChooseOptionList = React.forwardRef(<O, G = O[]>(
    props: ChooseOptionListProps<O, G> & React.HTMLAttributes<HTMLDivElement>,
    ref: Ref<HTMLDivElement>
) => {

    // Properties

    const {

        options,
        loading = false,
        loadingError = false,
        selected,

        extractor = EXTRACTOR,
        onChoose = DEFAULT_ON_CHOOSE,

        renderEmpty,
        renderGroupLabel = DEFAULT_RENDER_GROUP_LABEL,
        renderOption = DEFAULT_RENDER_OPTION,

        className,

        ...divProps

    } = props;

    // Configuration

    // Create option references to scroll into view when the chosen
    // option changes.

    const optionsRef = useRef<(HTMLLIElement | null)[][]>();
    const [optionsRefAvailable, setOptionsRefAvailable] = useState(false);
    useEffect(() => {
        optionsRef.current = options != null ?
            options.map(group => extractor(group).map(() => null)) : [];
        setOptionsRefAvailable(true);
    }, [options, extractor]);

    useLayoutEffect(() => {
        if (optionsRef.current != null && selected != null) {
            const li = optionsRef.current?.[selected[0]][selected[1]];
            if (li) {
                li.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }
        }
    }, [optionsRefAvailable, selected]);

    // Handlers

    const handleClick = (_e: React.MouseEvent<HTMLLIElement>, g: number, i: number) => {
        onChoose(extractor(options![g])[i]);
    };

    // Render empty

    const optionsCount = useOptionsCount(options, extractor);
    const empty = useMemo(() =>
        (!loading && optionsCount === 0) ? renderEmpty?.() : null,
        [loading, optionsCount, renderEmpty]
    );

    // Render Label

    const groupLabel = useCallback((group: G) => {
        const label = renderGroupLabel?.({ group });
        return label ? <div className="lux-px-2em lux-py-0.5em">{label}</div> : null;
    }, [renderGroupLabel]);

    // Render

    if (loading || loadingError || (optionsCount === 0 && empty == null)) {
        return null;
    }

    return (
        <div ref={ref} {...divProps} className={className}>

            {optionsCount === 0 ?
                empty
                :
                <div className={classnames({ 'pointer-events-none': loading })}>
                    {options!.map((group, g) =>
                        extractor(group).length > 0 &&
                        <div key={g}>

                            {groupLabel(group)}

                            <ul className="list-none">
                                {extractor(group).map((option, i) =>
                                    <li key={i}
                                        ref={element => {
                                            if (
                                                optionsRef.current != null &&
                                                g < optionsRef.current.length
                                            ) {
                                                optionsRef.current[g][i] = element;
                                            }
                                        }}
                                        onClick={(e) => handleClick(e, g, i)}
                                        className={classnames(
                                            'lux-px-2em lux-py-0.5em',
                                            { 'bg-primary-500': !loading && selected != null && selected[0] === g && selected[1] === i },
                                            'hover:bg-secondary-500',
                                            'cursor-pointer'
                                        )}
                                    >
                                        {renderOption({ option })}
                                    </li>
                                )}
                            </ul>

                        </div>
                    )}
                </div>
            }

        </div>
    );

});

