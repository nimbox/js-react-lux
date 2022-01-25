/* eslint-disable import/no-anonymous-default-export */
import filesize from 'rollup-plugin-filesize';
import copy from 'rollup-plugin-copy';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import pack from './package.json';


export default [{

    input: 'src/index.ts',
    output: [{
        dir: 'dist/',
        format: 'esm',
        exports: 'named',
        sourcemap: true
    }],

    external: [
        ...Object.keys(pack.dependencies || {}),
        ...Object.keys(pack.peerDependencies || {})
    ],

    plugins: [

        json({
            preferConst: true, // Default: false
            indent: '  ',
            compact: true, // Default: false
            namedExports: true // Default: true
        }),

        typescript({
            clean: true,
            tsconfigOverride: {
                exclude: ["src/icons", "src/figures", "src/styles", "**/test", "**/stories", "**/*.stories.tsx", "src/i18n.tsx"]
            }
        }),

        copy({
            targets: [
                { src: 'src/locales/*', dest: 'dist/locales' }
            ]
        }),

        filesize()

    ]

}, {

    input: 'src/icons/index.tsx',
    output: [{
        dir: 'dist/icons',
        format: 'esm',
        exports: 'named',
        sourcemap: true
    }],

    external: [
        ...Object.keys(pack.dependencies || {}),
        ...Object.keys(pack.peerDependencies || {})
    ],

    plugins: [

        json({
            preferConst: true, // Default: false
            indent: '  ',
            compact: true, // Default: false
            namedExports: true // Default: true
        }),

        typescript({
            clean: true,
            tsconfigOverride: {
                include: ["src/icons"],
                exclude: ["stories/**/*", "**/*.stories.tsx", "src/i18n.tsx"]
            }
        }),

        filesize()

    ]

}, {

    input: 'src/figures/index.ts',
    output: [{
        dir: 'dist/figures',
        format: 'esm',
        exports: 'named',
        sourcemap: true
    }],

    external: [
        ...Object.keys(pack.dependencies || {}),
        ...Object.keys(pack.peerDependencies || {})
    ],

    plugins: [

        json({
            preferConst: true, // Default: false
            indent: '  ',
            compact: true, // Default: false
            namedExports: true // Default: true
        }),

        typescript({
            clean: true,
            tsconfigOverride: {
                include: ["src/figures"],
                exclude: ["stories/**/*", "**/*.stories.tsx", "src/i18n.tsx"]
            }
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

    external: [
        ...Object.keys(pack.dependencies || {}),
        ...Object.keys(pack.peerDependencies || {})
    ],

    plugins: [

        copy({
            targets: [{ src: ['src/styles/**/*', '!src/styles/elegant.js'], dest: 'dist/styles' }]
        }),

        filesize()

    ]

}];