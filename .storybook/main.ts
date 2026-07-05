import type { StorybookConfig } from '@storybook/react-vite';


const config: StorybookConfig = {

  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: [{ from: "../src/locales", to: '/locales' }],

  addons: [
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  // TS-aware docgen: correctly separates a JSDoc/TSDoc summary from its
  // block tags (e.g. `@remarks`), instead of dumping the raw comment text.
  //
  // `tsconfigPath` must point at the app config, not the default
  // `tsconfig.json` — that file is solution-style (`files: []` +
  // `references`, see tsconfig.json), so its "program" contains zero
  // source files. Left at its default, the docgen plugin silently
  // matches nothing and returns no docs for ANY component, repo-wide.
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      tsconfigPath: "tsconfig.app.json"
    }
  }

};

export default config;
