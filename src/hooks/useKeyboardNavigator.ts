import { useEffect, useState } from "react";


export const useKeyboardNavigator = (arrays: any[][]) => {

    const [cursor, setCursor] = useState<[number, number]>([0, -1]);
    useEffect(() => { setCursor([0, -1]); }, [...arrays]);

    const handle = (e: React.KeyboardEvent<HTMLInputElement>) => {

        let [group, line] = cursor;

        switch (e.key) {

            case 'ArrowUp':

                e.preventDefault();
                do {
                    if (line > 0) {
                        setCursor([group, line - 1]);
                        break;
                    } else {
                        group = group - 1;
                        if (group >= 0) {
                            line = arrays[group].length;
                        }
                    }
                } while (group >= 0);

                break;

            case 'ArrowDown':

                e.preventDefault();
                do {
                    if (line + 1 < arrays[group].length) {
                        setCursor([group, line + 1]);
                        break;
                    } else {
                        group = group + 1;
                        line = -1;
                    }
                } while (group < arrays.length);

                break;

        }

    };

    const reset = () => {
        setCursor([0, -1]);
    }

    return {
        cursor: cursor[1] === -1 ? null : cursor as [number, number] | null,
        handle,
        reset
    };

};