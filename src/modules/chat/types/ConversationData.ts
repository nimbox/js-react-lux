import { AvatarData } from './AvatarData';


export interface ConversationData {

    id: string;
    name: string;
    avatar?: AvatarData;

    unread?: number;

    timestamp?: string;

}
