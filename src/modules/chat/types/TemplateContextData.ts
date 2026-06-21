export const TEMPLATE_CONTEXT_BLOCK = ['header', 'body', 'footer', 'buttons'] as const;
export type TemplateContextBlockType = typeof TEMPLATE_CONTEXT_BLOCK[number];
export type TemplateContextData = Record<TemplateContextBlockType, Record<string, string>>;
