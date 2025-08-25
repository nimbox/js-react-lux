import { arrow as arrowMw, autoUpdate, flip, FloatingPortal, offset, shift, useFloating, type Placement } from '@floating-ui/react';
import React, { useMemo, useRef, type FC } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { ControlArrow } from './ControlArrow';


export interface PopupProps {

    visible?: boolean;
    onChangeVisible?: (visible: boolean) => void;

    withPlacement?: Placement;
    withArrow?: boolean;

    Component: React.FunctionComponent;

    children: React.ReactElement<any>;

}

export const Popup: FC<PopupProps> = (props: PopupProps) => {

    const {

        visible = false,
        onChangeVisible = () => { },

        withPlacement: placement = 'bottom',
        withArrow = true,

        Component,

        children,

    } = props;

    // Configuration

    const arrowRef = useRef<SVGSVGElement | null>(null);

    const middleware = useMemo(() => {
        const list = [offset(4), flip(), shift()];
        if (withArrow) list.push(arrowMw({ element: arrowRef, padding: 0 }));
        return list;
    }, [withArrow]);

    const { refs, floatingStyles, context } = useFloating({
        placement,
        middleware,
        whileElementsMounted: autoUpdate,
    });

    // Close on outside click when visible

    useOnOutsideClick(
        visible,
        () => { if (visible) onChangeVisible(false); },
        refs.reference.current,
        refs.floating.current
    );

    // Render

    return (
        <>
            {React.cloneElement(children, { ref: refs.setReference })}
            {visible && (
                <FloatingPortal id="modal">
                    <div
                        ref={refs.setFloating}
                        className="z-30 popper-element text-base rounded border border-control-border bg-white"
                        style={floatingStyles}
                    >
                        <Component />
                        {withArrow && <ControlArrow ref={arrowRef} context={context} />}
                    </div>
                </FloatingPortal>
            )}
        </>
    );

};
