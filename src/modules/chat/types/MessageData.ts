import { type MessageAttachment } from './MessageAttachment';
import { type MessageAuthor } from './MessageAuthor';
import { type ReactionData } from './ReactionData';


export interface MessageData {

    id: string;

    author: MessageAuthor;
    direction: 'inbound' | 'outbound';

    type: string;

    header?: string;
    body?: string;
    caption?: string;
    footer?: string;

    buttons?: MessageButtonData[];

    attachments?: MessageAttachment[];
    reactions?: ReactionData[];

    replyTo?: MessageData;

    status?: 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | string;
    timestamp: number | string | Date;

}

// A rendered button shown under a message (values already substituted).
// Discriminated by `type`, channel-neutral.
export type MessageButtonData =
    | MessageReplyButtonData
    | MessageVisitWebsiteButtonData
    | MessageCallChannelButtonData
    | MessageCallPhoneNumberButtonData
    | MessageCopyCodeButtonData;

export interface MessageReplyButtonData {
    type: 'reply';
    text: string;
}

export interface MessageVisitWebsiteButtonData {
    type: 'visit-website';
    text: string;
    url: string;
}

export interface MessageCallChannelButtonData {
    type: 'call-channel';
    text: string;
}

export interface MessageCallPhoneNumberButtonData {
    type: 'call-phone-number';
    text: string;
    phone: string;
}

export interface MessageCopyCodeButtonData {
    type: 'copy-code';
    text: string;
    code: string;
}
