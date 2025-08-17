import { type AvatarData } from './AvatarData';
import { type MessageData } from './MessageData';


export interface ConversationData {

    id: string;
    name: string;
    avatar?: AvatarData;

    lastMessage?: MessageData;

    pinned?: boolean;
    favorited?: boolean;
    muted?: boolean;
    archived?: boolean;

    unread?: number;

    timestamp?: string;

}
