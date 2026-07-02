import { Fragment } from 'react';
import { useChat } from '../../ChatContext';
import type { MessageAction } from '../../types/MessageAction';


export interface MessageActionsProps {
    actions?: MessageAction[];
}

// Renders a message's actions (a template's URL buttons, quick-replies) as a
// stacked list under the bubble. Unlike the pull-based `MessageButtons`, the
// actions arrive as a **prop** — the kit/consumer instance passes them in — so
// the base never reads them off the envelope. Each action dispatches to the
// `ChatContext` action registry for its `type`; an unknown type falls back to a
// plain label.
export function MessageActions({ actions }: MessageActionsProps) {

    const { actionRenderers } = useChat();

    if (!actions || actions.length === 0) {
        return null;
    }

    return (
        <div className="mt-1 -mx-3 -mb-2 divide-y divide-control-border border-t border-control-border">
            {actions.map((action, index) => {
                const render = actionRenderers[action.type];
                return (
                    <Fragment key={index}>
                        {render
                            ? render(action)
                            : (
                                <div className="block px-3 py-2 text-center text-sm font-medium text-gray-400">
                                    {action.text}
                                </div>
                            )}
                    </Fragment>
                );
            })}
        </div>
    );

}
