import classNames from 'classnames';
import { type ReactNode } from 'react';


export interface MessageActionsProps {
    children?: ReactNode;
    className?: string;
}

// The stacked row of action buttons under a bubble — a **pure push container**
// (like `Body` / `Header` / `Footer`). The instance fills it with
// `ChatActionButton` atoms; the base owns the row layout — a full-width divider
// above (bled to the bubble edges via `-mx-3`), then the buttons re-inset (`px-3`)
// and stacked with an even gap — never the actions themselves. Interpreting an
// action's kind is the consumer's job — there is no `actionRenderers` registry
// and no `MessageAction` type in the base.
export function MessageActions({ children, className }: MessageActionsProps) {

    if (children == null) {
        return null;
    }

    return (
        <div className={classNames('mt-1 -mx-3 px-3 pt-1 flex flex-col gap-1 border-t border-control-border', className)}>
            {children}
        </div>
    );

}
