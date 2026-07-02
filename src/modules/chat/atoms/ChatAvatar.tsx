import { Avatar } from '../../../components/displays/Avatar';


// ChatAvatar
//
// The design-system avatar atom for chat. Purely presentational and
// prop-driven: the app maps its own author shape into these props
// (via ChatProvider's `renderAvatar`), so the chat base never needs
// to know the author's type.

export interface ChatAvatarProps {

    color?: string;
    backgroundColor?: string;

    src?: string;
    srcSet?: string;

    initials?: string;
    alt?: string;

    onClick?: () => void;

}

export function ChatAvatar(props: ChatAvatarProps) {

    const { color = 'red', backgroundColor, src, srcSet, initials, alt, onClick } = props;

    return (
        <span onClick={onClick} className={onClick ? 'cursor-pointer' : undefined}>
            <Avatar color={color} backgroundColor={backgroundColor} src={src} srcSet={srcSet} alt={alt}>
                {initials}
            </Avatar>
        </span>
    );

}
