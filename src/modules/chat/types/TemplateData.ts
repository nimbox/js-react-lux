export interface TemplateData {

    name: string;
    description?: string;

    header?: TemplateBlockData;
    body?: TemplateBlockData;
    footer?: TemplateBlockData;

    buttons?: TemplateButtonData[];

}

export type TemplateBlockData = TemplateTextBlockData;

export interface TemplateTextContextData {
    required: boolean;
    example?: string;
}

export interface TemplateTextBlockData {

    type: 'text';
    content: {
        text: string;
        context?: Record<string, TemplateTextContextData>;
    }

}

// A single template button — discriminated by `type` (channel-neutral). `reply`,
// `call-channel`, `call-phone-number` are static; `link` (when its URL has
// a {{name}} variable) and `copy-code` are dynamic and declare their variables in
// `context` so the panel can render inputs for them.
export type TemplateButtonData =
    | TemplateReplyButtonData
    | TemplateLinkButtonData
    | TemplateCallChannelButtonData
    | TemplateCallPhoneNumberButtonData
    | TemplateCopyCodeButtonData;

export interface TemplateReplyButtonData {
    type: 'reply';
    text: string;
}

export interface TemplateLinkButtonData {
    type: 'link';
    text: string;
    url: string;
    context?: Record<string, TemplateTextContextData>;
}

export interface TemplateCallChannelButtonData {
    type: 'call-channel';
    text: string;
}

export interface TemplateCallPhoneNumberButtonData {
    type: 'call-phone-number';
    text: string;
    phone: string;
}

export interface TemplateCopyCodeButtonData {
    type: 'copy-code';
    text: string;
    context?: Record<string, TemplateTextContextData>;
}
