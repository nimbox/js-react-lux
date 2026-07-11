// Export types

export * from './types/AvatarData';
export * from './types/BaseMessage';
export * from './types/BaseConversation';
export * from './types/ChatTypes';
export * from './types/MessageData';
export * from './types/MessageGroupData';
export * from './types/MessageOption';
export * from './types/ReactionDetail';
export * from './types/ReactionPill';

// Export components

export * from './atoms';

export * from './ChatContext';
export * from './ChatProvider';

// Conversation ROW rendering only — the base owns the row's look (the
// `Conversation` slot namespace + the `ConversationProvider` producer +
// the neutral `BaseConversation` envelope) and the kit ships the default
// row (`DefaultConversation`, from `kits/core`). The LIST — ordering,
// selection, unread, the container — is the consumer's; base ships no
// `ConversationList` / `buildConversationRows` (see docs §1).
export { Conversation } from './conversation/Conversation';
export * from './conversation/ConversationContext';
export * from './conversation/ConversationProvider';
export * from './conversation/ConversationOptions';
export * from './conversation/useConversationOptions';
export * from './types/ConversationOption';

export * from './message/buildMessageRows';
export * from './message/MessageContext';
export * from './message/MessageGroup';
export * from './message/MessageList';
export * from './message/MessageProvider';
export * from './message/MessageFrame';
export { Message } from './message/Message';
export { MessagePreview } from './message/MessagePreview';
export * from './message/MessageSeparator';
export * from './message/renderers';
export * from './message/useMessageRenderer';
export * from './message/useMessageOptions';
export * from './message/MessageOptions';
// Frame chrome (NOT slots — mounted by `MessageFrame`, gated on `plain`): the
// reactions renderers (chooser + the two forms) and the reaction picker.
export * from './message/MessageReactions';
export * from './message/MessageReactionsCluster';
export * from './message/MessageReactionsExpanded';
export * from './message/MessageReactionPicker';
export * from './types/MessageRow';
export * from './types/MessageListRow';
export * from './types/MessageGroupRow';

export * from './composer/DockedMessageComposer';
export * from './composer/MessageComposer';
export * from './composer/panels/ComposerPanel';

// Export utils — library-free defaults a consumer may reuse or override

export * from './utils/mediaSize';

// Export renderers

export * from './message/instances';

