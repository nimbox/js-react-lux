import { type AvatarData } from './AvatarData';
import { type BaseMessage } from './BaseMessage';


export interface ConversationData {

    id: string;
    name: string;
    avatar?: AvatarData;

    lastMessage?: BaseMessage;

    pinned?: boolean;
    favorited?: boolean;
    muted?: boolean;
    archived?: boolean;

    unread?: number;

    timestamp?: string;

}
