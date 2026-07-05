import voiceMessage from './assets/voice-message.wav';


// Durable, self-contained media for the chat stories.
//
// The asset lives in the repo (`./assets/`) and is imported, not linked — so
// it can never 404 and never rots, yet Vite resolves the import to a short
// hashed URL instead of a giant inline `data:` blob (which would flood
// Storybook's Controls panel). This is the pattern to follow for images too:
// drop the file in `./assets/`, `import` it here, and export a named constant.
// `url` on the atoms stays a plain string, so a real remote URL can still be
// written in its place.

export const VOICE_AUDIO: string = voiceMessage;
