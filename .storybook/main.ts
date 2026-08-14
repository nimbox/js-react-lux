import type { StorybookConfig } from '@storybook/react-vite';


/**
 * One sidebar section: the stories in a directory and the doc pages beside
 * them, both carrying the same title prefix.
 */
const section = (directory: string, titlePrefix: string) => [
  { directory, files: '**/*.mdx', titlePrefix },
  { directory, files: '**/*.stories.@(js|jsx|mjs|ts|tsx)', titlePrefix }
];

/**
 * Components that live under `src/components` but are not part of the library:
 * `index.ts` exports none of them. Four are numbered drafts of a picker that
 * already ships, and two are superseded selects.
 *
 * They keep their stories, and their stories keep sitting beside them — they
 * are still worked on. They are only shown under `Sandbox`, so the sidebar
 * says what is a component and what is an attempt at one.
 */
const drafts = 'DatePicker0|DatePicker1|TimePicker1|TimePicker2|CustomSelect|CustomMultiSelect';

const config: StorybookConfig = {

  // Each source directory maps to a sidebar section, so where a story lands is
  // decided here rather than in ninety `title` fields.
  //
  // `titlePrefix` is *prepended* to a story's own `title`, not overridden by
  // it — so a title says only where the story sits inside its section. That is
  // what puts the chat stories, which title themselves `Chat/...`, under
  // `Modules/Chat`.
  //
  // Two rules follow, and both have bitten:
  // - Every directory holding stories must be listed. One left out is a set of
  //   stories that silently vanishes from the sidebar.
  // - `.mdx` needs the same prefix as the stories beside it. Matched by a bare
  //   glob instead, an unattached doc page auto-titles from its path and
  //   strands itself in a lowercase section of its own.
  stories: [
    "../src/*.mdx",
    "../src/stories/*.mdx",
    { directory: "../src/components", files: "**/*.mdx", titlePrefix: "Components" },
    { directory: "../src/components", files: `**/!(${drafts}).stories.@(js|jsx|mjs|ts|tsx)`, titlePrefix: "Components" },
    { directory: "../src/components", files: `**/@(${drafts}).stories.@(js|jsx|mjs|ts|tsx)`, titlePrefix: "Sandbox" },
    ...section("../src/figures", "Figures"),
    ...section("../src/hooks", "Hooks"),
    ...section("../src/layouts", "Layout"),
    ...section("../src/modules", "Modules"),
    ...section("../src/sandbox", "Sandbox")
  ],
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
      tsconfigPath: "tsconfig.app.json",
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => !/node_modules/.test(prop.parent?.fileName ?? '')
    }
  }

};

export default config;
