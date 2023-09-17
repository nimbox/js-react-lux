import filesize from 'rollup-plugin-filesize';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import { createRequire } from 'node:module';


const requireFile = createRequire(import.meta.url);
const pack = requireFile('./package.json');

export default [{

    input: 'src/index.ts',
    output: [{
        file: 'dist/index.mjs',
        format: 'esm',
        exports: 'named',
        sourcemap: true
    }],

    // external: [
    //     ...Object.keys(pack.dependencies || {}),
    //     ...Object.keys(pack.peerDependencies || {})
    // ],

    plugins: [

        peerDepsExternal(),
        resolve(),
        commonjs(),

        json(),

        typescript({
            exclude: ['src/icons', 'src/figures', 'src/styles', '**/test', '**/stories', '**/*.stories.tsx', 'src/i18n.tsx']
        }),

        postcss({
            extensions: ['.css']
        }),

        copy({
            targets: [{
                src: 'src/locales/*',
                dest: 'dist/locales'
            }]
        }),

        filesize(),

    ]

}, {

    input: 'src/icons/components/index.ts',
    output: [{
        file: 'dist/icons/index.mjs',
        format: 'esm',
        exports: 'named',
        sourcemap: true
    }],

    // external: [
    //     ...Object.keys(pack.dependencies || {}),
    //     ...Object.keys(pack.peerDependencies || {})
    // ],

    plugins: [

        peerDepsExternal(),
        resolve(),
        commonjs(),

        json(),

        typescript({
            compilerOptions: {
                declarationDir: 'dist/icons/typings'
            },
            include: ['src/icons/components/**/*'],
            exclude: ['stories/**/*', '**/*.stories.tsx', 'src/i18n.tsx']
        }),

        postcss({
            extensions: ['.css']
        }),

        filesize()

    ]

}, {

    input: 'src/figures/index.ts',
    output: [{
        file: 'dist/figures/index.mjs',
        format: 'esm',
        exports: 'named',
        sourcemap: true
    }],

    // external: [
    //     ...Object.keys(pack.dependencies || {}),
    //     ...Object.keys(pack.peerDependencies || {})
    // ],

    plugins: [

        peerDepsExternal(),
        resolve(),
        commonjs(),

        json(),

        typescript({
            compilerOptions: {
                declarationDir: 'dist/figures/typings'
            },
            include: ['src/figures/**/*'],
            exclude: ['stories/**/*', '**/*.stories.tsx', 'src/i18n.tsx']
        }),

        postcss({
            extensions: ['.css']
        }),

        filesize()

    ]

}, {

    input: 'src/styles/elegant.js',
    output: [{
        dir: 'dist/styles',
        format: 'cjs',
        exports: 'named',
        sourcemap: true
    }],

    // external: [
    //     ...Object.keys(pack.dependencies || {}),
    //     ...Object.keys(pack.peerDependencies || {})
    // ],

    plugins: [

        peerDepsExternal(),
        resolve(),
        commonjs(),

        copy({
            targets: [{
                src: ['src/styles/**/*', '!src/styles/elegant.js'],
                dest: 'dist/styles'
            }]
        }),

        filesize()

    ]

}];