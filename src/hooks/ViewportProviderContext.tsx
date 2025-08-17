import { createContext } from 'react';


export const ViewportContext = createContext<{ width: number, height: number }>({ width: 0, height: 0 });
