import { useCallback, useEffect, useMemo, useState } from 'react';
import { EXTRACTOR } from '../components/choose/options';


//
// useOptionsKeyNavigator
//

export interface OptionsNavigatorProps<G, O> {

    /**
     * Handler to call when one of the elements is choosen by enter or tab. The
     * handler receives the option. 
     */
    onChoose?: (option: O) => void;

    /**
     * Extractor to get the options of a given group. Default is
     * `(group) => group`.
     */
    extractor?: (group: G) => O[];

}

export interface OptionsNavigatorReturn {

    /** 
     * Current selection as an array or null if nothing is selected. 
     */
    selected: [number, number] | null;

    /** 
     * Reset selection to null. 
     */
    reset: () => void;

    /** 
    * Utility to use inside your elements to capture arrow up and down events
    * and update the selection. 
    */
    onKeyDown: (event: React.KeyboardEvent) => void;

}

/**
 * Updates a selected state based on keyboard events. Whenever the options
 * changed the selection is reset. You can also reset the selection by calling
 * the returned `reset` function. Use the returned handleKeyDown function in
 * your components to capture arrow up and down events and update the selection.
 *
 * @param lengths 
 * @returns 
 */
export const useOptionsKeyNavigator = <G, O>(options: G[] | undefined, props?: OptionsNavigatorProps<G, O>): OptionsNavigatorReturn => {

    // Properties

    const {
        onChoose,
        extractor = EXTRACTOR
    } = props || {};

    // State

    const lengths = useMemo(() => {
        return options != null ? options.map(group => extractor(group).length) : [];
    }, [options, extractor]);

    const [selected, setSelected] = useState<[number, number]>([0, -1]);
    useEffect(() => { 
        console.log('reset selected');
        setSelected([0, -1]); 
    }, [lengths]);

    // Handlers

    const reset = () => {
        setSelected([0, -1]);
    }

    const onKeyDown = useCallback((e: React.KeyboardEvent) => {

        console.log('onKeyDown', e.key, selected);

        let [group, line] = selected;

        switch (e.key) {

            case 'Escape':

                if (line !== -1) {
                    e.preventDefault();
                    setSelected([0, -1])
                }
                break;

            case 'ArrowUp':

                e.preventDefault();
                do {
                    if (line > 0) {
                        setSelected([group, line - 1]);
                        break;
                    } else {
                        group = group - 1;
                        if (group >= 0) {
                            line = lengths[group];
                        }
                    }
                } while (group >= 0);
                break;

            case 'ArrowDown':

                e.preventDefault();
                do {
                    if (line + 1 < lengths[group]) {
                        setSelected([group, line + 1]);
                        break;
                    } else {
                        group = group + 1;
                        line = -1;
                    }
                } while (group < lengths.length);
                break;

            case 'Enter':
            case 'Tab':

                if (onChoose && line !== -1) {
                    e.preventDefault();
                    const group = options![selected[0]];
                    setSelected([0, -1])
                    onChoose(extractor(group)[selected[1]]);
                }
                break;

        }

    }, [options, extractor, lengths, selected, setSelected, onChoose]);

    // Return

    return {
        selected: (selected[1] === -1 ? null : selected) as [number, number] | null,
        reset,
        onKeyDown,
    };

};
