import { type CSSProperties } from 'react';


/**
 * The four marks a check control draws inside its box.
 *
 * Drawn here rather than taken from `@nimbox/icons-react` because they are not
 * icons: an icon is weighted to sit in a row of icons, these have to read
 * inside a box of 13 to 22 pixels. It also lets the slash be a slash rather
 * than a minus rotated until it looks like one.
 *
 * All four paint in `currentColor`, so the layer decides — which is how the
 * error state reaches them without any of them knowing about it.
 *
 * Internal — not exported from the package.
 */
export interface ControlMarkProps {
    className?: string;
    style?: CSSProperties;
}

const strokeProps = {
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true
} as const;

/** Decided, and the answer was yes. */
export const CheckMark = ({ className, style }: ControlMarkProps) => (
    <svg {...strokeProps} className={className} style={style}>
        <path d="M3.5 8.25 6.5 11.5 12.5 4.5" />
    </svg>
);

/** Decided, and the answer was no. Struck through, not crossed out — a cross
 * reads as a close button. */
export const SlashMark = ({ className, style }: ControlMarkProps) => (
    <svg {...strokeProps} className={className} style={style}>
        <path d="M4 12 12 4" />
    </svg>
);

/** Neither one thing nor the other — a set only partly chosen. */
export const MinusMark = ({ className, style }: ControlMarkProps) => (
    <svg {...strokeProps} className={className} style={style}>
        <path d="M3.5 8 12.5 8" />
    </svg>
);

/** Chosen, where only one answer is allowed. */
export const DotMark = ({ className, style }: ControlMarkProps) => (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className} style={style}>
        <circle cx="8" cy="8" r="4.5" />
    </svg>
);
