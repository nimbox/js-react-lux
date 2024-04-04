import classnames from 'classnames';
import React from 'react';
import { FC, useLayoutEffect, useState } from 'react';


export interface ShowTransitionProps extends React.HTMLAttributes<HTMLDivElement> {

    /**
     * A boolean that determines the visibility of the component's children.
     * When true, the children are displayed; when false, the children are
     * hidden.
     */
    show: boolean,

    /**
     * (Optional) The CSS class applied during the initial mounting phase before
     * the element is fully shown. This class can be used to define the starting
     * state of the animation.
     */
    mountClassName?: string;

    /**
     * (Optional) The CSS class applied when the element is fully visible and
     * mounted. It is typically used for the active state of the component where
     * the children are fully shown.
     */
    showClassName?: string;

    /** 
     * (Optional) The CSS class applied when the component starts the
     * unmount/hide transition. This can be used to animate the hiding process.
     */
    unmountClassName?: string;

    /**
     * (Optional) Standard React className prop to apply custom styling to the
     * component.
     */
    className?: string;

}

enum ShowTransitionState {
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

    } = props;

    // configuration

    const [state, setState] = useState<ShowTransitionState | null>(null);

    useLayoutEffect(() => {
        const t = setTimeout(() => {
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
        return () => clearTimeout(t);
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

    // Render only when show or state != null.

    if (!show && state === null) {
        return null;
    }

    // Render with the appropriate class name.

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
