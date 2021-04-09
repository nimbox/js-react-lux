import { FC } from 'react';
export declare const ViewportProvider: FC<{
    wait: number;
}>;
export declare const useViewport: () => {
    width: number;
    height: number;
};
