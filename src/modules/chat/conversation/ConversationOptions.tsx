import { VerticalDotsIcon } from '@nimbox/icons-react';
import { Menu } from '../../../components/menu/Menu';
import { CHAT_ICON_TRIGGER } from '../utils/iconTrigger';
import { useConversation } from './ConversationContext';
import { useConversationOptions } from './useConversationOptions';


// The base option chrome for a conversation row — the twin of
// `MessageOptions` (docs §7). It renders the gated options
// (`useConversationOptions`) under one opinionated vertical-dots
// `Menu`. Each option `resolve`s its `Menu.Item` values (label / icon
// / bound `onSelect`) from the row — so the base owns the menu, the
// consumer owns what each item says and does. Hidden entirely when
// there are no applicable options. Positioning and the hover reveal
// are owned by `ConversationContainer` (the absolute overlay), the way
// `MessageContainer` positions `MessageOptions`.

export function ConversationOptions() {

    const { conversation } = useConversation();
    const options = useConversationOptions(conversation);

    if (options.length === 0) {
        return null;
    }

    return (
        <Menu
            withPlacement="bottom-end"
            trigger={
                <button
                    type="button"
                    className={CHAT_ICON_TRIGGER}
                >
                    <VerticalDotsIcon className="w-4 h-4" />
                </button>
            }
        >
            {options.map((option) => {
                const item = option.resolve(conversation);
                return (
                    <Menu.Item
                        key={option.type}
                        icon={item.icon}
                        label={item.label}
                        disabled={item.disabled}
                        className={item.className}
                        onClick={item.onSelect}
                    />
                );
            })}
        </Menu>
    );

}
