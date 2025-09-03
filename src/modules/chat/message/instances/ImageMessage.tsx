import { MessageProvider, type MessageProviderProps } from '../MessageProvider';
import type { MessageImageProps } from '../slots/MessageImage';


export function ImageMessage(props: MessageProviderProps & { extra?: MessageImageProps }) {

    const { extra, ...providerProps } = props;

    return (
        <MessageProvider {...providerProps}>
            <MessageProvider.Container>
                <MessageProvider.Bubble>
                    <MessageProvider.Author />
                    <MessageProvider.Reply />
                    <MessageProvider.Header />
                    <MessageProvider.Image {...extra} />
                    <MessageProvider.Body />
                    <MessageProvider.Footer />
                    <MessageProvider.Properties />
                </MessageProvider.Bubble>
            </MessageProvider.Container>
        </MessageProvider>
    );

}
