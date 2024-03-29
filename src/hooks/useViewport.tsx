import { debounce as _debounce } from 'lodash';
import React, { createContext, FC, useContext, useEffect, useState } from 'react';


//
// useViewport
//

const ViewportContext = createContext<{ width: number, height: number }>({ width: 0, height: 0 });

export const ViewportProvider: FC<{ wait: number, children?: React.ReactNode }> = ({ wait = 250, children }) => {

    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = _debounce(() => setSize({ width: window.innerWidth, height: window.innerHeight }), wait);

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
