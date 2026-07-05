import classNames from 'classnames';
import { Avatar } from '../../../components/displays/Avatar';


/** Props for `ChatAvatar`. */
export interface ChatAvatarProps {

    /**
     * Resolved photo source. The app maps its own author shape into this;
     * the chat base never reaches into a message's attachments to find one.
     * When absent, the initials fallback is shown instead.
     */
    url?: string;

    /** Fallback text shown when no `url` is given. */
    initials?: string;

    /** Text/icon color. Defaults to `'red'`. */
    color?: string;

    /** Background color behind the initials fallback. */
    backgroundColor?: string;

    /** Click handler — a kit wires this to open a profile or a viewer. */
    onClick?: () => void;

    /** Extra CSS classes merged onto the outer element. */
    className?: string;

}

/**
 * The design-system avatar atom for chat — a photo or colored-initials
 * circle representing an author.
 *
 * @remarks
 * Renders the photo when `url` is given;
 * otherwise falls back to colored initials. The app maps its own author
 * shape into these props (via `ChatProvider`'s `renderAvatar`), so the chat
 * base never needs to know the author's type.
 *
 * Renders `Avatar` with `inline={false}` — chat composes the avatar
 * into flex/grid layouts, never inline with running text, so the
 * baseline-reservation `Avatar` otherwise defaults to would only introduce
 * unwanted vertical offset here.
 */
export function ChatAvatar(props: ChatAvatarProps) {

    const { url, initials, color = 'red', backgroundColor, onClick, className } = props;

    return (
        <span onClick={onClick} className={classNames(onClick && 'cursor-pointer', className)}>
            <Avatar inline={false} src={url} alt="avatar" color={color} backgroundColor={backgroundColor}>
                {initials}
            </Avatar>
        </span>
    );

}
