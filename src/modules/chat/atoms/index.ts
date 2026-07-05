/**
 * @packageDocumentation
 * The chat atoms — pure, prop-driven visual primitives. Each is
 * presentational and spacing-neutral: a kit resolves a real value (a url,
 * a size, …) and hands it in as a prop, and none of them claims an outer
 * margin — vertical rhythm is left to the message bubble that hosts them.
 * The chat base never reaches into a message's attachments on its own.
 */
export * from './ChatAudio';
export * from './ChatAvatar';
export * from './ChatDocument';
export * from './ChatImage';
export * from './ChatSticker';
export * from './ChatVideo';
