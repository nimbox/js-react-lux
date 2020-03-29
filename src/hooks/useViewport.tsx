import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

//
// viewport
//


const ViewportContext = createContext({});

export const ViewportProvider: FC<{wait: number}> = ({ wait = 250, children }) => {

    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = debounce(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
    }, wait);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <ViewportContext.Provider value={size}>
            {children}
        </ViewportContext.Provider>
    );

};

export const useViewport = () => useContext(ViewportContext);
