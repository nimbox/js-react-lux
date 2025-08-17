import React from 'react';
import type { HTMLProps } from 'react';


export interface BadgeProps extends HTMLProps<HTMLSpanElement> {
    semantic: string;
    backgroundColor?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ semantic: color, backgroundColor, children }, ref) => {
    return (
        <span ref={ref} className="px-2 rounded" style={{ color, backgroundColor }}>{children}</span>
    );
});
