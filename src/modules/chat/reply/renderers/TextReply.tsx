import { Reply } from '../Reply';


export function TextReplyRenderer() {

    return (
        <Reply.Container>
            <Reply.Content>
                <Reply.Author />
                <Reply.Body />
            </Reply.Content>
        </Reply.Container>
    );

}
