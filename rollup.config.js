import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import filesize from 'rollup-plugin-filesize';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';


export default [{

    input: 'src/index.ts',
    output: [{
        file: 'dist/index.cjs',
        format: 'cjs',
        exports: 'named',
        sourcemap: true
    }, {
        file: 'dist/index.mjs',
        format: 'es',
        exports: 'named',
        sourcemap: true
    }],

    plugins: [

        peerDepsExternal({ includeDependencies: true }),
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

        filesize()

    ]

}, {

    input: 'src/icons/components/index.ts',
    output: [{
        file: 'dist/icons/index.cjs',
        format: 'cjs',
        exports: 'named',
        sourcemap: true
    }, {
        file: 'dist/icons/index.mjs',
        format: 'es',
        exports: 'named',
        sourcemap: true
    }],

    plugins: [

        peerDepsExternal({ includeDependencies: true }),
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
        file: 'dist/figures/index.cjs',
        format: 'cjs',
        exports: 'named',
        sourcemap: true
    }, {
        file: 'dist/figures/index.mjs',
        format: 'es',
        exports: 'named',
        sourcemap: true
    }],

    plugins: [

        peerDepsExternal({ includeDependencies: true }),
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

        filesize(),

    ]

}, {

    input: 'src/styles/elegant.js',
    output: [{
        file: 'dist/styles/elegant.cjs',
        format: 'cjs',
        exports: 'named',
        sourcemap: true
    }, {
        file: 'dist/styles/elegant.mjs',
        format: 'es',
        exports: 'named',
        sourcemap: true
    }],

    plugins: [

        peerDepsExternal({ includeDependencies: true }),
        resolve(),
        commonjs(),

        filesize()

    ]

}];