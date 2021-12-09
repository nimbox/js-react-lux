import classnames from 'classnames';
import { FC, useLayoutEffect, useState } from 'react';


export interface ShowTransitionProps extends React.HTMLAttributes<HTMLDivElement> {

    show: boolean,

    mountClassName?: string;
    showClassName?: string;
    unmountClassName?: string;

}

export enum ShowTransitionState {
    MOUNTING = 'MOUNTING', MOUNTED = 'MOUNTED', UNMOUNTING = 'UNMOUNTING'
}

export const ShowTransition: FC<ShowTransitionProps> = (props) => {

    // properties

    const {

        show,

        mountClassName,
        showClassName,
        unmountClassName,

        className,
        children,

        ...divProps

    } = props

    // configuration

    const [state, setState] = useState<ShowTransitionState | null>(null);

    useLayoutEffect(() => {
        setTimeout(() => {
            if (show) {
                if (state == null || !(state === ShowTransitionState.MOUNTING || state === ShowTransitionState.MOUNTED)) {
                    setState(ShowTransitionState.MOUNTING);
                }
            } else {
                if (state === ShowTransitionState.MOUNTING || state === ShowTransitionState.MOUNTED) {
                    setState(ShowTransitionState.UNMOUNTING);
                }
            }
        }, 0);
    }, [show, state]);

    const handleTransitionEnd = (transitionState: ShowTransitionState) => {
        switch (transitionState) {
            case ShowTransitionState.MOUNTING:
                setState(ShowTransitionState.MOUNTED);
                break;
            case ShowTransitionState.UNMOUNTING:
                setState(null);
                break;
        }
    };


    // render only when show or state != null

    if (!show && state === null) {
        return null;
    }

    let stateClassName: string | undefined;
    if (show && state === null) {
        stateClassName = mountClassName;
    } else {
        if (state === ShowTransitionState.MOUNTING || state === ShowTransitionState.MOUNTED) {
            stateClassName = showClassName;
        } else {
            stateClassName = unmountClassName || mountClassName;
        }
    }

    return (
        <div
            className={classnames(className, stateClassName)}
            onTransitionEnd={() => handleTransitionEnd(state!)}
            {...divProps}
        >
            {children}
        </div>
    );

};
