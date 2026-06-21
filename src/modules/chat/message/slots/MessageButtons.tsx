import { useMessage } from '../MessageContext';


// Renders a message's buttons (e.g. a template's URL buttons, already rendered)
// as a stacked list under the bubble.
export function MessageButtons() {

    const { message: { buttons } } = useMessage();

    if (!buttons || buttons.length === 0) {
        return null;
    }

    return (
        <div className="mt-1 -mx-3 -mb-2 divide-y divide-control-border border-t border-control-border">
            {buttons.map((button, index) => {

                const label = (
                    <span className="block px-3 py-2 text-center text-sm font-medium text-primary-500">
                        {button.text}
                    </span>
                );

                switch (button.type) {

                    // reply / call-channel are non-link labels.
                    case 'reply':
                        return <div key={index}>{label}</div>;

                    case 'call-channel':
                        return <div key={index}>{label}</div>;

                    case 'visit-website':
                        return (
                            <a key={index} href={button.url} target="_blank" rel="noreferrer" className="block hover:bg-primary-50">
                                {label}
                            </a>
                        );

                    case 'call-phone-number':
                        return (
                            <a key={index} href={`tel:${button.phone}`} className="block hover:bg-primary-50">
                                {label}
                            </a>
                        );

                    case 'copy-code':
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => navigator.clipboard?.writeText(button.code)}
                                className="block w-full hover:bg-primary-50"
                            >
                                {label}
                            </button>
                        );

                    default:
                        return (
                            <div key={index} className="block px-3 py-2 text-center text-sm font-medium text-gray-400">
                                Something off
                            </div>
                        );

                }

            })}
        </div>
    );

}
