import { MessageReactionPicker } from './MessageReactionPicker';
import { MessageActions } from './slots/MessageActions';
import { MessageAuthor } from './slots/MessageAuthor';
import { MessageBody } from './slots/MessageBody';
import { MessageBubble } from './slots/MessageBubble';
import { MessageContainer } from './slots/MessageContainer';
import { MessageFooter } from './slots/MessageFooter';
import { MessageHeader } from './slots/MessageHeader';
import { MessageProperties } from './slots/MessageProperties';
import { MessageReactions } from './slots/MessageReactions';
import { MessageReply } from './slots/MessageReply';


// Slots for the full message surface, grouped as a namespace so
// callsites read `Message.Bubble`. Instances compose these inside the
// context supplied by `MessageProvider`. See `MessagePreview` for the
// parallel compact surface.

export const Message = {
    Container: MessageContainer,
    Bubble: MessageBubble,
    Author: MessageAuthor,
    Header: MessageHeader,
    Body: MessageBody,
    Footer: MessageFooter,
    Actions: MessageActions,
    Properties: MessageProperties,
    Reactions: MessageReactions,
    Reply: MessageReply,
    React: MessageReactionPicker
};
