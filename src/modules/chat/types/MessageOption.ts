import type { ReactElement } from 'react';
import type { BaseMessage } from './BaseMessage';


// A viewer option on a message — an operation the viewer performs
// *on* a message (reply, forward, copy, delete, …). Options are
// **data**: the consumer declares them; the base gates them
// (requested ∩ permitted ∩ applicable) and renders them in one
// opinionated overflow `Menu`. This is what keeps per-channel
// affordance differences out of component code (docs §7). The exact
// parallel of `ConversationOption` — the same shape over a different
// subject.
//
// Each option `resolve`s its `Menu.Item` from the message: it returns
// the field *values* (label / icon / bound `onSelect`), never a
// component, so the base owns the menu chrome while the consumer owns
// what each item says and does — including per-message-*stateful*
// labels (e.g. Pin ↔ Unpin, Mark read ↔ Mark unread), which a static
// field could not express.
//
// Distinct from a **content** action — an in-message button (a template
// button / inline keyboard) that is part of the message, composed by the
// consumer from the `ChatActionButton` atom (there is no base action type).

export interface MessageMenuItem {

    // `icon` is a `ReactElement` to match `Menu.Item` (the base
    // renders it there).
    icon?: ReactElement;
    label: string;
    disabled?: boolean;

    // Fire-and-done; already bound to its message (closed over in
    // `resolve`).
    onSelect: () => void;

    className?: string;

}

export interface MessageOption {

    type: string;                                       // 'reply' | 'forward' | 'copy' | 'delete' | …

    placement: 'menu';                                  // overflow menu only, for now

    // Required capability, checked against `ChatContext.capabilities`
    // (absent set ⇒ permissive; absent `capability` ⇒ always
    // permitted).
    capability?: string;

    // Message-state gate — hide the option for some messages (e.g.
    // not on a tombstone, or only on own messages).
    applies?: (message: BaseMessage) => boolean;

    // Resolves the `Menu.Item` VALUES from the message — label, icon
    // and the bound `onSelect` (any of which may depend on message
    // state). The base renders the `Menu.Item`; the consumer never
    // returns a component.
    resolve: (message: BaseMessage) => MessageMenuItem;

}
