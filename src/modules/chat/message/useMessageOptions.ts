import { useChat } from '../ChatContext';
import type { BaseMessage } from '../types/BaseMessage';
import type { MessageOption } from '../types/MessageOption';


// The derivation seam: resolves the viewer options shown for a
// message — **requested ∩ permitted ∩ applicable** (docs §7).
// Requested = the consumer's `options` (default: the base set).
// Permitted = the option's `capability` is in `capabilities` (an
// absent set is permissive). Applicable = `applies(message)`.

export function useMessageOptions(message: BaseMessage): MessageOption[] {

    const { options, capabilities } = useChat();

    return options.filter(option =>
        (option.capability == null || capabilities == null || capabilities.has(option.capability)) &&
        (option.applies == null || option.applies(message))
    );

}
