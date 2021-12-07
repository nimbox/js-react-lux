import { useMemo } from 'react';
import { OptionsExtractor } from '../components/choose/options';

//
// useOptionsCount
//

/**
 * Count the number of options present in all the groups.
 * 
 * @param options 
 * @param extractor 
 * @returns 
 */
export const useOptionsCount = <O, G>(options: G[] | null | undefined, extractor: OptionsExtractor<O, G>) => {

    const count = useMemo(() =>
        options != null ? options.reduce((a, group) => a + extractor(group).length, 0) : 0,
        [extractor, options]
    );

    return count;

};