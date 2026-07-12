# js-react-lux

A React + Tailwind CSS v4 component library.

## Using lux in your application

lux ships design **tokens**, not prebuilt utility classes — its components are
compiled by **your** Tailwind build. That means lux automatically inherits your
theme (colors, border radius, spacing, the base `rem`), but it also means every
consumer must wire up three things once:

1. **Peer dependencies**
2. **Styles + Tailwind scanning**
3. **Translations (i18n)**

After that, pick **one of three lanes** for where lux's code is resolved from —
plain, yalc, or a Vite alias.

### 1. Peer dependencies

lux declares these as peer dependencies; install them in your app alongside a
Tailwind CSS v4 toolchain:

```bash
npm install @nimbox/js-react-lux react react-dom dayjs lodash-es
```

### 2. Styles + Tailwind scanning

In your CSS entry (e.g. `src/index.css`):

```css
@import "tailwindcss";
@import "@nimbox/js-react-lux/styles/elegant.css";  /* lux theme tokens + base rem */
@config "./tailwind.config.ts";                     /* path is relative to THIS file */
```

`elegant.css` defines lux's theme via Tailwind's `@theme` and sets the root
font-size (the base `rem`). Override anything by adding your own `@theme { … }`
**after** that import:

```css
@theme {
    --radius-lg: 0.75rem;             /* rounded-lg everywhere, including lux */
    --spacing: 0.25rem;               /* base unit for p-*, m-*, gap-* */
    --color-control-border: #d0d0d0;
}
```

Tailwind must scan lux's files to generate the utility classes its components
use. lux's package `exports` do not expose a scannable glob, so resolve the
package by module resolution — this works no matter where npm or yalc places it:

```ts
// tailwind.config.ts
import { createRequire } from 'module';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const luxDist = dirname(require.resolve('@nimbox/js-react-lux'));

export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
        join(luxDist, '**/*.{js,jsx,ts,tsx}')
    ]
};
```

### 3. Translations (i18n)

lux components call `react-i18next` internally with inline English defaults.
Initialize a single i18n instance before rendering; no locale files are required
to get started:

```ts
// src/i18n.ts — import once from your entry point: `import './i18n'`
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
    react: { useSuspense: false },
    interpolation: { escapeValue: false }
});

export default i18n;
```

This is enough to run in English — **no locale files are required.**

#### Optional — load lux's translations

lux renders in English via inline defaults with no locale files at all (step 3).
Load lux's shipped translations only if you want the curated strings or another
language. Pick the approach that matches your scale.

##### Bundle every language (simplest)

Import the `./locales` export and pass it to `init` — every language ships in
your JS bundle. Good for a small, fixed set of languages.

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '@nimbox/js-react-lux/locales';   // { en: { lux }, es: { lux } }

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
```

Merge with your own strings by extending the object
(e.g. `{ en: { ...resources.en, translation: myEn }, ... }`).

##### Lazy-load per language (recommended for the primary application)

At scale you don't want every language in the JS bundle. lux also ships its raw
files at `dist/locales/{lng}/lux.json`; serve them and let `i18next-http-backend`
fetch **only the active language's** `lux` namespace, on demand. If your app
already loads its own strings over an HTTP backend, you only need to make lux's
files available at the same `/locales/{{lng}}/{{ns}}.json` path — lux's `lux`
namespace then loads exactly like your own namespaces.

**1. Serve lux's locale files.** Copy them into your static `public/locales` on
dev *and* build. Resolve lux with `require.resolve` (hoist-independent);
`copySync` merges, so lux's `lux.json` lands beside your own namespace files
without clobbering them:

```ts
// vite.config.ts — add copyLuxLocales() to your `plugins` array
import { createRequire } from 'module';
import { dirname, resolve } from 'path';
import fsExtra from 'fs-extra';               // npm install -D fs-extra

const require = createRequire(import.meta.url);

function copyLuxLocales() {
    return {
        name: 'copy-lux-locales',
        buildStart() {
            const source = resolve(dirname(require.resolve('@nimbox/js-react-lux')), 'locales');
            fsExtra.copySync(source, resolve(__dirname, 'public/locales'), { overwrite: true });
        }
    };
}
```

**2. Load with `i18next-http-backend`** (`npm install i18next-http-backend`),
replacing the init from step 3:

```ts
import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n.use(HttpBackend).use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['lux'],
    defaultNS: 'lux',
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },   // fetches /locales/en/lux.json, etc.
    react: { useSuspense: false },
    interpolation: { escapeValue: false }
});

export default i18n;
```

Now only `/locales/<active-language>/lux.json` is fetched — switching language
loads that language on demand, and no unused language ships in your bundle. To
defer the `lux` namespace until a lux component first renders (rather than at
init), drop `'lux'` from `ns` and let react-i18next load it on demand. Add
`public/locales` to `.gitignore` — it's generated.

> lux mostly reads from the **default** namespace, so keep `defaultNS: 'lux'` on
> the i18next instance lux uses. If your app needs its own default namespace,
> reference it explicitly instead (`useTranslation('yourNamespace')`).

### Using components

```tsx
import { Button } from '@nimbox/js-react-lux';

export function Example() {
    return <Button>Save</Button>;
}
```

---

## Resolution lanes

Choose one lane for where lux is loaded from. The setup above (styles, Tailwind
config, i18n) is identical for all three.

### Lane 1 — Plain (npm registry)

The default. Install and use the published package:

```bash
npm install @nimbox/js-react-lux
```

Nothing further — this is what you build and ship with.

### Lane 2 — yalc (test an unpublished lux build)

Loads a locally built lux into your app without publishing to the registry.
Requires the `yalc` CLI (`npm install -g yalc`).

In the **lux** repo, push local builds:

```bash
npm run build && yalc publish   # one-shot
npm run build:watch:yalc        # rebuild + `yalc push` on every change
```

In your **app**:

```bash
yalc add @nimbox/js-react-lux
npm install
```

Restart the dev server / rebuild to pick up pushes. The `require.resolve`
Tailwind config already points at the yalc copy — no changes needed. To return
to the registry version:

```bash
yalc remove @nimbox/js-react-lux
npm install
```

### Lane 3 — Vite alias (hot-reload lux source)

Serves lux from **source** for live reload while developing lux and your app
together. Serve-only — it does not affect `vite build` or `tsc`.

```ts
// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            // one entry resolves every subpath (., /figures, /modules/*,
            // /styles/elegant.css) because the src layout mirrors the exports.
            '@nimbox/js-react-lux': resolve(__dirname, '../path/to/js-react-lux/src')
        },
        dedupe: ['react', 'react-dom']   // prevents a second React copy (breaks hooks)
    },
    optimizeDeps: {
        exclude: ['@nimbox/js-react-lux']
    }
});
```

To also pick up Tailwind classes you add while editing lux source, add the lux
`src` directory to your Tailwind `content` array.
