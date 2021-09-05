import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    .use(HttpBackend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use({
        type: 'languageDetector',
        async: false,
        init: function () { },
        detect: function () { return 'en'; },
        cacheUserLanguage: function () { }
    })
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({

        fallbackLng: 'en',
        debug: true,

        react: {
            useSuspense: false
        },

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }

    });

export default i18n;
