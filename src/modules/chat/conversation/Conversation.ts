import { ConversationAvatar } from './slots/ConversationAvatar';
import { ConversationContainer } from './slots/ConversationContainer';
import { ConversationMessage } from './slots/ConversationMessage';
import { ConversationMeta } from './slots/ConversationMeta';
import { ConversationName } from './slots/ConversationName';
import { ConversationProperties } from './slots/ConversationProperties';


// Slots for the conversation row, grouped as a namespace so callsites
// read `Conversation.Container`. The kit's `DefaultConversation`
// composes these inside the context supplied by
// `ConversationProvider` — the same producer/consumer split as
// `Message` vs `MessageProvider`.

export const Conversation = {
    Container: ConversationContainer,
    Avatar: ConversationAvatar,
    Name: ConversationName,
    Properties: ConversationProperties,
    Message: ConversationMessage,
    Meta: ConversationMeta
};
