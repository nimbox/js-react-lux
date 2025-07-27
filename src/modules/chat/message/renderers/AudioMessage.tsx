import { Message } from '../Message';


export function AudioMessageRenderer() {

    return (
        <Message.Container>
            <Message.Bubble>
                <Message.Author />
                <Message.Reply />
                <Message.Header />
                <Message.Audio />
                <Message.Body />
                <Message.Footer />
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}
