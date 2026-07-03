import type { ReactElement } from 'react';
import type { BaseConversation } from './BaseConversation';


// A viewer option on a conversation row — pin, mute, archive, delete, … The exact
// parallel of `MessageOption` (docs §7), the same shape over a different subject:
// the consumer declares options as data on `ChatProvider` (`conversationOptions`),
// the base gates them (requested ∩ permitted ∩ applicable) and renders them in one
// opinionated `Menu`.
//
// Each option `resolve`s its whole `Menu.Item` from the row: `resolve(conversation)`
// returns the field *values* (label / icon / bound `onSelect`), never a component,
// so the base renders the `Menu.Item` and the consumer reads the opaque
// `conversation.meta` inside `resolve` to decide the (often stateful, e.g.
// Fijar ↔ Desfijar) label and action.

export interface ConversationMenuItem {

    // `icon` is a `ReactElement` to match `Menu.Item` (the base renders it there).
    icon?: ReactElement;
    label: string;
    disabled?: boolean;

    // Fire-and-done; already bound to its conversation (closed over in `resolve`).
    onSelect: () => void;

    className?: string;

}

export interface ConversationOption {

    type: string;                                       // 'pin' | 'mute' | 'delete' | …

    placement: 'menu';                                  // overflow menu only, for now

    // Required capability, checked against `ChatContext.capabilities` (absent set
    // ⇒ permissive; absent `capability` ⇒ always permitted).
    capability?: string;

    // Row-state gate — hide the option for some conversations (reads `meta`).
    applies?: (conversation: BaseConversation) => boolean;

    // Resolves the `Menu.Item` VALUES from the row — label, icon and the bound
    // `onSelect` (all of which may depend on `conversation.meta`). The base renders
    // the `Menu.Item`; the consumer never returns a component.
    resolve: (conversation: BaseConversation) => ConversationMenuItem;

}
