import { Conversation } from '../Conversation';


export function DefaultConversationRenderer() {

    return (
        <Conversation.Container>
            <Conversation.Avatar className="text-3xl"/>
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
    );

}
