import type { HTMLProps } from 'react';


export interface BadgeProps extends HTMLProps<HTMLSpanElement> {
    semantic: string;
    backgroundColor?: string;
}

/**
 * A small coloured label. `semantic` is used as the text colour and `backgroundColor` as the fill; both take raw colour values.
 */
export function Badge({ ref, semantic: color, backgroundColor, children }: BadgeProps) {
    return (
        <span ref={ref} className="px-2 rounded" style={{ color, backgroundColor }}>{children}</span>
    );
}
