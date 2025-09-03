import { type MessageData } from '../types/MessageData';
import { TemplateContextBlock, type TemplateContextBlockType, type TemplateContextData } from '../types/TemplateContextData';
import { type TemplateData } from '../types/TemplateData';


export function transformTemplate(template: TemplateData, context: TemplateContextData): MessageData {

    const blocks = (TemplateContextBlock).map((block) => {

        const blockData = template[block];
        if (!blockData || blockData.type !== 'text') {
            return undefined;
        }

        const result = Object.entries(context[block] || {}).reduce((a, [key, value]) => {
            if (value == null) { return a; }
            const trimmed = value.trim();
            if (trimmed.length === 0) { return a; }
            return a.replace(new RegExp(`{{${key}}}`, 'g'), trimmed);
        }, blockData.content.text);

        return [block, result];

    });

    const rendered = blocks.reduce((a, p) => {
        if (p == null) { return a; }
        const [block, value] = p;
        a[block as 'header' | 'body' | 'footer'] = value;
        return a;
    }, {} as Pick<MessageData, TemplateContextBlockType>);

    return {

        id: 'preview-message',
        direction: 'outbound',
        author: {} as any,

        type: 'template',
        ...rendered,

        timestamp: new Date().toISOString()

    };

}
