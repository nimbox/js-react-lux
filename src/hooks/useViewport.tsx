import { useContext } from 'react';
import { ViewportContext } from './ViewportProvider';


//
// useViewport
//

export const useViewport = () => useContext(ViewportContext);
