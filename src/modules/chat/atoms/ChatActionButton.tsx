import { LinkIcon, ReplyIcon } from '@nimbox/icons-react';
import classNames from 'classnames';
import { type ReactNode } from 'react';


export interface ChatActionButtonProps {

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
     * The leading icon. Defaults by mode — a link glyph for `href`, a reply glyph
     * otherwise — so the atom needs no per-kind knowledge; override it for a more
     * specific icon (a phone for a call, a copy glyph for a code, …).
     */
    icon?: ReactNode;

    className?: string;

}

// The visual for a single action button under a message bubble — a bordered,
// rounded pill with a leading icon and a centered label. Prop-driven like every
// atom: it takes resolved primitives (a label + an `href` OR an `onClick`),
// never a domain "action". The consumer maps its own action kinds onto this —
// lux owns the look, not the semantics. With neither `href` nor `onClick` it is a
// plain, non-interactive pill.
export function ChatActionButton({ children, href, external, onClick, icon, className }: ChatActionButtonProps) {

    const leadingIcon = icon ?? (href != null ? <LinkIcon /> : <ReplyIcon />);

    const inner = (
        <>
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center text-base text-gray-500">
                {leadingIcon}
            </span>
            <span className="text-sm font-medium text-gray-800">{children}</span>
        </>
    );

    // No outer margin — the host slot owns the rhythm (see the atoms doc). Compact
    // pill: a leading icon on the left, a centered label. No min-width of its own —
    // the consumer's message bubble sets a min-width so every action-bearing bubble
    // (and therefore its full-width buttons) is a consistent size.
    const base = 'relative block rounded-lg border border-control-border bg-white px-8 py-0.5 text-center';

    if (href != null) {
        return (
            <a
                href={href}
                {...(external && { target: '_blank', rel: 'noreferrer' })}
                className={classNames(base, 'cursor-pointer hover:bg-gray-50', className)}
            >
                {inner}
            </a>
        );
    }

    if (onClick != null) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={classNames(base, 'cursor-pointer hover:bg-gray-50', className)}
            >
                {inner}
            </button>
        );
    }

    return <div className={classNames(base, className)}>{inner}</div>;

}
