# `modules/chat` — design criteria

Guidance for the lux chat module. Read this before changing the envelope, the slots, the kit, or
how a consumer wires the module. It is the **authoritative contract** for where each responsibility
lives; the code is its implementation. When a change genuinely needs a different boundary, update
this doc in the same pass so the doc and the code never drift.

> **Scope.** This covers the **read path** — how a message is rendered. The **composer** is
> deliberately out of scope here and is treated separately.

## 1. What this module is

`modules/chat` is a **design system** for chat clients, **not a headless toolkit**. It has a
strong, opinionated position on how a conversation *looks* and *behaves* — and a deliberate refusal
to have any position on the *data* it renders. That single tension is the whole design:

> **The base has a position on how things look (the atoms) and on chat mechanics, but no position
> on the data it renders from.**

Three layers carry it:

- **BASE** (`@nimbox/js-react-lux/modules/chat`) — content-blind chrome and mechanics.
- **CORE KIT** (`@nimbox/js-react-lux/modules/chat/kits/core`) — binds the base to a small,
  channel-neutral content vocabulary.
- **CONSUMER** (e.g. hermes `chat/web`) — maps its own domain into the kit's vocabulary and adds
  the channel-specific types it needs.

Plus **atoms**, a cross-cutting base concern: the prop-driven visual units the kit composes.

The module must satisfy four requirements, in the owner's words:

1. The base has a position on how things **look** (the atoms) and on chat **mechanics**, but **no position on the data**.
2. The core kit makes an assumption about the data (its views) but provides a **standardized way of using the atoms**.
3. It must be possible to **extend the core kit** with other message types.
4. It must be **channel-plural** — WhatsApp is the first channel, not the shape of the library.
   Slack, Teams, Telegram, Discord must be representable without re-architecture.

> **The proxy reframe.** The consumer is a messaging *proxy*: it renders conversations happening on
> other channels in **our** visual language. Supporting Slack does not mean looking like Slack; it
> means representing Slack's *semantics* — threads, edits, multi-emoji reactions, blocks, system
> events — in our design language. The bubble paradigm is therefore legitimate even for feed-native
> channels: `alignment` is really **direction** (bridged counterparties → `start`, our side →
> `end`), which is exactly the group-chat rendering every bubble client already uses. §4 maps where
> each channel semantic goes.

> **Scope: the item, not the collection.** The seam is **not** "messages are lux's, conversations
> are the consumer's" — it is **item rendering vs collection orchestration**. Lux is opinionated
> about how *one thing* looks (a message bubble **and** a conversation row) — that is what "design
> system, not headless" means. Lux is *not* the owner of a collection's **orchestration** when that
> orchestration is trivial and product-shaped. So the line falls in two different places:
>
> - **The message thread — lux owns rendering *and* orchestration.** The orchestration mechanics are
>   universal and *hard* (grouping, alignment, sticky-bottom scroll, the reaction picker), so base
>   owns them.
> - **The conversation list — lux owns *row rendering*, the consumer owns orchestration.** Lux has a
>   position on how a **conversation row** looks: an *opinionated, replaceable* default — a
>   `Conversation.*` compound-component (slots) plus one default summary instance, composed from the
>   atoms and the `preview` cell (§6). But lux owns **no list**: ordering, selection, unread /
>   pinned / folders / filters, the list container, and the data are **product identity and viewer
>   state → consumer**. A row is **one shape, not polymorphic by type**, so this needs **no registry,
>   no `buildRenderers`, no surface dimension** — just slots + a default arrangement. Run the §5
>   litmus over the *list* and nothing survives to base (ordering = business logic, selection =
>   trivial state, unread = viewer-relative like a pill's `highlighted`, list scroll = plain
>   top-down); run it over the *row's look* and it lands exactly where a bubble does — opinionated
>   presentation composed from atoms.
>
> Concretely, lux ships: the **cells** (`ChatAvatar`, the `preview` message surface) **and** an
> optional default **row** (`Conversation` slots + one instance) that composes them. Lux never reads
> viewer state (`unread`/`pinned`/`selected`) inside a component — the consumer feeds those as props
> / decoration slots, the same rule that keeps the base off message content. (The **composer** is
> likewise out of scope for now.) This mirrors the message tiers precisely: base mechanics → a
> replaceable *default look* (the kit / the row) → consumer orchestration. See §12 for the legacy
> `conversation/*` code that overreaches into orchestration and must be trimmed to this line.

## 2. The three layers (+ atoms)

### BASE — `@nimbox/js-react-lux/modules/chat`

Content-blind chrome and mechanics. The base **ships no content instances** and makes **no
assumption about `content`'s shape**. It owns:

- The envelope's **universal** fields (see §3) — the mechanic primitives `id, group, color,
  alignment, timestamp` plus `type` (the registry key) and the cross-cutting decorations
  `status, reactions, replyTo`. **`author` and `content` are opaque** (`unknown` to the base —
  forwarded, never read).
- **Grouping / ordering** — `buildMessageRows` (sort by timestamp, day separators, group by the
  opaque `group` key + `alignment`, compute `isFirst`/`isLast`). The base **never reads `author`**;
  `group` is its grouping primitive (§3). Rows are **`separator | group | single`** — `single`
  carries authorless/system messages, ungrouped and centered — plus an **unread-marker** row
  injected at a consumer-given watermark (§4).
- **Layout** — `MessageGroup` (avatar *placement* + alignment via Tailwind `order`; appearance is
  the consumer's `authorRenderer`), `MessageList` (auto-scroll container).
- **Composition machinery** — the compound-component + context design: `MessageProvider` /
  `useMessage`, `ChatProvider` / `useChat`.
- **The registry mechanism** — `useMessageRenderer`
  (`messageRenderers[type]?.[surface] ?? UnknownMessage[surface]`), dimensioned by **surface**
  (`full` / `preview`, §6). The same registry renders a message in the
  timeline *and* compactly inside a reply-quote or composer banner; the base owns the *mechanism* and
  the **preview-chrome** structural slots (compact container, clamped body, thumbnail), and ships no
  content renderers into it. Dispatch **short-circuits `deletedAt`** to the base `TombstoneMessage`
  before the `type` lookup (§3).
- **Capability gating + the option system** — a conversation-level `capabilities` set
  (consumer-projected channel truth) and a declarative viewer-**option** set decide which
  affordances render at all (§7).
- **Structural and decoration slots** (see §6).
- **The action-button visual registry** — `defaultActionRenderers` (how an action button *looks*),
  which is a visual vocabulary like an atom, not content.

### CORE KIT — `@nimbox/js-react-lux/modules/chat/kits/core`

Binds the base to a small, channel-**neutral** content vocabulary. It owns:

- **Views** (`views.ts`) — `TextView`, `ImageView` (sticker reuses it), `AudioView`, `VideoView`,
  `DocumentView`. The data shapes a consumer maps its domain into.
- **Message instances** — read `message.content` as a view and feed atoms into base slots;
  registered in `coreMessageRenderers`. Each instance renders its type across **surfaces** (`full`
  for the timeline bubble, `preview` for the compact form — §6). The `preview` surface *renders
  content*, so it belongs to the kit, not the base; there is **no** separate reply registry.

> **Discipline rule:** a kit view may **never** grow a channel-specific field. The moment it would,
> the type moves to the consumer (or to a different kit). The core kit's vocabulary stays the set
> every channel understands identically.

The kit is imported through the deep path `@nimbox/js-react-lux/modules/chat/kits/core` and is
**not** re-exported from the base barrel — the base never depends on the kit.

### CONSUMER — e.g. hermes `chat/web`

Owns everything app- or channel-specific:

- The **adapter** from its domain model into kit views (`transformMessage`).
- **Instances for channel-specific types** — template, interactive buttons/list, link, selection,
  location — composed from base slots + atoms, reading the consumer's own content shapes,
  registered alongside the kit defaults.
- **Wiring** — `ChatProvider` configuration: `renderText`, formatters, `authorRenderer` (the
  author type `T['author']` and its primitives `{ avatar, name, handle? }` — §6), the single
  surface-aware `messageRenderers` registry, and the reaction callbacks (§6).
- **The viewer** — anything viewer-relative (unread, "you reacted") is computed here and **projected
  into neutral base fields** (e.g. did-the-viewer-react → the pill's `highlighted` flag). The base
  and kit have no concept of a viewer.
- **App behaviors** — lightbox, click handlers, redux, callbacks.

### ATOMS — a cross-cutting base concern

Pure, prop-driven presentational units: `ChatAvatar`, `ChatImage`, `ChatSticker`, `ChatAudio`,
`ChatVideo`, `ChatDocument`. They:

- Take **resolved primitives** (`src`, `url`, `duration`) — never a `BaseMessage` envelope or a
  domain object.
- May read `useChat()` for cross-cutting **formatters only** (e.g. `ChatAudio` → `formatDuration`),
  never for message data.
- Are the smallest reusable visual unit, and could render in isolation (a Storybook story) with no
  provider and no envelope.
- Are **size/layout-flexible** — dimensions come from props or the containing slot, never from a
  hard-coded channel convention (a sticker is not always 96px; Telegram's are large and animated; a
  video note is round).

The kit feeds atoms; the base never reaches into content to populate them.

## 3. The envelope and the universal-vs-content split

A message is a **discriminated union keyed by `type`**, with `content` as the dependent per-type
payload. But the *set* of types is open (a consumer registers new ones), and the base must stay
content-blind — and a union is a *closed* set. One type can't be both open-and-erased and
closed-and-typed, so we split it into **two layers of the same shape**:

```ts
// The base machinery's type — the content-blind projection. Open `type`, opaque author & content.
// `buildMessageRows`, `MessageProvider`, every slot, the registry: all typed to this.
interface BaseMessage {

    // Mechanic primitives — the base reads and paints with these (grouping, ordering, chrome):

    id: string;                   // message identity
    group: string;                // grouping key — consecutive same-`group` messages form a group
    color?: string;               // author accent — for base-drawn chrome (reply line, bubble accent)
    alignment: 'start' | 'end';   // presentation side, not a channel concept
    timestamp: number | string | Date;   // ordering + day separators

    // The payload — `author`/`content` are opaque (never read, only forwarded); `type` keys the registry:

    author?: unknown;             // forwarded to authorRenderer
    type: string;                 // open registry key; the library never switches on it
    content?: unknown;            // forwarded to the registered renderer

    // Cross-cutting decorations (universal, channel-neutral; rendered, never interpreted):

    status?: string;              // opaque DELIVERY token, rendered via renderStatus — never deletion
    editedAt?: number | string | Date;    // "(edited)" — appended in Properties
    deletedAt?: number | string | Date;   // tombstone — dispatch short-circuits to TombstoneMessage
    forwardedFrom?: { author?: unknown; label?: string };   // origin attribution
    thread?: { count: number; lastAt?: number | string | Date; participants?: unknown[] };  // summary only
    reactions?: ReactionPill[];   // author-free pills; who-reacted is lazy via getReactionParticipants (§6)
    replyTo?: BaseMessage;

}

// What a consumer plugs into the chat: its content vocabulary + its author type, as one bag.
// content is the map (type-key → view); author is the consumer's author type.
// Bindings and content maps are `type` aliases, deliberately — only type-alias object types get
// the implicit index signature that satisfies `Record<string, unknown>`; declared as `interface`s
// they fail the `T extends ChatTypes` constraint.
type ChatTypes = {
    author: unknown;
    content: Record<string, unknown>;
};

// The consumer/kit's type — author typed, `type`-discriminated (content narrowed per key), replyTo typed.
// ONE type parameter `T` carries both bindings; `T['author']` and `T['content']` are parallel.
type MessageData<T extends ChatTypes> = {
    [K in keyof T['content']]: Omit<BaseMessage, 'author' | 'type' | 'content' | 'replyTo'> & {
        author?: T['author'];
        type: K;
        content: T['content'][K];
        replyTo?: MessageData<T>;
    }
}[keyof T['content']];
```

Every `MessageData<T>` **widens to `BaseMessage`** (its `type` literal ⊆ `string`, its
`content`/`author` ⊆ `unknown`, its `replyTo` ⊆ `BaseMessage` recursively). That assignability is
the whole trick: the base names `BaseMessage` and stays author- *and content*-blind; the consumer
holds `MessageData<T>` and gets real discriminated-union narrowing (`switch (message.type)` narrows
`content`) plus a typed `author`; the registry dispatch is the single hop that erases back to
`BaseMessage` (see §8, *Type safety*). The `type`↔`content` link lives in the type itself, so it
cannot drift in the adapter, and `author`/`replyTo` are typed too. **Author and content are the two
parallel members of `T`** — `T['author']` (a single type) and `T['content']` (a map, because
messages are polymorphic) — so the binding is one parameter, not two, and it extends by adding a
field to `ChatTypes`, never a new generic.

**`author` is opaque exactly like `content`.** The base reads neither; the things it genuinely
needs from an author are **scalar primitives projected onto the envelope** — `group` (identity, for
grouping) and `color` (accent, for chrome) — which the base owns the way it owns `alignment`, *not*
as author data. The consumer projects them in the adapter:

```ts
{ group: author.id, color: author.color, author /* opaque */, content, … }
```

The base compares `group` and strokes chrome with `color` (the reply quote's left line from
`replyTo.color`, a bubble accent from `color`) — it never knows they came from "an author." Author
*appearance* is fully the consumer's, via `authorRenderer` (§6).

> **Paint-vs-render.** The dividing test for anything author-derived: **does the base *paint* with
> it, or *render* it?** A value the base paints with (a key to compare, a color to stroke) is a
> **scalar primitive** on the envelope (`group`, `color`). A shape the base would have to *interpret
> to render* stays **opaque** and goes through a render-prop (`author` → `authorRenderer`). Scalars the
> base draws with; shapes it delegates.

The symmetry:

| Concern | `BaseMessage` holds | Base's primitive | Consumer supplies |
|---|---|---|---|
| Author | `author: unknown` | `group` (grouping key), `color` (accent) | `T['author']` + `authorRenderer` (the `{ avatar, name, handle? }` primitives, §6) |
| Content | `content: unknown` | `type` (registry key) | `T['content']` (view map) + instances (registry) |

> **The map is the *handled* set, not the *possible* set.** A message can arrive at runtime with a
> `type` the consumer never mapped (the server ships a new kind before the client learns it).
> `BaseMessage` (open `type: string`) is the honest type for *what may arrive* — which is exactly
> why the registry keeps its `UnknownMessage` fallback (§8) and why a `switch` over `MessageData<T>`
> must never be treated as exhaustive of runtime. `MessageData<T>` is *what the consumer chose to
> handle*, a construction/consumption convenience — not a promise about the wire.

**`timestamp` vs `status` — a mechanic primitive vs a decoration token.** Not every envelope field
is on the envelope for the same reason. `timestamp` earns its place as a base **mechanic**:
`buildMessageRows` sorts by it and inserts day separators. `status` is needed by **no** mechanic — it
is an opaque **decoration token**, *rendered via `renderStatus` and never interpreted*, exactly
parallel to `author` → `authorRenderer`. It lives on the envelope because it is universal per-message
metadata (not content, doesn't vary by type; a channel without delivery state just omits it), **not**
because the base needs it. If you ever want a maximally minimal envelope, `status` is the first field
to push to the consumer's instance (render its own tick, push-style) — but it's opaque, so keeping it
costs no coupling and saves every consumer from re-implementing the delivery tick.

**Deletion is the one decoration that suppresses content.** Every other decoration renders
*alongside* content; a tombstone must *replace* it — so it cannot be a token an instance may ignore.
`deletedAt` short-circuits **at the dispatch layer**: `useMessageRenderer` routes a deleted message
to the base `TombstoneMessage` (Container + Bubble + a content-free placeholder + `Properties`)
*before* the `type` lookup, so no instance has to cooperate. This also keeps `status` meaning
**delivery only** — mapping deletion into `status` (as the consumer once did) destroys the delivery
state and still renders the deleted content.

**`forwardedFrom` and `thread` follow the author rules.** Both carry an **opaque** author
(`forwardedFrom.author`, `thread.participants[]`) rendered only through `authorRenderer` — the
origin line via `.name` (or the plain `label` when the origin isn't an author), the thread facepile
via `.avatar`. `thread` is a **summary, not the thread**: count + recency + participants for the
affordance the instance mounts; opening it is consumer navigation (`onOpenThread`, §7) to a second
message list. Replies are **never interleaved** into the main rows. (These opaque authors stay
`unknown` even in `MessageData<T>` — they flow only into `authorRenderer`; type them later if a
consumer ever needs to read them.)

The current envelope additionally carries the legacy flat content fields
`header, body, footer, actions, attachments`. **These leave** (see the roadmap, §11) — they are
content, and content lives in `content`, owned by the kit/consumer.

### The generalizing rule

> **If displaying a field requires interpreting the message's content payload, its renderer is
> KIT/CONSUMER — even when the data field itself is BASE.**

"Base must not know about data" forbids only **content** data (the payload). Neutral **metadata
*about*** a message — a reaction tally, a delivery tick, a quote pointer, an edit stamp — is exactly
what a design system owns. The cross-cutting decorations sit in **different tiers**:

| Field | Data shape | Rendering machinery | Where it mounts | Who renders the content |
|---|---|---|---|---|
| `reactions` | BASE — author-free pills `{emoji, count, highlighted}` (consumer projects `highlighted: reactedByViewer`); participants lazy via `getReactionParticipants` → `ReactionParticipant` (§6) | BASE — default **one clustered pill** (per-emoji chips available as `ReactionsExpanded`); *adding* one is the base `react` option (§7) | **Container-tier, auto** (outside the bubble, by `MessageContainer`, every type, free; details popover on demand) | participant **author** via `authorRenderer` (§6) |
| `status` | BASE — opaque `string`, delivery only, *rendered not interpreted* | just the `renderStatus` render-prop | **Properties-tier, instance-placed** (a tick inside the bubble; a floating instance moves it into a compact footer pill — or omits it) | n/a — renders no content |
| `editedAt` | BASE — timestamp | `Properties` appends "(edited)" | **Properties-tier, instance-placed** | n/a — renders no content |
| `deletedAt` | BASE — timestamp | **dispatch short-circuit** → `TombstoneMessage` | replaces the instance entirely | n/a — suppresses content |
| `forwardedFrom` | BASE — `{author?: unknown, label?}` | small origin line, instance-placed | above the content, inside the bubble | origin **author** via `authorRenderer.name` |
| `thread` | BASE — `{count, lastAt?, participants?: unknown[]}` | summary affordance + `onOpenThread` (§7) | under the bubble; the thread **view** is consumer navigation to a second list | facepile via `authorRenderer.avatar` |
| `replyTo` | BASE field + BASE registry dispatch | BASE plumbing (message registry, `preview` surface) | above the bubble (and the composer banner) | **KIT/CONSUMER** — the `preview` surface reads `replyTo.content` (§6) |

The unifying check: reactions, status, edits, tombstones, origins, and thread summaries render *no
content* (they pass the rule and stay fully in base); a reply preview — or the messages inside an
opened thread — *interprets content* (it fails the rule: the data field stays in base, the renderer
is the kit/consumer's).

## 4. Multi-channel semantics — where a channel feature goes

WhatsApp is the first channel, not the model. When a channel ships a semantic, do **not** invent a
mechanism — classify it. Ask in order; the first match wins:

1. Is it **metadata *about* a message**, meaningful across channels? → an **envelope decoration**
   (`status`, `editedAt`, `deletedAt`, `forwardedFrom`, `thread`, `reactions`, `replyTo` — §3).
2. Does it change **what rows exist**, rather than what a message shows? → a **row kind /
   mechanics** concern (`separator`, `group`, `single`, the unread marker).
3. Is it the **payload itself**? → a **content type**: channel-neutral → kit; channel-specific →
   consumer instance.
4. Is it an **affordance** — may the viewer do X *here*? → a **capability** (§7).
5. Is it only **how something looks**? → theme tokens (§10). Never a fork.

The map, against the channels we target:

| Channel semantic | Where it goes |
|---|---|
| Edits (Slack / Teams / Telegram / Discord) | decoration `editedAt` — `Properties` appends "(edited)" |
| Deletion / tombstone | decoration `deletedAt` + the dispatch short-circuit (§3) |
| Forwarding (Telegram) | decoration `forwardedFrom` |
| Threads (Slack / Teams / Discord) | decoration `thread` (summary) + `onOpenThread`; the thread view is consumer navigation over a **second** message list; replies are never interleaved into the main rows |
| System events ("X joined", call started) | **`single` row kind** — authorless, centered, ungrouped; still dispatched through the type registry (`type: 'system-…'`) |
| Unread "NEW" line (Slack), announcement breaks | **marker row** — `buildMessageRows` breaks the group at a consumer-given watermark and emits the marker (the visual already exists as `MessageSeparator.Pill`) |
| Multi-emoji reactions + identities (Slack / Teams / Telegram) | already covered: per-emoji `ReactionPill`s + lazy `ReactionParticipant`s. Default rendering = **one clustered pill** (all emojis + total; popover lists each reactor + their emoji); the **per-emoji chips** form is available as `Message.ReactionsExpanded` |
| Read receipts (WhatsApp ticks; Teams "Seen"; Slack none) | `status` presence/absence per message — already capability-shaped |
| Albums / media groups (Telegram), multi-file posts (Slack) | **kit content type** (`gallery: { items: (ImageView \| VideoView)[] }` + a grid atom); the adapter merges the run into one message; the merged album shares one reaction/reply target — accepted, it matches the channels' own behavior |
| Block Kit / Adaptive Cards / inline keyboards | **consumer instances** composing push slots; the flat `Actions` row is the base primitive, cards are compositions — the base never grows a card DSL |
| Polls | content type (consumer; kit if it proves channel-neutral) |
| mrkdwn / per-channel markup | `renderText(text, message)` — the message argument lets one provider serve mixed-channel lists |
| Broadcast view counts (Telegram channels) | `Properties` children — instances append; not an envelope field until a second broadcast metric proves the pattern |
| Voice/video notes (round), animated stickers | kit atom **variants** (size/format via props), not new architecture |
| Mentions | consumer `renderText` + its own entities |
| Pins | consumer state; a pinned list renders via the `preview` surface |

**Considered and rejected** (so they are not re-litigated):

- **A second feed-layout paradigm in the base.** Rejected under the proxy reframe (§1) — the bubble
  language legitimately represents feed-native channels. The enforceable residue: Container-tier
  *chrome* (reactions, options, picker) must never be welded to Container's *geometry* (alignment
  flex, width caps) — geometry stays themable so a feed presentation remains buildable as a kit,
  not a rebuild (§6).
- **Part-view records per registry entry** (CometChat-style `headerView`/`contentView`/`footerView`
  templates). Rejected: our instances compose slots freely, which is strictly more expressive; part
  records exist to compensate for non-composable templates.
- **A third `quoted` surface.** Rejected: a quote is `preview` with host chrome.
- **Descriptor-based previews** (`preview(content) => { label, thumbnail? }` rendered by one base
  chrome). Rejected: a mini-DSL where composition already exists — the moment a preview needs more
  than label + thumb (a poll tally, a duration pill), the descriptor is a wall. Uniformity comes
  from the preview-chrome slots that preview components compose, exactly as bubble uniformity comes
  from `Bubble` — one rendering philosophy for both surfaces.

## 5. Litmus tests — does it belong in BASE, ATOM, KIT, or CONSUMER?

Ask in order; the first "yes" wins.

**BASE — "is it content-blind chrome?"**
- Does it read *only* the universal envelope fields (`id, group, color, alignment, type, timestamp,
  status, reactions, replyTo`) and never `content` or `author` (both opaque — forwarded, never read)?
- Would it render identically no matter the payload, and still be meaningful if every content type
  were deleted?
- Is it positioning / interaction / overlay / grouping / scroll, or the registry *mechanism*
  (alignment, the option row, reaction picker, bubble shape)?

**ATOM — "is it a prop-driven visual?"**
- Is it driven entirely by props, reading context only for cross-cutting *formatters* — never
  message data?
- Could it render in a story with no `ChatProvider` and no envelope?
- Is it the smallest reusable visual unit (avatar, audio player, doc chip)?

**KIT — "is it a channel-neutral content renderer?"**
- Does it read `content`, assuming a shape every channel understands identically (text / image /
  audio / video / document / sticker)?
- Does it bind a `type` to a renderer that feeds atoms, with **no channel-specific field** in its
  view?

**CONSUMER — "is it channel- or app-specific?"**
- Does it encode a channel feature (template, interactive buttons/list, link, location, selection)?
- Does it map *this* app's schema into views, or own viewer identity / redux / lightbox /
  callbacks?
- Would a different product on a different backend not want it?

**Tie-breakers:**
- Reads `content` → **never BASE**.
- Names a specific channel feature → **CONSUMER**, not KIT.
- Neutral data shape + cross-cutting interaction but renders no content → **BASE** machinery
  (instance-placed if it lives inside the bubble).
- Zero data assumptions, pure visual → **ATOM**.

For a **channel semantic** specifically, run §4's classification first (decoration vs row kind vs
content type vs capability vs theme) — these litmus tests then place whatever code it needs.

## 6. Slot taxonomy

### The composition mechanism: two contexts, deliberately kept

The mechanism is **compound components + React context**, and the two contexts play *different*
roles — don't conflate them:

**`useChat()` — app configuration (dependency injection).** The consumer's formatters, renderers,
registries, and callbacks: set once at the provider, read arbitrarily deep. This is the canonical
use of context (theming / DI). Prop-drilling these through every slot would be pure boilerplate.
Uncontroversial; it stays. Its hooks fall into **naming families**, by how the base uses each — so
the name signals the shape:

| Family | Shape | The base… | Members |
|---|---|---|---|
| `format<X>` | `(scalar) => string` | formats a value to text | `formatTime`, `formatCalendar`, `formatDuration` |
| `render<X>` | `(value) => ReactNode` | calls one function (no key) | `renderText`, `renderStatus` |
| `<x>Renderer` | fixed record of render fns | reads named facets of **one** concept | `authorRenderer` `{ avatar, name }` |
| `<x>Renderers` | open registry keyed by data | **dispatches by a runtime key** | `messageRenderers` (by `type` × surface), `actionRenderers` (by action type) |
| `get<X>` | `(message) => Promise<data>` | fetches lazy data on demand | `getReactionParticipants` |
| `on<X>` | `(message, …) => void` | notifies a viewer action | `onCreateReaction`, `onDeleteReaction`, `onOpenThread`, `onAction` |

The plural carries meaning: **`<x>Renderers` (plural) is an *open, extensible registry* you can
register into (keyed by a data value like `message.type`); `<x>Renderer` (singular) is the *fixed
facets of one concept* the base reads by name (`.avatar`/`.name`) — not a collection.** So the
author hook is singular `authorRenderer` (two facets of one author, static field access), *not*
plural like `messageRenderers` (dynamic lookup into a growing set). `renderStatus` is `render<X>`
(it produces a node — a renderer, not a `format<X>`). And the **reaction callbacks live here, not
on the message** — every `get<X>`/`on<X>` takes the message as its first argument, so the
per-message context carries data only, never callbacks.

**`useMessage()` — the per-message provider.** The **dispatch layer** mounts `MessageProvider`
around the resolved instance — *whoever dispatches, provides*: the row renderer for the timeline,
the `Reply` slot / composer banner / conversation line for previews. Instances never mount it, so
prop and context cannot diverge and no instance can forget it. The provider puts the message into
`MessageContext`; decoration slots read it. It carries **the message (every universal envelope
field, §3 — `author`/`content` opaque, only forwarded) and interaction/derived state**
(`isFirst`/`isLast` from grouping, `isOver` from hover) — never a *readable* path to content, and
never callbacks (those live on `ChatContext`; the hover actions are resolved from the option
system, §7, not supplied per message).

This is the standard compound-component provider pattern (Radix/Reach-style), not prop-drilling, and
it stays — for two concrete reasons. (1) Decoration slots each need several universal fields
(`Author` → opaque `author`+`isFirst`, `Properties` → `timestamp`+`status`, `Reactions` →
`reactions`, `Reply` → `replyTo`); threading all of them through every kit and consumer
instance is boilerplate. (2) **Reactions are *free* only because of context** — `Container`
auto-mounts them by reading `reactions` from context; a pure-props model would make every instance
re-wire reactions and risk silently dropping them (the failure mode §12 warns against). Interaction
state (`isOver`, the computed `isFirst`/`isLast`) is genuinely provider-owned and wants context
regardless.

> **Two channels, two owners.** Context carries what the **base** owns — the universal envelope +
> derived state — for the slots. Props carry what the **type** owns — the arm-typed `content` view —
> for the instance body (`MessageInstanceProps<TContent>`, §8). The context's copy of `content` is
> `unknown`, deliberately unreadable, so the typed path and the chrome path cannot be confused. And
> context nesting handles previews for free: slots inside a preview read the inner (target) message.

> **Content-blindness comes from the envelope, not the mechanism.** The obvious worry is that
> `useMessage()` is the very affordance that let base slots *pull* content fields. It was — but once
> the flat content fields leave (§11 step 7), the base reads `content` only as `unknown`. A base slot
> then **cannot** pull content from the context without an explicit cast, so the context stops being
> a pull-vector on its own. That turns "delete pull, keep push" from a discipline you must remember
> into something the types largely enforce: the leak was the flat fields on the envelope, not the
> context call.

### Slot categories

What changes is *which* slots exist and *what* they are allowed to read. Two categories survive; one
is deleted. The axis is **not** "structural vs content" — it is **reads `content`/flat fields (pull)
vs receives children (push)**.

**STRUCTURAL** — pure push wrappers, no data:
- `Container` — aligns the row, mounts the **quick/overflow options** resolved from the option
  system (§7) — the reaction picker arrives as the base `react` option, not as bespoke chrome —
  and auto-mounts `Reactions` (the pills; Container-tier chrome). Chrome
  mounting is deliberately independent of Container's *geometry* (the aligned flex recipe, width
  caps — themable): bubble-paradigm geometry must never weld the chrome shut (§4, rejected
  feed-paradigm note).
- `Bubble` — alignment-coloured rounded bubble + the avatar connector arrow (a `connector` prop,
  defaulting to `isFirst`); any author accent it paints comes from the scalar `color` (§3), never
  `author`. The explicit `connector` override exists for **split-bubble** floating instances: a
  sticker renders an author **header pill** (which carries the tail), floating content, and a meta
  **footer pill** (`connector={false}`) — the tail always rides the header.

**DECORATION** — read *universal* fields only:
- `Author` — forwards the opaque `author` to `authorRenderer.name(author)` on `isFirst` (it never
  reads author fields); `Properties` (timestamp + delivery status, **plus appended children** — an
  instance adds "(edited)" from `editedAt`, view counts, importance badges without forking the
  slot). Bubble-tier: **instance-placed** — the instance decides whether and where to mount them (a
  floating sticker mounts `Properties` inside a compact footer pill).
- `Reply` — renders `replyTo` at the **`preview` surface** through the *message* registry (not a
  separate reply registry) and owns only the quote chrome — a left line stroked from the scalar
  `replyTo.color` (§3), never `replyTo.author`; the compact content comes from the replied-to type's
  own renderer.

**CONTAINER-TIER CHROME — auto-mounted, NOT slots.** Reactions and the reaction picker are **not**
in the `Message.*` slot namespace and are not composed by instances: `MessageContainer` mounts them
automatically (reactions always; the picker when `onCreateReaction` is supplied). They live in
`message/` as standalone components (barrel-exported, like `MessageOptions`), not in `slots/`:
- **`MessageReactions`** — the **chooser** `MessageContainer` mounts; it renders the default form
  (the cluster today) and is the single seam a future `ChatContext` option would use to switch forms.
- **`MessageReactionsCluster`** (current default) — all emojis in one **clustered pill** + total,
  highlighting only that the viewer reacted with *something* (not which); its popover
  (`MessageReactionDetails`, unfiltered) lists each reactor + the emoji they used.
- **`MessageReactionsExpanded`** — **one chip per emoji**, each with its own count/`highlighted`/popover
  (filtered to that emoji).
- **`MessageReactionPicker`** — the add-reaction affordance (also auto chrome, not a slot).
Removal is via the popover's viewer row (`isViewer` + `onDeleteReaction`), **not** by tapping a pill
(a tap only opens the popover). The **data** is always per-emoji `ReactionPill`s regardless of form.

**DELETE the *pull* slots** — they read flat content fields and are redundant with atoms:
- `MessageImage`, `MessageAudio`, `MessageVideo` (read `attachments[0]` — the kit feeds
  `ChatImage`/`ChatAudio`/`ChatVideo` directly).
- `MessageFloatingBody`, `MessageFloatingAttachments` (read `body`/`attachments`).
- The `?? body` **pull fallback** inside `MessageBody`.

**KEEP `Body` / `Header` / `Footer` as push-only layout slots** — the styled text container is
worth reusing; just remove the pull. The kit already uses them as push slots
(`<MessageProvider.Body>{renderText(view.text)}</MessageProvider.Body>`).

**`MessageButtons` → `MessageActions`** (the compound `Actions` slot) — takes `actions` as a
**prop** (the kit/consumer instance passes `content.actions` in) instead of pulling
`message.actions`. The action *visual* registry (`defaultActionRenderers`) stays in base.

> Rule of thumb: **delete pull, keep push.**

### Rendering the author — primitives the base composes

The base never renders an author itself (author is opaque). Author shows up in several spots — the
avatar icon on a group, the name atop the first bubble, the participant rows in the reaction-details
popover, the author line in a reply-quote — but those are not separate things: they are arrangements
of **atomic primitives**, a visual (`avatar`), a label (`name`), and an optional secondary identifier
(`handle` — a phone number, an `@user`, an email; deliberately **proxy-agnostic**, never a channel
field like `remoteId` on the base). So `authorRenderer` is a named object of render-props (no
`surface` parameter), and the **base composes** them per location — crucially, it decides *which*
primitives a location shows:

```ts
// ChatContext, required — the base ships no defaults (author is opaque; there is nothing it could
// render). `Author` = T['author'] from the consumer's bindings (§3). `handle` is optional.
authorRenderer: {
    avatar:  (author: Author) => React.ReactNode;
    name:    (author: Author) => React.ReactNode;
    handle?: (author: Author) => React.ReactNode;
};
```

| Location | Base composes |
|---|---|
| Group bubble icon | `authorRenderer.avatar(author)` |
| First-bubble header | `authorRenderer.name(author)` **+** `authorRenderer.handle?.(author)` (on `isFirst`) — the base owns the row arrangement |
| Reaction-details row | `authorRenderer.avatar(author)` + `authorRenderer.name(author)` + the **base-owned emoji** |
| **Preview** (reply-quote, conversation line) | `authorRenderer.name(author)` **only** — the handle is noise in a compact quote |

The consumer supplies each primitive as a pure content node (its own text/colour); the base owns the
*layout* (name + handle on one row) and the *selection* (name-only on previews). Splitting `name`
from `handle` is what lets the header show both while previews and the reaction row stay name-only.

The reaction row is what proves the split: it is not a third primitive but a *composition* — base
layout (emoji + arrangement) × the two consumer primitives — so the base needs no author-shape
knowledge. `authorRenderer` is **required** (the base ships no default avatar, symmetric with shipping
no default content renderer).

**The reaction *participants* are loaded lazily and carry the author.** The envelope's
`reactions: ReactionPill[]` are author-free **pills** (`{ emoji, count, highlighted }` — the base
emphasizes a `highlighted` pill; the consumer projects `highlighted: reactedByViewer`, keeping the
"viewer" concept out of the base type) — cheap,
shipped with every message. The *who-reacted* list is fetched on demand, only when the popover opens,
through the `getReactionParticipants` callback on `ChatContext`, which returns participants:

```ts
interface ReactionParticipant<TAuthor = unknown> {   // TAuthor = T['author'] from ChatTypes (§3)
    author: TAuthor;
    emoji: string;                       // which reaction — base-rendered in the row
    timestamp?: number | string | Date;
}
// ChatContext — all reaction callbacks take the message as their first argument:
//   getReactionParticipants?: (message: BaseMessage) => Promise<ReactionParticipant<T['author']>[]>
//   onCreateReaction? / onDeleteReaction?: (message: BaseMessage, emoji: string) => void
```

Each entry ties an author to the **emoji** they used, so a details row is exactly
`authorRenderer.avatar(author)` + `authorRenderer.name(author)` + the base-rendered `emoji`. The base
sees `ReactionParticipant<unknown>` — author opaque, **rendered** (not read) via the two primitives;
the emoji is base-owned reaction data; the consumer sees `ReactionParticipant<T['author']>`, typed
through the provider's `T`, so the lazily-loaded list can't carry the wrong author shape. This is what retires the current
`self`-flag / fabricated-timestamp hack: a participant now carries a real opaque author and a real
timestamp. `ReactionPill` stays ungenericized; the author binding rides the lazy callback, not the
envelope.

This holds on one condition: the two primitives must be **size/layout-flexible** (they fill the slot
the base gives them; the base sizes the container — a large avatar at the group edge, a small one in
a reaction row). That is the clean atom contract anyway. The escape hatch: if a location ever needs
different author *content* — not just a different size (e.g. a name *without* a handle in one place,
*with* in another) — that location earns a real **surface**; for the three spots above, size/layout
is the only difference, so two primitives + base composition is exactly right.

Note the asymmetry with message surfaces below, which is deliberate: **author decomposes into
reusable primitives the base composes; a message surface is a whole rendering that does not
decompose** (you can't build a `preview` from message-atoms), so messages stay surface-keyed in the
registry. The *encoding* is uniform — a named object, never a `surface` parameter — the cardinality
differs because the concepts do.

### Rendering a message across surfaces — full / preview / summary

A message renders in more than one place, each a different *shape* — the same insight as author
surfaces, applied to the whole message. The compact places split into **two clusters, not one**,
so the base owns a **closed set of three surfaces**:

```ts
type MessageSurface = 'full' | 'preview' | 'summary';   // base-owned, closed; grows by adding a variant
```

- **`full`** — the timeline row (reactions, options, properties, author label, reply-quote above).
- **`preview`** — a compact quote **block**: the **reply-quote** above a bubble and the **composer's
  "replying to…" banner**. Can carry a thumbnail and an author line (host-added), one or two lines —
  a little card.
- **`summary`** — a dense one-**line** digest: the **conversation list's last-message line**, search
  hits, pinned lists. The leanest form — label only ("📷 Photo", "🎤 Voice message", a sender-prefixed
  snippet), no thumbnail-card. (This corrects an earlier claim that the conversation line was just a
  *sized* `preview`: it is a genuinely different, leaner shape serving several hosts — not one renderer
  shrunk by host chrome.)

Both compact surfaces are **renderers**, never hand-built "📷 Photo" strings — the mistake this
retires. But their **requiredness differs**, because their failure modes differ:

- **`full` / `preview` are required.** Their absence *breaks* — a raw token in a bubble or a quote —
  so completeness is compile-time and an unregistered `type` falls back to `UnknownMessage` /
  `UnknownMessagePreview`.
- **`summary` is optional, with no fallback — absent ⇒ nothing.** A clamped `preview` would drag a
  thumbnail-card into a one-line list row (wrong); an empty digest line is harmless. So the summary
  surface trades "never silent" for **"never wrong"**: a type authors `summary` only when it has a
  genuine one-line digest, and `useMessageRenderer(message, 'summary')` returns `MessageRenderer |
  null` — the host (`Conversation.Message`, search hit, …) renders nothing when it's null.

The **cell/host split still holds**: the conversation *row* (lux's optional default row, §1/§12, or
the consumer's own) is the host — it owns the row layout and drops the `summary` renderer into its
last-message slot. Lux ships the row's *look* but not the *list* (no ordering/selection/unread — §1).

There is **no separate reply stack.** The reply-quote slot and the composer both render their
*target* message (`replyTo`, or the message being answered) by looking it up in the **same**
`messageRenderers` at surface `'preview'`. The **placement vs rendering** split is identical to
authors: the host *places* the preview and owns the **surrounding chrome** (the quote's colored left
border; the composer banner's dismiss "✕"); the message renderer produces the **compact content**.
Because a preview *interprets content* (text snippet, thumbnail, "🎤 Voice 0:12", filename), the §3
generalizing rule puts the preview renderers in the **kit/consumer**; the base owns only the surface
*mechanism* and the **preview-chrome** structural slots (compact container, clamped body, thumbnail).
A preview composes author primitives too — it shows the replied-to author via
`authorRenderer.name(author)` (and strokes its left line from `replyTo.color`, §3).

Both surfaces share **one props/context contract**: the target message goes into `MessageContext`
either way; interaction and grouping state (`isFirst`, `isOver`) is simply inert on `preview`.
There is deliberately no narrower `PreviewProps` type — one contract, two shapes.

**Organizing renderers across the two axes (`type` × `surface`) is settled: the 2-D, type-first
registry** `{ text: { full, preview }, image: { full, preview }, … }`. The alternatives are
rejected with evidence: **surface-as-a-prop** (one component branching on `surface`) fills every
instance with `if (surface === 'preview')` for layouts different enough to be two components; a
**surface-first transposition** (`{ full: {…}, preview: {…} }`) breaks the cohesion that makes
packs work (a type registers as one complete unit) and lets a preview go silently missing; and a
**generic switch-on-`type` preview renderer** reintroduces the base `switch` the registry exists to
avoid. **Both surfaces are required** — completeness is compile-time. Degradation is explicit,
never silent: a consumer that genuinely doesn't care writes `preview: UnknownMessage.preview` —
visible in review, greppable — rather than shipping a type whose quotes render as a token by
omission.

## 7. Capabilities and options — affordances as data

Channels differ not only in content but in **what the viewer may do**: WhatsApp has reactions, a
Telegram broadcast doesn't; Slack has threads, WhatsApp doesn't; some channels allow editing own
messages. Forking components per channel is the failure mode. Affordances are **data**, gated in one
place.

### Capabilities — consumer-projected channel truth

```ts
// ChatProvider (conversation scope): what the viewer may do HERE.
capabilities?: ReadonlySet<string>;   // e.g. 'send-reaction', 'send-reply', 'open-thread', 'edit-own-message'
```

The consumer projects channel truth into an opaque string set, per conversation. The base never
reads the set directly — **one derivation seam** (a base hook) combines capability × ownership
(`alignment === 'end'` is "mine") × message state (`deletedAt`, failed send) into booleans
(`canReact`, `canReply`, `canOpenThread`, `canEdit`, …), and every affordance consumes the booleans:
the `react` option isn't offered without `canReact`, the thread affordance without `canOpenThread`.
**Absent set = everything permitted** — capabilities are a restriction vocabulary, so the
ten-minute start needs none. The base documents the capability names *it* consults; consumer
instances are free to consult their own through the same hook.

### Options — what the viewer does *to* a message

Two vocabularies share the word "action"; keep them apart:

- **Content actions** (`MessageAction`, the `Actions` slot, `actionRenderers`) — buttons that are
  part of the *message* (template buttons, inline keyboards). New: `onAction?: (message, action) =>
  void` on `ChatContext` gives callback-style buttons (Telegram `callback_data`) a dispatch path;
  self-contained kinds (`link`, `tel:`) still need none.
- **Viewer options** (`MessageOption`) — operations the viewer performs *on* a message: reply,
  forward, copy, delete, open thread. These used to be an opaque per-message `menu` element; they
  are now **data**, and share **one shape with `ConversationOption`** — the same model over a
  different subject:

```ts
interface MessageMenuItem {                             // the Menu.Item VALUES lux renders
    icon?: ReactElement; label: string; disabled?: boolean; className?: string;
    onSelect: () => void;                               // already bound to its message
}
interface MessageOption {
    type: string;                                       // 'reply' | 'copy' | 'delete' | … or consumer-defined
    placement: 'menu';                                  // overflow menu only, for now
    capability?: string;                                // required capability, if any
    applies?: (message: BaseMessage) => boolean;        // message-state gate (e.g. not on a tombstone)
    resolve: (message: BaseMessage) => MessageMenuItem; // resolves the item per message
}
// ChatProvider: messageOptions: MessageOption[] — the REQUESTED set; base default = [].
// ConversationOption is identical with `conversation: BaseConversation` in place of `message`.
```

**The menu is opinionated lux chrome, and each option `resolve`s its item.** An option does not carry
static display fields — it *returns* them from `resolve(subject)`, so the base renders a real
`Menu.Item` (lux's chrome, not a consumer re-implementation) while the consumer decides
label / icon / `onSelect` **per row**, including *stateful* labels (Pin ↔ Unpin, Fijar ↔ Desfijar).
`resolve` subsumes the static case (ignore the argument), which is exactly why messages and
conversations share the one model. `onSelect` is zero-arg — already bound to its subject inside
`resolve`.

**Rendered = requested ∩ permitted ∩ applicable.** The base resolves the consumer's option list
against `capabilities` and per-subject state (`applies`), then owns the overflow-menu chrome — an
absolute hover overlay at the top-right corner, mounted by `MessageContainer` /
`ConversationContainer`, so it reserves no layout space. Consumers add/remove/reorder by filtering
and concatenating — options compose; they are never a wall. This is the pattern that keeps
per-channel affordance differences out of component code entirely.

**"Add reaction" is deliberately NOT an option — it is separate, fixed base chrome.** An earlier
design folded the reaction chooser into the option system (a `react` option that opened the picker);
that was reversed by an **opinionated call**: adding a reaction is its own always-on affordance, kept
apart from the menu/option logic. (That reversal is also why the option model no longer needs a
custom-UI escape hatch or an inline quick-row — the only thing that wanted them was `react`, so both
were dropped and options collapsed to the single `resolve`-a-`Menu.Item` shape above.) The base ships it as `MessageReactionPicker`, positioned by
`MessageContainer` in its own column beside the bubble (not in the option toolbar), present whenever
`onCreateReaction` is supplied. Its picker reuses the module's `EmojiPicker`; a lighter plain-unicode
quick strip overridable via `reactionEmojis?: string[]` is a possible future refinement. Consequently
**the base default option set is empty (`[]`)** — every candidate option fails content-blindness or
needs consumer behavior (`copy` must read `content`; `reply`/`delete`/`forward` need composer state or
domain commands), so options are entirely the consumer's (via `messageOptions` or a pack). Note the split
this makes clean: **reaction pills** are a decoration (display of reaction *data*, auto, §3 — tapping
your own highlighted pill removes it via `onDeleteReaction`); **adding** a reaction is fixed chrome (a
built-in affordance, gated only by `onCreateReaction`); **menu operations** are options (data, gated,
requested ∩ permitted ∩ applicable). Three separate concerns, deliberately not conflated.

## 8. Extending the kit

A consumer adds a message type without touching the base or the kit:

1. **Author an instance** — a `{ full, preview }` pair of `ComponentType<MessageInstanceProps>`
   (§6's 2-D registry form): the `full` component composes base slots (`Container`, `Bubble`,
   `Author`, `Reply`, `Body`/`Header`/`Footer` push slots, `Properties`, `Actions`) and atoms,
   reading its own `content` shape; the compact `preview` composes the base preview-chrome slots.
   Instances do **not** mount `MessageProvider` — the dispatch layer does (§6, *whoever dispatches,
   provides*); an instance is pure composition.
2. **Register it** — spread the kit defaults and override/extend per type (a whole pair, or one
   surface of one):
   ```ts
   const MESSAGE_RENDERERS = {
       ...coreMessageRenderers,
       template: { full: TemplateMessage, preview: TemplatePreview },    // add a channel type
       image: { ...coreMessageRenderers.image, full: LightboxImage },    // override one surface
   };
   ```
3. An **unregistered `type`** falls back to the base `UnknownMessage` — it mounts
   `Container` / `Bubble` (so reactions, the menu, and status machinery still work) but keeps its
   bubble interior content-free (renders the `type` token, not a content opinion), and it covers
   **both surfaces**, so an unmapped type degrades gracefully inside a reply-quote too. The base
   ships **no** default content renderers; the defaults come from whichever kit the consumer
   installs.

The kit is defaults, never a wall: a consumer overrides any single type while keeping the rest.

### Type safety — confine the cast to one boundary

The foundation is the discriminated `MessageData<T>` from §3 — the type itself links `type` to
`content`. The registry, however, dispatches by a `string` key, so the hop from key to component is
*inherently* runtime: the type system cannot know that the component under `'text'` only ever
receives a `TextView`. That one erasure is unavoidable — but it is **the only one**. Everything on
either side of it is fully typed. Do **not** scatter `content as TextView` casts through instance
bodies; that is the symptom of an erased discriminated union, not the design.

**1. The content map *is* the `type ⇒ view` contract** — it is the `content` field of the consumer's
`ChatTypes` (§3). `type` stays *only* on the envelope (the single discriminant / registry key);
content stays thin and carries no redundant discriminator. The map is compile-time only — it never
reaches the wire, and it lets `image`/`sticker` share a view under different keys. The kit ships its
own map; the consumer's bindings extend it:

```ts
type CoreContentMap = {                          // the kit's content vocabulary
    text: TextView; image: ImageView; sticker: ImageView;
    audio: AudioView; video: VideoView; document: DocumentView;
};

type HermesChat = {                              // the consumer's bindings — satisfies ChatTypes
    author: HermesAuthor;
    content: CoreContentMap & { template: TemplateView; /* … */ };
};
```

(`type` aliases, not `interface`s — see the note on `ChatTypes` in §3: an `interface` lacks the
implicit index signature and fails the `Record<string, unknown>` constraint.)

**2. `MessageInstanceProps` is generic over one arm's content — instance bodies need no cast.** An
instance handles a single `type`, so it needs only its arm's content typed (not the whole union):

```ts
// the per-arm projection of BaseMessage with content narrowed; default keeps untyped call-sites working
interface MessageInstanceProps<TContent = unknown> {
    message: Omit<BaseMessage, 'content'> & { content?: TContent };
    // …
}

function TextMessage({ message }: MessageInstanceProps<TextView>) {
    // message.content is TextView | undefined — fully checked, no `as`
    return <MessageProvider.Body>{renderText(message.content?.text ?? '')}</MessageProvider.Body>;
}
```

**3. A typed registry builder is the one named, auditable cast.**

```ts
// One instance = the surface pair for one type (§6): the timeline rendering + the compact preview.
type MessageInstance<TContent = unknown> = {
    full: ComponentType<MessageInstanceProps<TContent>>;
    preview: ComponentType<MessageInstanceProps<TContent>>;
};

// generic over a content map (the `content` binding) — author isn't needed to build the registry
function buildRenderers<TContentMap>(
    map: { [K in keyof TContentMap]: MessageInstance<TContentMap[K]> }
): MessageRendererRegistry {
    return map as MessageRendererRegistry;   // ← the single erasure, asserted once
}

export const coreMessageRenderers = buildRenderers<CoreContentMap>({
    text:     { full: TextMessage,     preview: TextPreview },
    image:    { full: ImageMessage,    preview: ImagePreview },
    sticker:  { full: StickerMessage,  preview: ImagePreview },
    audio:    { full: AudioMessage,    preview: AudioPreview },
    video:    { full: VideoMessage,    preview: VideoPreview },
    document: { full: DocumentMessage, preview: DocumentPreview },
});
```

Registering the wrong component under a key — `text: { full: ImageMessage, … }` — is now a compile
error.

**4. The producer closes the loop.** The consumer's adapter returns `MessageData<HermesChat>` — the
discriminated union from §3 over its own bindings — so building a message can't pair the wrong
content with a `type`, and `author`/`replyTo` are typed by construction (the adapter must set
`group`, typically `group: author.id`):

```ts
// transformMessage: ReturnType is MessageData<HermesChat>
// { type: 'text', content: { url } } → error; must be a TextView
```

The producer guarantees the shape, the builder asserts the dispatch, the instance body reads it
clean. The single residual `as` inside `buildRenderers` is sound *because* the producer is
type-checked against the same map. No runtime validation is needed: `transformMessage` is a trusted
in-process producer, so compile-time suffices (a guard would only be warranted if `content` arrived
as untrusted `unknown` off the wire). Note the **handled-vs-possible** caveat from §3: the base still
renders `BaseMessage[]` and an unmapped `type` falls through to `UnknownMessage`; `MessageData<T>`
buys producer- and switch-site safety, not runtime exhaustiveness.

### Channel packs — one channel, one record

A channel's contributions want to travel together: its message renderers, its content-action
renderers, its viewer options, its content-map fragment. A **pack** is a declarative record of
registry fragments, merged in order at the provider — sugar over the same spreads, not new
machinery:

```ts
interface ChatPack {
    messageRenderers?: MessageRendererRegistry;    // merged by type key — later packs win
    actionRenderers?: ActionRendererRegistry;
    options?: MessageOption[];                     // appended
}
// ChatProvider: packs={[corePack, whatsAppPack, slackPack]} — ordered, inspectable, per-instance
```

Rules learned from others' scars: registration is **declarative merge by key** (never
fetch-mutate-push), packs are **values in provider context** (never a global configurator — two
chats with different packs on one page must be trivial), and collisions warn in dev mode. The core
kit is just `corePack`; `coreMessageRenderers` remains its renderer fragment for consumers who
prefer plain spreads.

### The ejection ladder — three documented tiers

Customization depth is a ladder, and every rung is a supported public surface — a consumer should
never need to fork the tier above to get the tier below:

1. **Configure** — provider hooks, formatters, tokens, options, packs. No components written.
2. **Compose** — author instances from base slots + atoms and register them by `type` × surface.
   This is the *designed* extension surface; part-level slots exist precisely so nobody needs
   list-level takeover to restyle a bubble.
3. **Rebuild** — `buildMessageRows`, the contexts, and the slots are exported; a consumer can write
   its own list chrome without forking dispatch or grouping.

There is deliberately **no list-level `renderMessage` escape hatch** (the lesson of every kit that
shipped one: consumers end up re-owning dispatch, grouping, and chrome). If one is ever added, it
must receive the default rendering as a callable (`(message, renderDefault) => node`).

## 9. Consumer contract — what you provide, what we default

Standing up a chat has a small **required** surface (things only the consumer knows) plus a set of
**defaulted** hooks you override only when you need more. Every default the module ships is
deliberately **library-free** — a pure function over its inputs using only ECMAScript built-ins
(`Intl`/`Date`) and native DOM elements. No markdown parser, no icon set, no date library. That keeps
the base portable and lets a minimal consumer render a working chat out of the box; anything heavier
is an explicit override the consumer owns.

| Hook / input | Required? | Default (library-free) | Override to get |
|---|---|---|---|
| `ChatTypes` bindings (§3) | **required** | — | your author type + content map |
| adapter → `MessageData<T>` (§3) | **required** | — | your domain → envelope mapping (`id`, `type`, `group`, `color`, `alignment`, `timestamp`, opaque `author`/`content`, `status`, reaction pills, `replyTo`) |
| `authorRenderer { avatar, name }` (§6) | **required** | — (base ships no avatar) | your author visuals |
| `messageRenderers` (§8) | **required\*** | none from base (→ `UnknownMessage`); the **kit** ships `coreMessageRenderers` to spread | channel types (both `full` + `preview` surfaces) |
| `renderText` | optional | **identity** — the text as a plain string, no markup | markdown / rich text; receives `(text, message?)` so one provider serves mixed-channel lists (§4) |
| `renderStatus` | optional | **identity** — the status token as plain text | icon ticks |
| `capabilities` (§7) | optional | **absent — everything permitted** | per-channel affordance gating (reactions/threads/edit…) |
| `messageOptions` (§7) | optional | the base default set — empty (no content-blind operation survives), ∩ capabilities | add reply/copy/delete/forward… as consumer options |
| `conversationOptions` (§7) | optional | empty | pin/mute/… as `resolve(conversation) ⇒ Menu.Item` options, ∩ the shared capabilities |
| `reactionEmojis` (§7) | optional | a short plain-unicode emoji list for the `react` picker | your emoji vocabulary |
| `onAction` (§7) | optional | **absent** — self-contained content actions only | callback-style content buttons (Telegram `callback_data`) |
| `onOpenThread` (§7) | optional | **absent** — thread summaries render inert | thread navigation |
| `formatTime` | optional | built-in `Intl`/`Date` (e.g. `toLocaleTimeString`) | a date library / custom format |
| `formatCalendar` | optional | built-in `Intl`/`Date` | a date library |
| `formatDuration` | optional | arithmetic `m:ss` / `h:mm:ss` | — |
| `actionRenderers` | optional | `defaultActionRenderers` — a plain `<button>` with the action's `text`, no icons | per action kind |
| `onCreateReaction` / `onDeleteReaction` | optional | **absent** — the `react` option is inapplicable (no picker); pills still display | let the viewer react |
| `getReactionParticipants` | optional | **absent** — pills still show; the who-reacted popover is unavailable | lazy participant details (§6) |

\* Practically required: without a registered renderer every `type` falls through to the base
`UnknownMessage` placeholder. The base ships **no** content renderers of its own; the sensible
default *vocabulary* (text/image/audio/video/document/sticker) is the **core kit**'s
`coreMessageRenderers`, built on the module's own atoms (native `<img>`/`<audio>`/`<video>` …). You
install the kit, spread it, and extend for your channel types.

Not on `ChatContext`: **instance props** — instance-specific behavior (e.g. the lightbox's
`onImageClick`) is passed where the consumer renders the instance. (The former per-message `menu`
element is retired: hover actions now come from the option system, §7.)

**The library-free rule for defaults.** A default that reached for a third-party dependency — a
markdown renderer for `renderText`, an icon set for `renderStatus`/`actionRenderers`, `date-fns` for
the formatters — would drag that weight onto every consumer and undercut "portable base." So the
shipped defaults stay pure: identity renderers, arithmetic/`Intl` formatters, and plain native
elements. The consumer opts into anything richer by *overriding* the hook — which is exactly where a
markdown parser, an icon set, or a date library belongs.

## 10. Platform tenets

Engineering commitments that keep the library good over years, learned from the kits that came
before us (their failure modes in parentheses):

- **Scroll is a base product.** Sticky-bottom, position preservation when older history loads,
  imperative scroll, jump-to-unread — first-class, tested behaviors of `MessageList`, not examples.
  No force-scroll-to-bottom on every render (the current code does this — it makes thread panes and
  history reading impossible). A chat library lives or dies in its scroll mechanics (chatscope's
  issue tracker is the proof).
- **Theming is semantic tokens.** `--lux-chat-*` CSS custom properties consumed by Tailwind are the
  *only* theming contract — overridable globally or per subtree, dark mode by scope class. No JS
  theme objects (deleted within one major elsewhere), no compile-time-only variables (unoverridable
  at runtime), no reaching into internal class names.
- **Dependency discipline.** The base carries no runtime dependency beyond React and a classname
  helper; media-heavy kit renderers sit behind lazy edges; nothing in a default is heavier than a
  native element (§9's library-free rule, restated at package level — the 1.6 MB-install kits never
  recovered from their defaults).
- **The public contract is frozen.** The stable API is: the envelope (`BaseMessage`), the bindings
  (`ChatTypes`/`MessageData<T>`), the registry signature (`type` × surface), the slot names, the
  hook families (§6), and the token names. Instances and chrome may evolve; the contract does not.
  (The competing kits re-architected their extension surface every major — customization built on
  internals is customization that breaks.)
- **The ten-minute start is a feature.** Adapter + `authorRenderer` + spread `corePack` → a working
  chat. Everything sophisticated — capabilities, options, packs, custom types — is additive opt-in.
  Zero-ceremony adoption is why simpler kits keep winning users they shouldn't.

## 11. Refactor roadmap

From the current dual-rail state to the target. **Additive first, removals last** — every removal
is preceded by its replacement, and hermes `chat/web` stays green at each step. The dual path is
what makes this safe: keep both rails live until the new rail carries the traffic.

### Phase 1 — land the target model

0. **(base, additive)** Add `UnknownMessage` (content-free structural placeholder, covering both
   surfaces) and `MessageActions` (accepts `actions` as a prop) alongside the existing pull-based
   `MessageButtons`. Nothing wired yet. Non-breaking.
1. **(base + consumer, breaking-mechanical)** Introduce the **type model** (§3): `BaseMessage` (with
   `group`, `color`, opaque `author`), `ChatTypes`, `MessageData<T>`, `MessageInstanceProps<TContent>`,
   and `buildRenderers`; type the base machinery (`buildMessageRows`, `MessageContext`, the slots) to
   `BaseMessage`; group by `group` instead of `author.id`. The adapter starts setting `group`/`color`
   and returns `MessageData<HermesChat>`. The legacy flat fields remain on the envelope
   transitionally. One coordinated pass with hermes (the adapter must add `group`).
2. **(base + consumer, breaking-mechanical)** Rename the **context surface** (§6): `renderAvatar` →
   required `authorRenderer { avatar, name }` and delete the base default `<Avatar>` fallback in
   `MessageGroup`; `formatStatus` → `renderStatus`; `reactedByViewer` → `highlighted` on the pill
   (`ReactionData` → `ReactionPill`); move the reaction callbacks to `ChatContext` with the message
   as first argument (`onCreateReaction` / `onDeleteReaction` / `getReactionParticipants` returning
   `{ author, emoji, timestamp }`); recompose the reaction-details rows from `authorRenderer` + the
   emoji (retires the `self`-flag / fabricated-timestamp hack). One coordinated find/replace pass.
3. **(base + kit, additive)** Add the **`preview` surface**: base preview-chrome slots (compact
   container, clamped body, thumbnail) + the surface dimension on the registry; give each
   `coreMessageRenderers` entry a `preview` reading `content`. Point the `Reply` slot at
   `messageRenderers[replyTo.type]` surface `'preview'` behind a flag. The legacy `reply/*` stack
   stays live. Non-breaking.
4. **(consumer, additive)** Author hermes instances for `template`, `buttons`, `list`, `link`,
   `selection` reading their own `content` shapes (header/footer escape the envelope here, into the
   template's content), covering both surfaces. Use the push `Body`/`Footer` slots + `MessageActions`.
   Repoint `MESSAGE_RENDERERS` off base `TextMessage`. After this, hermes routes nothing to base
   content instances. Green.
5. **(consumer, additive)** Switch the reply-quote (and, when built, the composer banner) to the
   `preview` surface; retire `REPLY_RENDERERS`. The recursive `transformMessage` already fills
   `replyTo.content`. After this, nothing reads `replyTo` flat fields and the reply registry is
   unused. Green.
6. **(base, breaking for the base API — safe for hermes)** Switch the `useMessageRenderer` fallback
   to `UnknownMessage`; delete `defaultMessageRenderers`, `message/instances/*` (incl.
   `DefaultMessage`), **and the whole `reply/*` stack** (`ReplyProvider`, `reply/slots/*`,
   `reply/instances/*`, `defaultReplyRenderers`). Delete the pull slots; make `MessageBody`
   push-only; replace `MessageButtons` with `MessageActions`. Mount `MessageProvider` at the
   **dispatch layer** (*whoever dispatches, provides* — instances stop rendering the provider).
   hermes is unaffected (the kit is installed; consumer instances already use push slots + prop
   actions + the preview surface).
7. **(envelope, breaking for the consumer)** Drop `header, body, footer, actions, attachments` (and
   `MessageAttachment`) from `BaseMessage`. Move `MessageAction` + subtypes into the action module,
   keeping the export so `LinkAction` still resolves for the consumer. Update `transformMessage` to
   stop writing flat fields. Everything already reads `content`. Green.
8. **(cleanup)** Move floating sticker / single-emoji rendering into kit instances (bubble-less; the
   split-bubble form via `Bubble`'s `connector` override — §6); drop the dead `renderReplyTo` escape
   hatch; tighten per-kit `content` typing.

### Phase 2 — go multi-channel (requires phase 1)

9. **(base, additive)** Open the **row model**: `single` row kind (authorless/system messages,
   centered, ungrouped), the **unread-marker** injection option on `buildMessageRows`
   (group-breaking, renders `MessageSeparator.Pill`), author-optional grouping. Fixes the live
   crash path (`author!` → `group.author.id`).
10. **(base, additive)** The **decorations**: `editedAt` (Properties appends "(edited)"),
    `forwardedFrom` (origin line), `thread` summary + `onOpenThread`; `deletedAt` + the
    `TombstoneMessage` dispatch short-circuit. The consumer stops mapping deletion into `status`.
11. **(base, additive — mechanical break: the per-message `menu` prop is retired)** **Capabilities +
    options** (§7): the `capabilities` set, the derivation seam, `MessageOption[]` with
    requested ∩ permitted ∩ applicable resolution replacing the `menu` element; `onAction` for
    callback-style content actions.
12. **(base/kit, additive)** **Per-emoji reaction pills** (fold into step 2's `ReactionPill` work if
    it hasn't shipped yet); gallery content type + grid atom in the kit; sticker/video-note atom
    variants (size/format props).
13. **(sweep, visual/mechanical)** **De-WhatsApp the base**: un-export `chat-background.png` from
    the barrel; lift `max-w-[75%]` out of `MessageProvider` into `Bubble`/theme; size props on
    `ChatSticker`/`ChatVideo`/`ChatImage`; move `copy-code`/`call-*` action renderers to
    kit/consumer (base keeps `link` + a plain label); `renderText(text, message)`. (Subsumes the
    emoji/sticker part of step 8 where not already done.)
14. **(platform)** The §10 tenets made real: scroll rigor in `MessageList` (kill the
    force-scroll-on-render), `--lux-chat-*` tokens, the pack merge helper, publish the frozen
    contract.

**Breaking steps:** 1–2 are mechanical breaks for the consumer (adapter fields + wiring renames —
one coordinated pass each); 6 (base API removal) and 7 (envelope shape) are the structural breaks,
both pre-covered because steps 3–5 migrated every read first. In phase 2 only step 11's `menu`
retirement breaks a consumer surface (mechanical: move menu items into `messageOptions`).

## 12. Known risks / open edges

- **Conversations are trimmed to the item/collection line (§1) — DONE.** The old `conversation/*`
  subsystem (which owned the whole list) has been split along the §1 seam, parallel to messages:
    - **BASE `conversation/`** owns the row *mechanism* — the `Conversation` slot namespace
      (`Container`, `Avatar`, `Name`, `Properties`, `Message` [the last-message slot, a `preview`
      host], `Meta`), the `ConversationProvider` context **producer** (split off the slots, mirroring
      `MessageProvider` vs `Message`), the `ConversationContext` / `useConversation` consumer hook,
      and the neutral **`BaseConversation`** envelope (named to parallel `BaseMessage` — the base-read
      envelope; the `…Data` suffix was the consumer type's, so it was misleading). Slots read the envelope from context exactly as
      message slots read `BaseMessage`. The envelope keeps only what lux *paints* — `id`, `name`,
      `avatar`, `timestamp`, `lastMessage` (→ `summary` surface), and first-class **`unread`** (lux's
      own badge opinion, like a reaction pill) — plus one **opaque `meta`** the consumer owns
      (pinned/starred/…). lux never reads `meta`; the parallel to `BaseMessage.content`.
    - **KIT `kits/core/`** owns the default *look* — one **`DefaultConversation`** instance that
      mounts the provider and arranges the slots. A row is **one shape, not polymorphic**, so there is
      **no registry / no `buildRenderers` / no surface dimension** (unlike messages) — just the one
      instance. This is the exact parallel of `coreMessageRenderers`: spread-and-go, replaceable by
      composing the `Conversation` slots yourself.
    - **CONSUMER (hermes)** owns *orchestration* — the list container (a plain `<ul>`), ordering,
      selection, and the menu, in `chat/ConversationList.tsx`; the domain → `BaseConversation` adapter
      stays in `utils/processConversations.ts`. Removed from base entirely: `ConversationList`,
      `buildConversationRows`, the `ConversationRow` union, `ConversationBuildRowsOptions`, and the
      `data/conversations.ts` fixture. Both repos green (lux `build:types` = 0, hermes-own `tsc` = 0).
      *(Open follow-up, canexer's: the lux `Conversation*.stories.tsx` still import the removed
      symbols — rewrite against `DefaultConversation` or delete.)*
- **Conversation menu, indicators, and last-message rendering — DONE, parallel to messages.** The
  per-row `menu: ReactElement` (the retired-for-messages pattern) is replaced by **`ConversationOption[]`
  on `ChatProvider`** (`conversationOptions`), gated exactly like `MessageOption`
  (requested ∩ permitted ∩ applicable via `useConversationOptions`) and rendered by base chrome
  (`ConversationOptions`, one opinionated overflow `Menu`, revealed on row hover). It **diverges from
  `MessageOption` deliberately**: a row's menu item is per-row *stateful* (pin ↔ unpin label; action
  needs *which* row), so each option carries `resolve(conversation) ⇒ ConversationMenuItem` — it
  returns the `Menu.Item` **values** (label / icon / bound `onSelect`), never a component, so lux still
  renders the item while the consumer resolves label+action from the opaque `meta`. Indicators
  (pin/star) are painted by a consumer hook **`renderConversationMeta(conversation)`** (the parallel to
  `authorRenderer` for opaque author) inside `Conversation.Meta`; the **`unread` badge** is base-painted
  from the first-class field. The last-message line renders through the new **`summary` surface** (§6):
  `Conversation.Message` resolves `useMessageRenderer(message, 'summary')` and renders nothing when the
  type authored none. hermes: `conversationOptions=[pin]` + `renderConversationMeta` on `ChatProvider`,
  `meta:{pinned}` in the adapter, `summary` on every registered type; `ConversationMenu.tsx` deleted.
  Both repos green.
- **The reply subsystem is collapsed into the `preview` surface, not migrated.** Today
  `reply/instances/*` + `defaultReplyRenderers` are a *duplicate* content stack reading
  `replyTo.body`/`replyTo.attachments[0]`. The target is **one** surface-aware message registry: the
  reply-quote and composer banner render `replyTo` at surface `'preview'` (§6), and the whole
  `reply/*` stack is deleted (step 6). This retires the old "highest-risk second stack" by erasing it
  rather than porting it — but the cutover (steps 3→5→6) is the most invasive sequence in the
  roadmap, so land it behind the flag in step 3 and verify quoted replies before deleting.
- **Reactions are auto-injected by `Container`**, not composed by instances. That is *correct*
  (Container-tier chrome, outside the bubble). Do **not** "fix" it into an opt-in slot — the
  per-instance composition model applies to Bubble-tier decorations (`Properties`, `Reply`), not to
  Container-tier ones. The envelope carries only the author-free **pills** (`ReactionPill`); the
  who-reacted **participants** are loaded lazily via `getReactionParticipants` and carry the author
  (`ReactionParticipant<T['author']>`, §6) — which retires the current `self`-flag /
  fabricated-timestamp hack (participants now have a real opaque author + real timestamp). Keep the
  pill ungenericized; bind the author on the lazy callback, not the envelope.
- **Floating sticker / single-emoji prove placement is per-instance.** A bubble-less message has
  nowhere to mount a `Properties` tick or a `Reply` quote — which is exactly why `status` and
  `replyTo` cannot be auto-injected like reactions. These become kit instances that render atoms
  with no `Bubble`.
- **Type safety is recovered by the two-type split (§3) + §8 (*Type safety*), not by scattered
  casts.** `BaseMessage` (author- *and content*-blind) for the base; the discriminated
  `MessageData<T>` for the consumer/kit, where `T extends ChatTypes` bundles the content map and the
  author as one bindings type (`T['content']`, `T['author']`) — **one** generic, not two; a content
  map + `buildRenderers` confine the unavoidable registry erasure to one named cast; the producer
  returns `MessageData<HermesChat>` to close the loop. `author` and `replyTo` are typed by this too.
  Remember the **handled-vs-possible** caveat: `MessageData<T>` is the chosen handled set, not a
  promise about the wire — keep the `UnknownMessage` fallback and never treat a `switch` over it as
  exhaustive.
- **`author` is opaque (`unknown`) to the base; what the base needs from it are scalar primitives.**
  The base reads no author field. Anything author-derived splits by the **paint-vs-render** test
  (§3): values the base *paints with* become flat scalar primitives on the envelope — `group`
  (grouping identity, `group: author.id`) and `color` (accent for the reply line / bubble, `color:
  author.color`); the author *shape* it would *render* stays opaque and goes through the two
  `authorRenderer` primitives `{ avatar, name }`, which the base composes per location (the reaction
  row is `avatar + name +` the base-owned emoji). Don't reintroduce a base `MessageAuthor` shape or a
  base default avatar — that re-couples the base to author data (the same leak as the flat content
  fields). Add a new author **scalar** only when the base must paint with it, and a new author
  **surface** only when a location needs different author *content* (not just a different size).
  Open follow-through: extend `authorRenderer` to the **composer** when that's tackled.
- **Some action kinds may be too channel-specific for base.** `copy-code`, `call-channel`,
  `call-phone-number` are channel-flavoured; the registry *mechanism* + a generic button atom
  clearly belong in base, but reconsider whether those specific kinds + their renderers should be
  kit/consumer.
- **`renderReplyTo` is a redundant second path.** `MessageReply` honours both an explicit
  `renderReplyTo` override and the registry; hermes uses only the registry. Drop it in cleanup to
  avoid two ways to do one thing.
- **`useMessage()` context is convention-enforced until the flat fields leave.** Between now and §11
  step 7, the envelope still carries readable `body`/`header`/`attachments`, so a base slot *can*
  still pull content from context — "delete pull, keep push" rests on discipline until step 7 makes
  `content` `unknown` to the base and the type system takes over (see §6). Consider narrowing the
  `MessageContext` type to drop the legacy flat fields ahead of the envelope change so the safety
  lands earlier.
- **`MessageList` force-scrolls to bottom on every render.** Acceptable for a live tail; fatal for
  thread panes, history reading, and jump-to-unread. Fix under the §10 scroll tenet (step 14) —
  sticky-bottom must be a *condition* (viewer at bottom), not an unconditional effect.
- **Two vocabularies share the word "action" — never conflate them.** Content actions
  (`MessageAction`, in-message buttons, `actionRenderers`, `onAction`) versus viewer options
  (`MessageOption`, do-to-message operations, capability-gated, `onSelect`). The names are chosen
  so a sentence can hold both: "the option to copy a message" vs "the message's reply button".
- **Capabilities default to permissive.** An absent set renders every affordance — right for the
  ten-minute start, wrong for a consumer fronting a restrictive channel (a Telegram broadcast would
  show a reaction picker it must reject). A multi-channel consumer must project real capabilities
  per conversation; treat "no capabilities supplied" in such a consumer as a bug, not a default.
- **`MessageContext` carries `isOver` next to the data — memoize, don't split.** A hover toggle
  re-renders that one message's consuming slots, which is cheap at per-message granularity. The
  right move is memoizing the context value; splitting interaction state into a sibling context is
  an escape hatch to take only if hover re-renders ever *measurably* matter — not before.
