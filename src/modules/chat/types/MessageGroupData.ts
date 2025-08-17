import { type MessageAuthor } from './MessageAuthor';


export interface MessageGroupData {

    id: string;

    author: MessageAuthor;
    direction: 'inbound' | 'outbound';

}
