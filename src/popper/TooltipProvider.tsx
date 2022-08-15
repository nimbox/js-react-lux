import { FC, useCallback, useEffect } from 'react';
import { createPopper } from '@popperjs/core';
import classnames from 'classnames';


interface TooltipProviderProps {

    /**
     * Extra class name to pass to the tooltip element.
     */
    tooltipClassName?: string;

    /**
     * Selector of element where to append the tooltip.
     * @default 'body'
     */
    destinationSelector?: string;

    /**
     * Chilren.
     */
    children?: React.ReactNode;

}

export const TooltipProvider: FC<TooltipProviderProps> = (props) => {

    const {

        destinationSelector = 'body',

        children,

    } = props;

    const listener = useCallback((e: any) => {

        const target = e.target;

        if (target.hasAttribute('data-tooltip')) {

            const { tooltip, arrow } = createTooltip(target, props);

            const container = document.querySelector(destinationSelector);
            container?.appendChild(tooltip);

            const popper = createPopper(target, tooltip, {
                placement: target.getAttribute('data-tooltip-placement') || 'top',
                modifiers: [
                    { name: 'offset', options: { offset: [0, 8] } },
                    { name: 'arrow', options: { element: arrow } }
                ],
            });

            const handler = () => {
                popper.destroy();
                container?.removeChild(tooltip);
                target.removeEventListener('mouseleave', handler);
            };

            target.addEventListener('mouseleave', handler);
            tooltip.setAttribute('class', classnames('tooltip-element', props.tooltipClassName, 'tooltip-visible'));

        }

    }, [props, destinationSelector]);

    useEffect(() => {
        window.addEventListener('mouseover', listener);
        return () => {
            window.removeEventListener('mouseover', listener);
        };
    }, [listener]);

    // Render

    return (
        <>{children}</>
    );

};

//
// Utilities
//

function createTooltip(target: Element | null, props: TooltipProviderProps) {

    const tooltip = document.createElement('div');
    tooltip.setAttribute('class', classnames('tooltip-element', props.tooltipClassName));

    const content = document.createTextNode(target?.getAttribute('data-tooltip') || '');
    tooltip.appendChild(content);

    const arrow = document.createElement('div');
    arrow.setAttribute('class', 'tooltip-arrow');

    tooltip.appendChild(arrow);

    return { tooltip, arrow };

}