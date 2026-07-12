import { FloatingArrow, type FloatingContext } from '@floating-ui/react';
import type { Ref } from 'react';


export interface ControlArrowProps {
    ref?: Ref<SVGSVGElement>;
    context: FloatingContext;
}

export function ControlArrow({ ref, context }: ControlArrowProps) {
    return (
        <FloatingArrow
            ref={ref}
            context={context}
            strokeWidth={1}
            className="fill-control-bg [&>path:first-of-type]:stroke-control-border"
        />
    );
}
