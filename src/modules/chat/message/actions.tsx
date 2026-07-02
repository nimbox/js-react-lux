import { type ReactNode } from 'react';
import type { CallPhoneNumberAction, CopyCodeAction, LinkAction, MessageAction } from '../types/MessageAction';


// Action renderers
//
// A message's actions (the buttons under a bubble) render through a registry
// keyed by `action.type`. The library ships the renderers below as defaults;
// an app overrides or extends them via `ChatProvider`'s `actionRenderers`, so a
// new action kind never requires editing the library.

export type ActionRenderer = (action: MessageAction) => ReactNode;

export type ActionRendererRegistry = Record<string, ActionRenderer>;

function label(text: string) {
    return (
        <span className="block px-3 py-2 text-center text-sm font-medium text-primary-500">
            {text}
        </span>
    );
}

export const defaultActionRenderers: ActionRendererRegistry = {

    // Non-link labels.

    'reply': (action) => <div>{label(action.text)}</div>,

    'call-channel': (action) => <div>{label(action.text)}</div>,

    // Links.

    'link': (action) => (
        <a href={(action as LinkAction).url} target="_blank" rel="noreferrer" className="block hover:bg-primary-50">
            {label(action.text)}
        </a>
    ),

    'call-phone-number': (action) => (
        <a href={`tel:${(action as CallPhoneNumberAction).phone}`} className="block hover:bg-primary-50">
            {label(action.text)}
        </a>
    ),

    'copy-code': (action) => (
        <button
            type="button"
            onClick={() => navigator.clipboard?.writeText((action as CopyCodeAction).code)}
            className="block w-full hover:bg-primary-50"
        >
            {label(action.text)}
        </button>
    )

};
