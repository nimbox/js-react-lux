import { ConversationProvider, type ConversationProviderProps } from '../ConversationProvider';


export function DefaultConversation(props: ConversationProviderProps) {

    return (
        <ConversationProvider {...props}>
            <ConversationProvider.Container>
                <ConversationProvider.Avatar className="text-3xl" />
                <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center gap-2">
                        <ConversationProvider.Name />
                        <ConversationProvider.Properties />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <ConversationProvider.Message />
                        <ConversationProvider.Meta />
                    </div>
                </div>
            </ConversationProvider.Container>
        </ConversationProvider>
    );

}
