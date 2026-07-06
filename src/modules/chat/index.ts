// Export types

export * from './types/AvatarData';
export * from './types/BaseMessage';
export * from './types/BaseConversation';
export * from './types/ChatTypes';
export * from './types/MessageAction';
export * from './types/MessageAttachment';
export * from './types/MessageAuthor';
export * from './types/MessageData';
export * from './types/MessageGroupData';
export * from './types/MessageOption';
export * from './types/ReactionDetail';
export * from './types/ReactionPill';
export * from './types/TemplateContextData';
export * from './types/TemplateData';

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
export * from './message/actions';
export * from './message/MessageGroup';
export * from './message/MessageList';
export * from './message/MessageProvider';
export { Message } from './message/Message';
export { MessagePreview } from './message/MessagePreview';
export * from './message/MessageSeparator';
export * from './message/renderers';
export * from './message/useMessageRenderer';
export * from './message/useMessageOptions';
export * from './message/MessageOptions';
// Container-tier auto chrome (NOT slots — mounted by MessageContainer): the
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
export * from './composer/panels/ComposerAttachmentPanel';
export * from './composer/panels/ComposerTemplatePanel';

export * from './lightbox/MessageLightBox';

// Export renderers

export * from './message/instances';

