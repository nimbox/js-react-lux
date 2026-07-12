import { cn } from '../../../../components/utilities/cn';
import { useConversation } from '../ConversationContext';
import { ConversationOptions } from '../ConversationOptions';


// ConversationContainer — the row frame. Like `MessageFrame`, it owns the
// row's content-blind affordance: the option menu is a hover OVERLAY anchored to
// the `relative` row, top-right corner, `invisible group-hover:visible` — so it
// reserves no layout space and appears only on hover (docs §7). Its overflow menu
// portals out, so gating the trigger on hover is safe.

export interface ConversationContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function ConversationContainer({ children, className }: ConversationContainerProps) {

    const { selected } = useConversation();

    return (
        <div className={
            cn(
                'relative p-3 flex flex-row items-center gap-2 rounded-lg group',
                'hover:bg-secondary-100', {
                'bg-primary-100': selected
            }, className)
        }>

            {children}

            <div className="absolute top-2 right-2 z-20 invisible group-hover:visible">
                <ConversationOptions />
            </div>

        </div>
    );

}
