export interface TemplateData {

    name: string;
    description?: string;

    header?: TemplateBlockData;
    body?: TemplateBlockData;
    footer?: TemplateBlockData;

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
