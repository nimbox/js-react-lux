import { Conversation } from '../../conversation/Conversation';
import { ConversationProvider, type ConversationProviderProps } from '../../conversation/ConversationProvider';


/**
 * The core kit's default conversation row — the spread-and-go look,
 * parallel to `coreMessageRenderers` for messages.
 *
 * @remarks
 * Arranges the base `Conversation.*` slots (avatar on the left; name and
 * timestamp on top; the last-message preview and meta below) inside a
 * `ConversationProvider`. A row is one shape, not polymorphic, so there is
 * no registry — just this one instance. A consumer that wants a different
 * row composes the `Conversation` slots itself, exactly as it would author
 * a message instance.
 */
export function DefaultConversation(props: ConversationProviderProps) {

    return (
        <ConversationProvider {...props}>
            <Conversation.Container>
                <Conversation.Avatar className="text-3xl" />
                <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center gap-2">
                        <Conversation.Name />
                        <Conversation.Properties />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <Conversation.Message />
                        <Conversation.Meta />
                    </div>
                </div>
            </Conversation.Container>
        </ConversationProvider>
    );

}
