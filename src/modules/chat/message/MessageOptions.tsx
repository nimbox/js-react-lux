import { VerticalDotsIcon } from '@nimbox/icons-react';
import { Menu } from '../../../components/menu/Menu';
import { CHAT_ICON_TRIGGER } from '../utils/iconTrigger';
import { useMessage } from './MessageContext';
import { useMessageOptions } from './useMessageOptions';


// The base option chrome (docs §7) — the twin of `ConversationOptions`. It renders
// the gated options (`useMessageOptions`) under one opinionated vertical-dots
// `Menu`. Each option `resolve`s its `Menu.Item` values (label / icon / bound
// `onSelect`) from the message — so the base owns the menu, the consumer owns what
// each item says and does. Hidden entirely when there are no applicable options.
// Positioning and the hover reveal are owned by `MessageFrame` (the absolute
// overlay at the bubble's top-right corner).

export function MessageOptions() {

    const { message } = useMessage();
    const options = useMessageOptions(message);

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
                const item = option.resolve(message);
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
