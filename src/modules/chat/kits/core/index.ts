// Core kit — the starter binding of the chat base to a small,
// channel-neutral content vocabulary. Ships the simple message types
// (text, image); consumers extend the registry with their own
// instances for richer/channel-specific types.

export * from './views';
export * from './instances/Text';
export * from './instances/Image';
export * from './instances/Audio';
export * from './instances/Video';
export * from './instances/Document';
export * from './instances/Sticker';
export * from './renderers';

// The default conversation row (one shape, no registry) — the
// spread-and-go look for a conversation list, parallel to
// `coreMessageRenderers`.
export * from './DefaultConversation';
