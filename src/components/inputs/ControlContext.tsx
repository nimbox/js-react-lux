import { createContext } from 'react';
import type { ControlProps } from './Control';


type ContextProps = Pick<ControlProps, 'error'>;

export const ControlContext = createContext<ContextProps>({ error: false });
