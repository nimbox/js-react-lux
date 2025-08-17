import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
import '../src/index.css';


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
