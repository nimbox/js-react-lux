import { type Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
import '../src/index.css';


// The component-level Docs description. `react-docgen-typescript` splits a
// TSDoc comment into `description` (the summary) and `tags` (block tags like
// `@remarks`) rather than concatenating them — so without this, only the
// summary would reach the Docs page. Stitch them back into one block.
//
// Doc comments use plain backticked names (`` `Avatar` ``), not TSDoc
// `{@link}` tags — this toolchain has no TypeDoc-style resolver for them, so
// they'd only ever degrade to backticked text anyway, and TypeScript's own
// extraction normalizes them inconsistently on the way here.
function extractComponentDescription(component?: { __docgenInfo?: { description?: string; tags?: Record<string, string> } }): string {
    const info = component?.__docgenInfo;
    if (!info) {
        return '';
    }
    const parts = [info.description, info.tags?.remarks].filter((part): part is string => Boolean(part));
    return parts.join('\n\n');
}


export const globalTypes = {

    locale: {
        name: 'Locale',
        description: 'Locale to use for i18next translations',
        defaultValue: 'en',
        toolbar: {
            icon: 'flag',
            items: ['en', 'es'],
            showName: false,
        }
    }

};

const preview: Preview = {

    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        docs: {
            extractComponentDescription
        }
    },

    decorators: [
        (Story, context) => {
            useEffect(() => { i18n.changeLanguage(context.globals.locale); }, [context]);
            return (
                <I18nextProvider i18n={i18n}>
                    <Story />
                </I18nextProvider>
            );
        }]

};

export default preview;


{/* (Story, context) => {
        useEffect(() => { i18n.changeLanguage(context.globals.locale); } , [context]);
        return (
            <ViewportProvider>
                <TooltipProvider destinationSelector="#modal" tooltipClassName="max-w-sm text-md">
                    <I18nextProvider i18n={i18n} locale="en">
                        <DndProvider backend={HTML5Backend}>
                            <Story {...context}/>
                        </DndProvider>
                    </I18nextProvider>
                </TooltipProvider>
            </ViewportProvider>
        );
    } */}
