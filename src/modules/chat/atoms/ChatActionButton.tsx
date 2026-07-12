import { type HTMLAttributes, type ReactNode, type Ref } from 'react';
import { cn } from '../../../components/utilities/cn';


export interface ChatActionButtonProps {

    ref?: Ref<HTMLElement>;

    /** The button label. */
    children: ReactNode;

    /**
     * When set, the button is a link. Use `external` to open it in a new tab
     * (right for a web URL; leave it off for `tel:` / `mailto:`).
     */
    href?: string;
    external?: boolean;

    /** When set (and no `href`), the button is a `<button>` firing this on click. */
    onClick?: () => void;

    /**
     * The leading icon. Optional — when omitted the pill is label-only; pass a glyph
     * fitting the action (a phone for a call, a copy glyph for a code, …).
     */
    icon?: ReactNode;

    className?: string;

}

// The visual for a single action button under a message bubble — a bordered,
// rounded pill with an optional leading icon and a centered label. Prop-driven like
// every atom: it takes resolved primitives (a label + an `href` OR an `onClick`),
// never a domain "action". The consumer maps its own action kinds onto this —
// lux owns the look, not the semantics. With neither `href` nor `onClick` it is a
// plain, non-interactive pill.
//
// Forwards its ref and passes extra props through to the root element, so it can
// serve as a floating trigger (e.g. a `Menu` clones its trigger with a ref + the
// open/keyboard handlers) — the pill then doubles as, say, a list-menu button.
export function ChatActionButton(
    { ref, children, href, external, onClick, icon, className, ...rest }: ChatActionButtonProps & Omit<HTMLAttributes<HTMLElement>, keyof ChatActionButtonProps>
) {

    const inner = (
        <>
            {icon != null && (
                <span className="flex shrink-0 items-center text-base text-gray-500">
                    {icon}
                </span>
            )}
            <span
                className={cn(
                    'min-w-0 flex-1 truncate text-center text-sm font-medium text-gray-800',
                    // Trailing padding mirroring the icon's width keeps the centered
                    // label balanced within the pill; without an icon it centers on its own.
                    icon != null && 'pr-3'
                )}
            >
                {children}
            </span>
        </>
    );

    // No outer margin — the host slot owns the rhythm (see the atoms doc). Compact
    // pill: an inline flex row with an optional leading icon and a label centered in the
    // space beside it (the label is the flex-1 child, so `text-center` centers it after
    // the icon, not under it). The label truncates with an ellipsis when the bubble
    // restricts the width. No min-width of its own — the consumer's message bubble sets a
    // min-width so every action-bearing bubble (and therefore its full-width buttons) is a
    // consistent size.
    const base = 'flex items-center gap-2 rounded-lg border border-control-border bg-white px-2.5 py-0.5';

    if (href != null) {
        return (
            <a
                ref={ref as Ref<HTMLAnchorElement>}
                href={href}
                {...(external && { target: '_blank', rel: 'noreferrer' })}
                {...rest}
                className={cn(base, 'cursor-pointer hover:bg-gray-50', className)}
            >
                {inner}
            </a>
        );
    }

    if (onClick != null) {
        return (
            <button
                ref={ref as Ref<HTMLButtonElement>}
                type="button"
                onClick={onClick}
                {...rest}
                className={cn(base, 'cursor-pointer hover:bg-gray-50', className)}
            >
                {inner}
            </button>
        );
    }

    return <div ref={ref as Ref<HTMLDivElement>} {...rest} className={cn(base, className)}>{inner}</div>;

}
