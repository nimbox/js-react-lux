import type { HTMLProps } from 'react';


export interface BadgeProps extends HTMLProps<HTMLSpanElement> {
    semantic: string;
    backgroundColor?: string;
}

export function Badge({ ref, semantic: color, backgroundColor, children }: BadgeProps) {
    return (
        <span ref={ref} className="px-2 rounded" style={{ color, backgroundColor }}>{children}</span>
    );
}
