# design-system

The Lux design system artifact (claude.ai, "Lux") is generated from this repository by `sync.mjs`. Everything it shows lives in the code:

| In the artifact | Comes from |
| --- | --- |
| Overview (README) | `src/stories/Lux.mdx` |
| Sections | Every other `src/stories/*.mdx` |
| Tokens and their notes | `src/styles/elegant.css` — a token's note is the one-line `/** … */` comment directly above it |
| Text scale and spacing unit | Tailwind's defaults at the 14px root, written in `sync.mjs` |
| Component cards | The TSDoc of each component exported from `src/index.ts`, and its `<Name>Props` interface |
| Cover | `design-system/cover.html` |

`node design-system/sync.mjs` writes the artifact's files to `design-system/out/project/`. `out/` is not committed.

## Where a decision is checked in

Every decision is a commit to this repository. The kind of decision sets the file.

| Decision | File |
| --- | --- |
| A colour, radius, size or spacing value | `src/styles/elegant.css`, with its `/** … */` note |
| A layout or composition rule | A Storybook standard: `src/stories/<Name>.mdx` with `<Meta title="Standards/…"/>`, plus `<Name>.stories.tsx` showing it |
| How a component is used | The component's TSDoc (summary, `@remarks`, and a comment on each prop) |
| A new component or primitive | `src/…/<Name>.tsx` with its TSDoc, and its stories |
| Something that does not meet the standards yet | `src/stories/KnownGaps.mdx` |

A standard states the rule in the present tense. The reasoning behind a choice belongs in the commit message, not in the page.

Commit messages for decisions start with `standard:` — for example `standard: list pages place search and filters in the band under the title`. `git log --grep '^standard:'` is the decision history.

## The loop

1. **Explore** in a Claude Design canvas. The canvas loads the Lux artifact, so it starts from what is committed here.
2. **Check in.** The chosen option is written into the files above. Review the diff and commit with `standard:`.
3. **Sync.** Run `node design-system/sync.mjs`, then ask Claude to publish `design-system/out/project/` to the Lux artifact. The next canvas sees the decision.
4. **Apply.** Applications follow the standards by reading this repository: `src/stories/*.mdx` and the stories next to them.

A decision that is only in a canvas, a chat or the artifact is not checked in.
