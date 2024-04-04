/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

declare module 'react' {
    function forwardRef<T, P = uknown>(
        render: (props: P, ref: ForwardedRef<T>) => ReactElement | null
    ): (props: P & RefAttributes<T>) => ReactElement | null
}