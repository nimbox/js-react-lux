import { useContext } from 'react';
import { ViewportContext } from './ViewportProviderContext';


export const useViewport = () => useContext(ViewportContext);
