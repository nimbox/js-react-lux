import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '../src/locales';


// Storybook-local i18n setup. Initializes i18next with lux's bundled
// translations (the `resources` export from `src/locales`) so stories
// render translated strings directly — no HTTP backend or file
// copying, matching the `resources` approach documented in the
// README.

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources,
    ns: ['lux'],
    defaultNS: 'lux',
    react: { useSuspense: false },
    interpolation: { escapeValue: false }
});

export default i18n;
