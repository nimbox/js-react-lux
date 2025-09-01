import { ReplyProvider, type ReplyProps } from '../ReplyProvider';


export function TextReply(props: ReplyProps) {

    return (
        <ReplyProvider {...props}>
            <ReplyProvider.Container>
                <ReplyProvider.Content>
                    <ReplyProvider.Author />
                    <ReplyProvider.Body />
                </ReplyProvider.Content>
            </ReplyProvider.Container>
        </ReplyProvider>
    );

}
