// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import storybook from 'eslint-plugin-storybook'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'


// Fix the globals package bug where some global names
// have leading/trailing whitespace.
const cleanBrowserGlobals = Object.fromEntries(
  Object.entries(globals.browser).map(([key, value]) => [key.trim(), value])
);

export default tseslint.config([
  globalIgnores(['dist', 'storybook-static', 'src/sandbox']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // Use the flat-config variant: `configs['recommended-latest']` ships the
      // legacy eslintrc shape (`plugins: ['react-hooks']`), which aborts ESLint
      // flat config with a "plugins key defined as an array of strings" error.
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: cleanBrowserGlobals,
    },
    rules: {
      // The v7 `react-hooks` recommended config also enables the new
      // React-Compiler rule family. They are valuable but opinionated and
      // adopting them is a separate, larger initiative — keep them visible as
      // warnings rather than blocking CI until they are worked through.
      'react-hooks/refs': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      // HMR boundary hint; low value for a published library, keep non-blocking.
      'react-refresh/only-export-components': 'warn',
    },
  },
  ...storybook.configs['flat/recommended'],
]);
