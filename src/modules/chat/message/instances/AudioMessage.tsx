import { MessageProvider, type MessageProviderProps } from '../MessageProvider';


export function AudioMessage(props: MessageProviderProps) {

    return (
        <MessageProvider {...props}>
            <MessageProvider.Container>
                <MessageProvider.Bubble>
                    <MessageProvider.Author />
                    <MessageProvider.Reply />
                    <MessageProvider.Header />
                    <MessageProvider.Audio />
                    <MessageProvider.Body />
                    <MessageProvider.Footer />
                    <MessageProvider.Properties />
                </MessageProvider.Bubble>
            </MessageProvider.Container>
        </MessageProvider>
    );

}
