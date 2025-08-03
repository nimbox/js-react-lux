import { AvatarData } from './AvatarData';


export interface ConversationData {

    id: string;
    name: string;
    avatar?: AvatarData;

    unread?: number;

    pinned?: boolean;
    favorited?: boolean;
    muted?: boolean;
    archived?: boolean;

    timestamp?: string;

}
