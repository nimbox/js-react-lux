import type { AudioView, DocumentView, ImageView, TextView, VideoView } from '../kits/core/views';
import type { BaseMessage } from '../types/BaseMessage';
import type { MessageData } from '../types/MessageData';
import { alex, miguel, sarah, type StoryAuthor } from './authors';
import { STICKER_IMAGE, VOICE_AUDIO } from './media';


// The story's ChatTypes binding — the "consumer" a story plays. `content` is
// the core kit's view map (text/image/sticker/audio/video/document), `author`
// is the plain `StoryAuthor`. `StoryMessage` is the discriminated union that
// widens to `BaseMessage`, so `buildMessageRows` and every base API accept it
// directly. See docs/module-chat.md §3 and §8.

export type StoryContent = {
    text: TextView;
    image: ImageView;
    sticker: ImageView;      // sticker reuses ImageView under its own key (§8)
    audio: AudioView;
    video: VideoView;
    document: DocumentView;
};

export type StoryChat = {
    author: StoryAuthor;
    content: StoryContent;
};

export type StoryMessage = MessageData<StoryChat>;


// Media the fixtures point at. The image/video are external URLs (they load
// in Storybook / Chromatic); the voice audio and sticker are committed assets
// (see `./media`) so they can never rot. The base is content-blind — a kit
// hands these resolved urls to its atoms.

const MOCKUP_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&h=400&q=80';
const DEMO_VIDEO = 'https://www.w3schools.com/html/mov_bbb.mp4';


// A message the thread replies to — named so the reply can quote it (its
// `preview` surface renders inside the reply chrome).
const mockupImage: StoryMessage = {
    id: '5',
    author: alex,
    alignment: 'start',
    type: 'image',
    content: { url: MOCKUP_IMAGE, size: 234567, caption: 'Check out this mockup', alt: 'Landing page mockup' },
    timestamp: '2024-01-15T09:36:00Z',
    reactions: [{ emoji: '👀', count: 1 }, { emoji: '🔥', count: 2, highlighted: true }]
};


// The narrative thread — a two-day conversation between Alex (incoming,
// `start`) and Sarah (our side, `end` = "mine"). It exercises: grouping runs,
// day separators, a caption image, a reply-quote, an edit stamp, a tombstone,
// a floating sticker, and media types across both alignments. `group` is
// derived from the author id (what a real adapter does — the base groups on
// the opaque `group`, never on `author`).

const rawThread: StoryMessage[] = [

    // ── Day 1 — Monday, January 15 ───────────────────────────────────────────

    {
        id: '1', author: alex, alignment: 'start', type: 'text',
        content: { text: 'Hey Sarah! How was your weekend? 👋' },
        timestamp: '2024-01-15T09:30:00Z', status: 'read',
        reactions: [{ emoji: '😊', count: 1 }]
    },
    {
        id: '2', author: sarah, alignment: 'end', type: 'text',
        content: { text: 'Hi Alex! It was great — went hiking on Saturday.' },
        timestamp: '2024-01-15T09:32:00Z', status: 'read'
    },
    {
        id: '3', author: sarah, alignment: 'end', type: 'text',
        content: { text: 'How about you?' },
        timestamp: '2024-01-15T09:32:30Z', status: 'read'
    },
    {
        id: '4', author: alex, alignment: 'start', type: 'text',
        content: { text: 'Pretty productive! Finished the landing page mockup.' },
        timestamp: '2024-01-15T09:35:00Z', status: 'read'
    },
    mockupImage,
    {
        id: '6', author: sarah, alignment: 'end', type: 'text',
        content: { text: 'This looks really clean! Love the palette you chose.' },
        timestamp: '2024-01-15T09:40:00Z', status: 'read',
        replyTo: mockupImage,
        reactions: [{ emoji: '❤️', count: 3, highlighted: true }]
    },
    {
        id: '7', author: alex, alignment: 'start', type: 'audio',
        content: { url: VOICE_AUDIO, size: 123456, duration: 8 },
        timestamp: '2024-01-15T09:43:00Z', status: 'read',
        reactions: [{ emoji: '🎵', count: 1 }]
    },
    {
        id: '8', author: sarah, alignment: 'end', type: 'text',
        content: { text: '😍' },
        timestamp: '2024-01-15T09:44:00Z', status: 'read'
    },

    // ── Day 2 — Tuesday, January 16 ──────────────────────────────────────────

    {
        id: '9', author: sarah, alignment: 'end', type: 'text',
        content: { text: 'Morning! Ready for the demo?' },
        timestamp: '2024-01-16T10:00:00Z', status: 'delivered'
    },
    {
        id: '10', author: alex, alignment: 'start', type: 'video',
        content: { url: DEMO_VIDEO, size: 456789, caption: 'Quick demo of the animations' },
        timestamp: '2024-01-16T10:04:00Z',
        reactions: [{ emoji: '🎥', count: 1 }, { emoji: '🔥', count: 1 }]
    },
    {
        id: '11', author: alex, alignment: 'start', type: 'document',
        content: { url: MOCKUP_IMAGE, size: 1048576, filename: 'animation-spec.pdf' },
        timestamp: '2024-01-16T10:05:00Z'
    },
    {
        id: '12', author: sarah, alignment: 'end', type: 'text',
        content: { text: 'Amazing work 🚀' },
        timestamp: '2024-01-16T10:07:00Z', status: 'read',
        editedAt: '2024-01-16T10:08:00Z'
    },
    {
        id: '13', author: sarah, alignment: 'end', type: 'sticker',
        content: { url: STICKER_IMAGE, size: 40452, alt: 'leaf' },
        timestamp: '2024-01-16T10:08:30Z', status: 'read'
    },
    {
        id: '14', author: alex, alignment: 'start', type: 'text',
        content: { text: 'This message was removed.' },
        timestamp: '2024-01-16T10:10:00Z',
        deletedAt: '2024-01-16T10:11:00Z'
    }

];

export const thread: StoryMessage[] = rawThread.map(withGroup);

// The first unread message in `thread` — feed to
// `buildMessageRows({ markerBeforeId })` to inject the "New messages" line
// (unread is viewer-relative — the story computes it).
export const firstUnreadId = '12';

function withGroup(message: StoryMessage): StoryMessage {
    if (message.group !== undefined || message.author === undefined) {
        return message;
    }
    return { ...message, group: (message.author as StoryAuthor).id };
}


// ── Focused singles ──────────────────────────────────────────────────────────
// Standalone messages for the component-level stories (a single bubble, a
// surface matrix, a reactions popover). Each carries its own id/author so it
// renders in isolation without the thread's grouping context.

export const textOutbound: StoryMessage = {
    id: 's-text-out', author: sarah, group: sarah.id, alignment: 'end', type: 'text',
    content: { text: 'Sounds good — see you at 2pm!' },
    timestamp: '2024-01-16T10:20:00Z', status: 'read'
};

export const textInbound: StoryMessage = {
    id: 's-text-in', author: alex, group: alex.id, alignment: 'start', type: 'text',
    content: { text: 'Perfect, I\'ll bring the prototype.' },
    timestamp: '2024-01-16T10:21:00Z'
};

export const textWithReply: StoryMessage = {
    id: 's-text-reply', author: sarah, group: sarah.id, alignment: 'end', type: 'text',
    content: { text: 'The palette is the winner for sure.' },
    timestamp: '2024-01-16T10:22:00Z', status: 'read',
    replyTo: mockupImage
};

export const longText: StoryMessage = {
    id: 's-text-long', author: alex, group: alex.id, alignment: 'start', type: 'text',
    content: {
        text: 'This is a much longer message that shows how a bubble wraps multi-line content while keeping the width cap, the author header, the reply quote, and the timestamp/status footer all aligned. It should stay readable at the 75% max width.'
    },
    timestamp: '2024-01-16T10:23:00Z'
};

export const emojiOnly: StoryMessage = {
    id: 's-text-emoji', author: sarah, group: sarah.id, alignment: 'end', type: 'text',
    content: { text: '🎉' },
    timestamp: '2024-01-16T10:24:00Z', status: 'read'
};

export const withReactions: StoryMessage = {
    id: 's-reactions', author: alex, group: alex.id, alignment: 'start', type: 'text',
    content: { text: 'Shipping this Friday 🚀' },
    timestamp: '2024-01-16T10:25:00Z',
    reactions: [
        { emoji: '🔥', count: 4, highlighted: true },
        { emoji: '🚀', count: 2 },
        { emoji: '👏', count: 1 }
    ]
};

export const imageMessage = mockupImage;

export const stickerMessage: StoryMessage = {
    id: 's-sticker', author: sarah, group: sarah.id, alignment: 'end', type: 'sticker',
    content: { url: STICKER_IMAGE, size: 40452, alt: 'leaf' },
    timestamp: '2024-01-16T10:26:00Z', status: 'read'
};

export const audioMessage: StoryMessage = {
    id: 's-audio', author: alex, group: alex.id, alignment: 'start', type: 'audio',
    content: { url: VOICE_AUDIO, size: 123456, duration: 8 },
    timestamp: '2024-01-16T10:27:00Z'
};

export const videoMessage: StoryMessage = {
    id: 's-video', author: alex, group: alex.id, alignment: 'start', type: 'video',
    content: { url: DEMO_VIDEO, size: 456789, caption: 'Quick demo of the animations' },
    timestamp: '2024-01-16T10:28:00Z'
};

export const documentMessage: StoryMessage = {
    id: 's-document', author: alex, group: alex.id, alignment: 'start', type: 'document',
    content: { url: MOCKUP_IMAGE, size: 1048576, filename: 'animation-spec.pdf' },
    timestamp: '2024-01-16T10:29:00Z'
};

export const editedMessage: StoryMessage = {
    id: 's-edited', author: sarah, group: sarah.id, alignment: 'end', type: 'text',
    content: { text: 'Amazing work 🚀' },
    timestamp: '2024-01-16T10:30:00Z', status: 'read',
    editedAt: '2024-01-16T10:31:00Z'
};

export const deletedMessage: StoryMessage = {
    id: 's-deleted', author: alex, group: alex.id, alignment: 'start', type: 'text',
    content: { text: 'This message was removed.' },
    timestamp: '2024-01-16T10:32:00Z',
    deletedAt: '2024-01-16T10:33:00Z'
};

// A message whose `type` has NO registered renderer — falls back to
// `UnknownMessage` (both surfaces). Typed as `BaseMessage` (not `StoryMessage`)
// precisely because its `type` is outside the kit's content map — the honest
// type for "what may arrive" (docs §3, handled-vs-possible).
export const unknownMessage: BaseMessage = {
    id: 's-unknown', author: miguel, group: miguel.id, alignment: 'start', type: 'poll',
    content: { question: 'Lunch?', options: ['Tacos', 'Sushi'] },
    timestamp: '2024-01-16T10:34:00Z'
};

// A system event — authorless and groupless, so `buildMessageRows` emits a
// `single` row (centered, ungrouped). Its `type` is unregistered too, so it
// renders via the fallback; a consumer would register a `system-*` instance
// for it.
export const systemMessage: BaseMessage = {
    id: 's-system', alignment: 'start', type: 'system-join',
    content: { text: 'Miguel joined the conversation' },
    timestamp: '2024-01-16T09:59:00Z'
};
