import { MessageActions } from './slots/MessageActions';
import { MessageAuthor } from './slots/MessageAuthor';
import { MessageBody } from './slots/MessageBody';
import { MessageBubble } from './slots/MessageBubble';
import { MessageFooter } from './slots/MessageFooter';
import { MessageHeader } from './slots/MessageHeader';
import { MessagePill } from './slots/MessagePill';
import { MessageProperties } from './slots/MessageProperties';
import { MessageReply } from './slots/MessageReply';


export const Message = {
    Pill: MessagePill,
    Bubble: MessageBubble,
    Author: MessageAuthor,
    Header: MessageHeader,
    Body: MessageBody,
    Footer: MessageFooter,
    Actions: MessageActions,
    Properties: MessageProperties,
    Reply: MessageReply
};
