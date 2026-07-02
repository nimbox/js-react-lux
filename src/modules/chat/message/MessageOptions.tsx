import { VerticalDotsIcon } from '@nimbox/icons-react';
import { Menu } from '../../../components/menu/Menu';
import { useMessage } from './MessageContext';
import { useMessageOptions } from './useMessageOptions';


// The base option chrome (docs §7): a consistent affordance surface
// the base owns for *every* message type. It renders the gated
// options (`useMessageOptions`) as a hover quick-row plus an overflow
// menu — `placement: 'quick'` sits inline, `placement: 'menu'`
// collapses under the vertical-dots trigger. An option either opens
// its own UI (`render`, e.g. the reaction picker) or fires
// `onSelect`. The consumer owns *which* options and *what each does*;
// the base owns the layout.

export function MessageOptions() {

    const { message } = useMessage();
    const options = useMessageOptions(message);

    const quickOptions = options.filter((option) => option.placement === 'quick');
    const menuOptions = options.filter((option) => option.placement === 'menu');

    if (quickOptions.length === 0 && menuOptions.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-row items-center gap-1">

            {quickOptions.map((option) => {

                if (option.render) {
                    const Render = option.render;
                    return <Render key={option.type} message={message} />;
                }

                return (
                    <button
                        key={option.type}
                        type="button"
                        title={option.label}
                        onClick={() => option.onSelect?.(message)}
                        className="p-2 bg-white/90 shadow rounded-full cursor-pointer text-gray-500 hover:text-gray-700"
                    >
                        {option.icon}
                    </button>
                );

            })}

            {menuOptions.length > 0 && (
                <Menu
                    withPlacement="bottom-end"
                    trigger={
                        <button
                            type="button"
                            className="p-2 bg-white/90 shadow rounded-full cursor-pointer text-gray-500 hover:text-gray-700"
                        >
                            <VerticalDotsIcon className="w-5 h-5" />
                        </button>
                    }
                >
                    {menuOptions.map((option) => (
                        <Menu.Item
                            key={option.type}
                            icon={option.icon}
                            label={option.label}
                            disabled={option.disabled}
                            className={option.className}
                            onClick={() => option.onSelect?.(message)}
                        />
                    ))}
                </Menu>
            )}

        </div>
    );

}
