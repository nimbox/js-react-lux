import type { ComponentType } from 'react';
import type { MenuItemProps } from '../../../components/menu/Menu';
import type { BaseMessage } from './BaseMessage';


// A viewer option — an operation the viewer performs *on* a message (reply, react,
// copy, delete, …). Options are **data**: the consumer declares them; the base
// gates them (`requested ∩ permitted ∩ applicable`) and renders them in a
// consistent chrome (a hover quick-row + an overflow menu). This is what keeps
// per-channel affordance differences out of component code (docs §7).
//
// The display fields (`icon`, `label`, `disabled`, `className`) are inherited from
// `Menu.Item`: a `placement: 'menu'` option renders as a real `Menu.Item`, so the
// menu is lux's opinionated chrome, not a consumer re-implementation. The one field
// that can't mirror `Menu.Item` is the click handler — an option is declared once at
// provider scope but acts on a per-row message, so it takes `onSelect(message)` (the
// base binds it to `Menu.Item.onClick`) rather than a zero-arg `onClick`.
//
// Distinct from a **content** action (`MessageAction`, a button that is part of
// the message — a template button / inline keyboard).
export interface MessageOption extends Pick<MenuItemProps, 'icon' | 'label' | 'disabled' | 'className'> {

    type: string;                                   // 'react' | 'reply' | 'copy' | 'delete' | …

    placement: 'quick' | 'menu';                    // hover quick-row vs overflow menu

    // Required capability, checked against `ChatContext.capabilities` (absent
    // capabilities set ⇒ permissive; absent `capability` ⇒ always permitted).
    capability?: string;

    // Message-state gate (e.g. not on a tombstone, or only on own messages).
    applies?: (message: BaseMessage) => boolean;

    // Exactly one of the two: a fire-and-done handler (bound to `Menu.Item.onClick`),
    // or a component that opens its own UI (e.g. the reaction picker's emoji strip).
    onSelect?: (message: BaseMessage) => void;
    render?: ComponentType<{ message: BaseMessage }>;

}
