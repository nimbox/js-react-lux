import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import luxEn from '../src/locales/en/lux.json';
import luxEs from '../src/locales/es/lux.json';


// Storybook-local i18n setup. Embeds lux's translations straight from the
// JSON files, so stories render translated strings with no HTTP backend and
// no file copying. Hosts do the same from
// `@nimbox/js-react-lux/locales/<lng>/lux.json`, or fetch them.

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: { lux: luxEn },
        es: { lux: luxEs }
    },
    ns: ['lux'],
    defaultNS: 'lux',
    react: { useSuspense: false },
    interpolation: { escapeValue: false }
});

export default i18n;
