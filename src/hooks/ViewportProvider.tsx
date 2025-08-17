import { debounce as _debounce } from 'lodash';
import { type FC, useEffect, useState } from 'react';
import { ViewportContext } from './ViewportProviderContext';


//
// ViewportProvider
//

export interface ViewportProviderProps {

    wait?: number;

    children?: React.ReactNode;

}

export const ViewportProvider: FC<ViewportProviderProps> = ({ wait = 250, children }) => {

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