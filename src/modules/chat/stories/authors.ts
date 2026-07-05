// Story authors — a PLAIN, generic author shape, deliberately NOT the exported
// `MessageAuthor` (which still carries a channel-ish `remoteId`). A story plays
// the consumer, and the base treats `author` as opaque: it only forwards it to
// `authorRenderer`, so a story author is whatever the story's `authorRenderer`
// reads. This one models a realistic consumer author — a display name, an
// optional secondary `handle` (phone / @user / email), and avatar inputs
// (colour + optional image). See docs/module-chat.md §3 (author is opaque) and
// §6 (authorRenderer primitives).

export interface StoryAuthor {

    id: string;            // projected onto the envelope's `group` key (grouping)
    name: string;          // authorRenderer.name
    handle?: string;       // authorRenderer.handle — secondary identifier (header only)
    color?: string;        // avatar background / accent (projected onto `color`)
    avatarUrl?: string;    // avatar image; absent → initials fallback

}

// Alex has a photo avatar; Sarah renders from initials — the two avatar modes,
// on purpose, so the timeline shows both.

export const alex: StoryAuthor = {
    id: 'alex',
    name: 'Alex Rivera',
    handle: '+1 415 555 0132',
    color: '#3B82F6',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
};

export const sarah: StoryAuthor = {
    id: 'sarah',
    name: 'Sarah Johnson',
    handle: '@sarahj',
    color: '#10B981'
};

export const miguel: StoryAuthor = {
    id: 'miguel',
    name: 'Miguel Santos',
    handle: 'miguel@example.com',
    color: '#F59E0B'
};

// Two-letter initials from a display name — the avatar fallback the
// story's `authorRenderer` feeds to `ChatAvatar` when there is no
// `avatarUrl`.

export function initials(name: string): string {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part[0]?.toUpperCase() ?? '')
        .join('');
}
