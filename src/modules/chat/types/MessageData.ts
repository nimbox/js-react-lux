import { type BaseMessage } from './BaseMessage';
import { type ChatTypes } from './ChatTypes';


// The consumer/kit's message type — a discriminated union keyed by `type`, with
// `content` narrowed per key, a typed `author`, and a typed `replyTo`. `T` bundles
// the content map and the author as one bindings type (`T['content']`,
// `T['author']`). Every `MessageData<T>` widens to `BaseMessage` (the base
// machinery's content-blind type), so the base names `BaseMessage` and stays
// content- and author-blind while the consumer keeps full narrowing. See §3.
export type MessageData<T extends ChatTypes> = {
    [K in keyof T['content'] & string]: Omit<BaseMessage, 'author' | 'type' | 'content' | 'replyTo'> & {
        author?: T['author'];
        type: K;
        content: T['content'][K];
        replyTo?: MessageData<T>;
    }
}[keyof T['content'] & string];
