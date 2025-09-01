import { MessageProvider, type MessageProviderProps } from '../MessageProvider';


export function StickerMessage(props: MessageProviderProps) {

    return (
        <MessageProvider {...props}>
            <MessageProvider.Container>
                <MessageProvider.FloatingAttachments />
                <MessageProvider.Bubble>
                    <MessageProvider.Author />
                    <MessageProvider.Reply />
                    <MessageProvider.Header />
                    <MessageProvider.Body />
                    <MessageProvider.Footer />
                    <MessageProvider.Properties />
                </MessageProvider.Bubble>
            </MessageProvider.Container>
        </MessageProvider>
    );

}
