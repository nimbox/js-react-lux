// An action rendered under a message bubble (e.g. a template's URL button, a
// quick-reply). Open by design: `type` keys the ChatContext action-renderer
// registry, so an app adds its own action kinds without touching this type. The
// library ships renderers for the variants declared below.
export interface MessageAction {
    type: string;
    text: string;
}

export interface ReplyAction extends MessageAction {
    type: 'reply';
}

export interface LinkAction extends MessageAction {
    type: 'link';
    url: string;
}

export interface CallChannelAction extends MessageAction {
    type: 'call-channel';
}

export interface CallPhoneNumberAction extends MessageAction {
    type: 'call-phone-number';
    phone: string;
}

export interface CopyCodeAction extends MessageAction {
    type: 'copy-code';
    code: string;
}
