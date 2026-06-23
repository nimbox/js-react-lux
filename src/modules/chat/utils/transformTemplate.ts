import { type MessageButtonData, type MessageData } from '../types/MessageData';
import { TEMPLATE_CONTEXT_BLOCK, type TemplateContextBlockType, type TemplateContextData } from '../types/TemplateContextData';
import { type TemplateData } from '../types/TemplateData';


export function transformTemplate(template: TemplateData, context: TemplateContextData): MessageData {

    const blocks = (TEMPLATE_CONTEXT_BLOCK).map((block) => {

        const blockData = template[block];
        // `buttons` is an array, not a text block — handled separately below.
        if (!blockData || Array.isArray(blockData) || blockData.type !== 'text') {
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

    // Buttons — render each by type, substituting dynamic values from the flat
    // context.buttons map (e.g. b0p1).
    const buttonValues = context.buttons ?? {};
    const substitute = (text: string) => Object.entries(buttonValues).reduce((a, [key, value]) => {
        if (value == null) { return a; }
        const trimmed = value.trim();
        if (trimmed.length === 0) { return a; }
        return a.replace(new RegExp(`{{${key}}}`, 'g'), trimmed);
    }, text);

    const buttons: MessageButtonData[] = (template.buttons ?? []).map((button): MessageButtonData => {
        switch (button.type) {
            case 'reply':
                return { type: 'reply', text: button.text };
            case 'link':
                return { type: 'link', text: button.text, url: substitute(button.url) };
            case 'call-channel':
                return { type: 'call-channel', text: button.text };
            case 'call-phone-number':
                return { type: 'call-phone-number', text: button.text, phone: button.phone };
            case 'copy-code': {
                const name = button.context != null ? Object.keys(button.context)[0] : undefined;
                return { type: 'copy-code', text: button.text, code: name != null ? (buttonValues[name] ?? '') : '' };
            }
        }
    });

    return {

        id: 'preview-message',
        direction: 'outbound',
        author: {} as any,

        type: 'template',
        ...rendered,
        ...(buttons.length > 0 && { buttons }),

        timestamp: new Date().toISOString()

    };

}
