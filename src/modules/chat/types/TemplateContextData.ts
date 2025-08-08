export const TemplateContextBlock = ['header', 'body', 'footer'] as const;
export type TemplateContextBlockType = typeof TemplateContextBlock[number];
export type TemplateContextData = Record<TemplateContextBlockType, Record<string, string>>;
