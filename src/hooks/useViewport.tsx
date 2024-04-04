import { useContext } from 'react';
import { ViewportContext } from './ViewPortProvider';


//
// useViewport
//

export const useViewport = () => useContext(ViewportContext);
