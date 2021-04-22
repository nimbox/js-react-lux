import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { number } from '@storybook/addon-knobs';


//
// viewport
//

const ViewportContext = createContext<{ width: number, height: number }>({ width: 0, height: 0 });

export const ViewportProvider: FC<{ wait: number }> = ({ wait = 250, children }) => {

    const [scale, setScale] = useState({ width: window.innerWidth, height: window.innerHeight });
    const handleRescale = debounce(() => {
        setScale({ width: window.innerWidth, height: window.innerHeight });
    }, wait);

    useEffect(() => {
        window.addEventListener('rescale', handleRescale);
        return () => window.removeEventListener('rescale', handleRescale);
    });

    return (
        <ViewportContext.Provider value={scale}>
            {children}
        </ViewportContext.Provider>
    );

};

export const useViewport = () => useContext(ViewportContext);
