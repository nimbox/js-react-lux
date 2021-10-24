import { useEffect, useState } from 'react';


//
// useKeyboardNavigator
//

export const useKeyboardNavigator = (lengths: number[]) => {

    const [selected, setSelected] = useState<[number, number]>([0, -1]);
    useEffect(() => { setSelected([0, -1]); }, [lengths]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        let [group, line] = selected;

        switch (e.key) {

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

        }

    };

    const reset = () => {
        setSelected([0, -1]);
    }

    return {
        selected: (selected[1] === -1 ? null : selected) as [number, number] | null,
        setSelected,
        handleKeyDown,
        reset
    };

};
