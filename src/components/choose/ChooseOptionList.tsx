import React, { type Ref, useMemo } from 'react';
import { useOptionsCount } from '../../hooks/useOptionsCount';
import { List, type ListHandle } from '../list/List';
import { DEFAULT_ON_CHOOSE, DEFAULT_RENDER_GROUP_LABEL, DEFAULT_RENDER_OPTION, EXTRACTOR } from './options';


//
// ChooseOptionList
//

export interface ChooseOptionListProps<O, G = O[]> {

    ref?: Ref<HTMLDivElement>;

    /**
     * Imperative navigation handle of the underlying `List`. Forward the focused
     * input's key events to `handleRef.current.onKeyDown` — the list owns the
     * single active row and its navigation (arrows, Enter, and Tab).
     */
    handleRef?: Ref<ListHandle>;

    /**
     * The data structure representing groups and options: an array of groups
     * where `extractor(group)` yields that group's options.
     */
    options?: G[] | null;

    /**
     * Display a loading indicator as part of the list. (Does nothing for now.)
     * @default false
     */
    loading?: boolean;

    /**
     * Display an error indicator as part of the list. (Does nothing for now.)
     * @default false
     */
    loadingError?: boolean;

    /**
     * Extractor to get the options of a given group.
     * @default `(group) => group`
     */
    extractor?: (group: G) => O[];

    /**
     * Handler to call when an option is chosen (click or keyboard). Receives the
     * option.
     */
    onChoose?: (option: O) => void;

    /**
     * Render this element when there are no options. If it returns null the
     * component renders as null.
     * @default `() => null`
     */
    renderEmpty?: () => React.ReactNode;

    /**
     * Render the group label from the provided group.
     * @default `() => null`
     */
    renderGroupLabel?: (props: { group: G }) => React.ReactNode;

    /**
     * Render the option from the provided option.
     * @default `({ option }) => String(option)`
     */
    renderOption?: (props: { option: O }) => React.ReactNode;

    className?: string;

}

/**
 * A data-driven list of options grouped by group. It maps its `options` data
 * onto the shared element-driven `List`: `renderGroupLabel` becomes a
 * `List.Header`, each option a `List.Item`, and consecutive groups are split by
 * a `List.Separator`. The single active row, keyboard + hover navigation, and
 * scroll-into-view all come from `List`.
 */
export function ChooseOptionList<O, G = O[]>({
    ref,
    handleRef,
    options,
    loading = false,
    loadingError = false,
    extractor = EXTRACTOR,
    onChoose = DEFAULT_ON_CHOOSE,
    renderEmpty,
    renderGroupLabel = DEFAULT_RENDER_GROUP_LABEL,
    renderOption = DEFAULT_RENDER_OPTION,
    className,
    ...divProps
}: ChooseOptionListProps<O, G> & React.HTMLAttributes<HTMLDivElement>) {

    const optionsCount = useOptionsCount(options, extractor);

    const empty = useMemo(
        () => (!loading && optionsCount === 0) ? renderEmpty?.() : null,
        [loading, optionsCount, renderEmpty]
    );

    if (loading || loadingError || (optionsCount === 0 && empty == null)) {
        return null;
    }

    if (optionsCount === 0) {
        return <div ref={ref} className={className} {...divProps}>{empty}</div>;
    }

    return (
        <List ref={ref} handleRef={handleRef} role="listbox" className={className} {...divProps}>
            {options!.map((group, g) => {

                const groupOptions = extractor(group);
                if (groupOptions.length === 0) { return null; }

                const label = renderGroupLabel({ group });

                return (
                    <React.Fragment key={g}>
                        {g > 0 && <List.Separator />}
                        {label != null && <List.Header>{label}</List.Header>}
                        {groupOptions.map((option, i) => (
                            <List.Item key={i} role="option" onClick={() => onChoose(option)}>
                                {renderOption({ option })}
                            </List.Item>
                        ))}
                    </React.Fragment>
                );

            })}
        </List>
    );

}
