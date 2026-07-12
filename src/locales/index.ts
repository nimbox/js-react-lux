import type { Resource } from 'i18next';
import en from './en/lux.json';
import es from './es/lux.json';

// lux's translations in i18next's `resources` shape: language ->
// namespace -> keys. lux's strings live in the `lux` namespace.
// Consumers pass this straight to `i18n.init({ resources })` — no
// file copying or HTTP backend needed.

export const resources: Resource = {
    en: { lux: en },
    es: { lux: es }
};
