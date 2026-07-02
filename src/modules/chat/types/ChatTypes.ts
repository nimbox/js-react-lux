// What a consumer plugs into the chat: its content vocabulary + its author type,
// as one bag. `content` is the map (type-key -> view); `author` is the consumer's
// author type. A `type` alias (not an `interface`) deliberately — only type-alias
// object types get the implicit index signature that satisfies
// `Record<string, unknown>`, so `T extends ChatTypes` holds. See §3.
export type ChatTypes = {
    author: unknown;
    content: Record<string, unknown>;
};
