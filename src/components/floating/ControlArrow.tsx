import { FloatingArrow, type FloatingContext } from '@floating-ui/react';
import { forwardRef } from 'react';


export interface ControlArrowProps {
    context: FloatingContext;
}

export const ControlArrow = forwardRef<SVGSVGElement, ControlArrowProps>(
    function ControlArrow({ context }, ref) {
        return (
            <FloatingArrow
                ref={ref}
                context={context}
                strokeWidth={1}
                className="fill-control-bg [&>path:first-of-type]:stroke-control-border"
            />
        );
    }
);
