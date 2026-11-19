// Builds the files of the Lux design system artifact from this repository.
//
//   node design-system/sync.mjs
//
// Output: design-system/out/project/ — tokens.json (values and notes from
// src/styles/elegant.css), README.md (src/stories/Lux.mdx), one section per
// other Storybook standard (src/stories/*.mdx), and components/<Name>/README.md
// from each component's TSDoc.
// The index (design-system.json) is not written here: it belongs to the
// artifact, and is updated by whoever publishes.

import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, copyFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const out = join(here, 'out', 'project');

const read = (p) => readFileSync(join(root, p), 'utf8');
const json = (p) => JSON.parse(read(p));

rmSync(join(here, 'out'), { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// ----- Tokens: values and notes from elegant.css -----------------------------
//
// A token's note is a one-line `/** … */` comment on the line directly above
// its declaration. Other comments are prose for the reader of the file.

const css = read('src/styles/elegant.css');
const theme = css.slice(css.indexOf('@theme'), css.indexOf('@utility'));
const vars = new Map();
const notes = new Map();
let pending = null;
for (const line of theme.split('\n')) {
    const doc = /^\s*\/\*\*\s*(.*?)\s*\*\/\s*$/.exec(line);
    const decl = /^\s*--([a-z0-9-]+)\s*:\s*([^;]+);/i.exec(line);
    if (doc) { pending = doc[1]; continue; }
    if (decl) {
        vars.set(decl[1], decl[2].trim());
        if (pending) notes.set(decl[1], pending);
    }
    pending = null;
}

const palette = /^color-(primary|secondary|info|danger)-(\d+)$/;
const note = (name) => notes.get(name)
    ?? (palette.test(name) ? name.replace(palette, (_, p, s) => `${p[0].toUpperCase()}${p.slice(1)} palette, step ${s}.`) : 'Defined in src/styles/elegant.css.');
const literal = (value) => value.replace(/var\(--([a-z0-9-]+)\)/gi, (_, n) => literal(vars.get(n) ?? ''));

// What Tailwind supplies and elegant.css does not override: the text scale
// and the spacing unit, read at the 14px root.
const base = {
    type: {
        fonts: [],
        families: { sans: 'ui-sans-serif, system-ui, sans-serif' },
        groups: [{
            name: 'Text', family: 'sans', styles: [
                { name: 'text-1xs', fontSize: '0.625rem', lineHeight: '0.875rem', fontWeight: 400, usage: '8.75px. Lux addition (--text-1xs); micro labels only.' },
                { name: 'text-xs', fontSize: '0.75rem', lineHeight: '1rem', fontWeight: 400, usage: '10.5px.' },
                { name: 'text-sm', fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 400, usage: '12.25px. Dense tables, captions.' },
                { name: 'text-base', fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 400, usage: '14px, the root. Body and controls.' },
                { name: 'text-lg', fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: 400, usage: '15.75px.' },
                { name: 'text-xl', fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 400, usage: '17.5px.' },
                { name: 'text-2xl', fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 400, usage: '21px.' }
            ]
        }]
    },
    spacing: {
        note: 'Tailwind v4 spacing: every p-*, m-*, gap-* is a multiple of --spacing (0.25rem = 3.5px at the 14px root).',
        tokens: [{ name: 'spacing', value: '0.25rem', usage: 'Base unit (Tailwind default). p-4 = 1rem = 14px.' }]
    },
    radiusNote: 'A scale of curves, about twice Tailwind\'s, plus four role names the library draws with.'
};

const color = [], radius = [], spacing = [...base.spacing.tokens], stroke = [], skipped = [];
for (const [name, value] of vars) {
    if (name.startsWith('color-')) {
        const alias = /^var\(--(color-[a-z0-9-]+)\)$/i.exec(value);
        if (alias) color.push({ name, value: `{${alias[1]}}`, usage: note(name) });
        else if (/^#[0-9a-f]{3,8}$/i.test(value)) color.push({ name, value: value.toLowerCase(), usage: note(name) });
        else skipped.push(name);
    } else if (name === 'radius' || name.startsWith('radius-')) {
        radius.push({ name, value: literal(value), usage: note(name) });
    } else if (name.startsWith('spacing-')) {
        spacing.push({ name, value, usage: note(name) });
    } else if (name.startsWith('stroke-')) {
        stroke.push({ name, value, usage: note(name) });
    } else if (!name.startsWith('text-')) {
        skipped.push(name);
    }
}

const sha = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim();
const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: root }).toString().trim();
const dirty = execSync('git status --porcelain', { cwd: root }).toString().trim() !== '';

const tokens = {
    name: 'Lux',
    version: 1,
    meta: {
        source: 'github',
        repo: 'nimbox/js-react-lux',
        ref: `${branch}@${sha}${dirty ? '+uncommitted' : ''}`,
        package: '.',
        paths: { tokens: ['src/styles/elegant.css'], docs: ['src/stories', 'design-system'] },
        synced: new Date().toISOString().slice(0, 10)
    },
    color: { themes: [{ id: 'light', name: 'Light' }], tokens: color },
    type: base.type,
    spacing: { note: base.spacing.note, tokens: spacing },
    radius: { note: base.radiusNote, tokens: radius },
    stroke: { tokens: stroke }
};
writeFileSync(join(out, 'tokens.json'), JSON.stringify(tokens, null, 1));

// ----- README and sections ---------------------------------------------------


// A standard is an .mdx page in src/stories. Imports, <Meta>, <Story> and the
// live JSX demos are dropped; the prose, tables and code fences stay.
function mdxToMarkdown(mdx) {
    const lines = mdx.split('\n');
    const kept = [];
    let depth = 0;
    let fence = false;
    for (const line of lines) {
        if (line.trim().startsWith('```')) fence = !fence;
        if (fence || line.trim().startsWith('```')) { if (depth === 0) kept.push(line); continue; }
        if (depth === 0 && /^import\s/.test(line)) continue;
        const opens = (line.match(/<[A-Za-z][^>]*[^/]>|<[A-Za-z]>/g) ?? []).length;
        const closes = (line.match(/<\/[A-Za-z][^>]*>/g) ?? []).length;
        const selfClosing = /^\s*<[A-Za-z][^>]*\/>\s*$/.test(line);
        if (depth === 0 && selfClosing) continue;
        if (depth > 0 || (opens > 0 && /^\s*</.test(line))) {
            depth += opens - closes;
            if (depth < 0) depth = 0;
            continue;
        }
        kept.push(line.replace(/<Story of=\{[^}]*\}\s*\/>/g, '(see the story in Storybook)'));
    }
    return kept.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

// Lux.mdx is the overview and becomes the README; every other page is a section.
writeFileSync(join(out, 'README.md'), mdxToMarkdown(read('src/stories/Lux.mdx')));

const sections = readdirSync(join(root, 'src/stories')).filter((f) => f.endsWith('.mdx') && f !== 'Lux.mdx').sort();
for (const file of sections) {
    const md = mdxToMarkdown(read(join('src/stories', file)));
    writeFileSync(join(out, `standard-${basename(file, '.mdx').toLowerCase()}.md`), md);
}

// ----- Components: their TSDoc and props, read from src/index.ts -------------
//
// A component gets a card when it is exported from src/index.ts under a
// PascalCase name and carries a TSDoc comment. The card is the comment
// (summary and @remarks, as Storybook shows it) and the documented members of
// its `<Name>Props` interface.

const program = ts.createProgram([join(root, 'src/index.ts')], {
    jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler, skipLibCheck: true, noEmit: true
});
const checker = program.getTypeChecker();
const entry = checker.getSymbolAtLocation(program.getSourceFile(join(root, 'src/index.ts')));
const text = (parts) => ts.displayPartsToString(parts).trim();

const documented = [];
for (const exported of checker.getExportsOfModule(entry)) {
    const name = exported.getName();
    if (!/^[A-Z]/.test(name) || name.endsWith('Context') || name.endsWith('Props')) continue;
    const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
    if (!(symbol.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Variable))) continue;
    const summary = text(symbol.getDocumentationComment(checker));
    if (!summary) continue;
    const remarks = symbol.getJsDocTags(checker).filter((t) => t.name === 'remarks').map((t) => text(t.text ?? []));
    const declaration = symbol.declarations?.[0];
    const source = declaration ? declaration.getSourceFile().fileName.replace(root + '/', '') : '';

    const props = [];
    const propsSymbol = checker.getExportsOfModule(entry).find((s) => s.getName() === `${name}Props`);
    if (propsSymbol) {
        const propsType = checker.getDeclaredTypeOfSymbol(propsSymbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(propsSymbol) : propsSymbol);
        for (const prop of propsType.getProperties()) {
            const decl = prop.declarations?.[0];
            if (!decl || decl.getSourceFile().fileName.includes('node_modules')) continue;
            const optional = prop.flags & ts.SymbolFlags.Optional ? '?' : '';
            const type = decl.type ? decl.type.getText() : checker.typeToString(checker.getTypeOfSymbol(prop));
            const doc = text(prop.getDocumentationComment(checker));
            props.push(`| \`${prop.getName()}${optional}\` | \`${type.replace(/\|/g, '\\|').replace(/\s+/g, ' ')}\` | ${doc.replace(/\n+/g, ' ')} |`);
        }
    }

    const body = [summary, ...remarks];
    if (props.length) body.push('## Props', '| Prop | Type | |', '| --- | --- | --- |', ...props);
    body.push(`Source: \`${source}\``);
    const dir = join(out, 'components', name);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'README.md'), body.join('\n\n').replace(/\n\n(\| )/g, '\n$1').replace(/\n{3,}/g, '\n\n') + '\n');
    documented.push(name);
}

// ----- Cover -----------------------------------------------------------------

mkdirSync(join(out, 'components', 'Cover'), { recursive: true });
copyFileSync(join(here, 'cover.html'), join(out, 'components', 'Cover', 'preview.html'));

console.log(`Lux design system from ${tokens.meta.ref}: ${color.length} colors, ${radius.length} radii, ${spacing.length} spacing, ${sections.length} standards, ${documented.length} components.`);
if (skipped.length) console.log(`Not placed: ${skipped.join(', ')}`);
