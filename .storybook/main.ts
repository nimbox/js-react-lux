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
  typescript: {
    reactDocgen: "react-docgen-typescript"
  }

};

export default config;
