import { type MessageAuthor } from './MessageAuthor';


export interface MessageGroupData {

    id: string;

    direction: 'inbound' | 'outbound';
    author: MessageAuthor;

}
