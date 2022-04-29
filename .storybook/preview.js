import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
import '../src/index.css';
import { ViewportProvider } from '../src/hooks/useViewport';
import { TooltipProvider } from '../src/popper/TooltipProvider';


// export const parameters = {
//     options: {
//       storySort: (a, b) =>
//         a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
//     },
//   };

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

export const decorators = [
    (Story, context) => {
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
    }
];
