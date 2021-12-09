import { useMemo } from 'react';


export const useCountOptions = <O, G>(options: G[] | undefined, extractor: (group: G) => O[]) => {

    const count = useMemo(() =>
        options != null ?
            options.reduce((a, group) => a + extractor(group).length, 0) :
            0,
        [options, extractor]
    );

    return count;

};
