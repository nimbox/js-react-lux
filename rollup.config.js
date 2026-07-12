import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json' with { type: 'json' };


const entries = {

    'index': 'src/index.ts',
    'locales/index': 'src/locales/index.ts',

    'figures': 'src/figures/index.ts',

    'modules/calendar': 'src/modules/calendar/index.ts',
    'modules/chat': 'src/modules/chat/index.ts',
    'modules/chat/kits/core': 'src/modules/chat/kits/core/index.ts',
    'modules/kanban': 'src/modules/kanban/index.ts'

};

const extensions = ['.js', '.ts', '.tsx', '.jsx', '.json'];
const externalIds = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)];
const external = (id) => externalIds.some(dep => id === dep || id.startsWith(dep + '/'));

export default [{

    input: entries,
    external,

    plugins: [
        nodeResolve({ extensions: [...extensions, '.png'] }),
        image(),
        json(),
        commonjs(),
        typescript({ tsconfig: 'tsconfig.build.json' }),
        copy({
            targets: [
                { src: 'src/styles/**/*.css', dest: 'dist/styles' },
                { src: ['src/locales/*', '!src/locales/index.ts'], dest: 'dist/locales' }
            ]
        }),
        filesize()
    ],

    output: [
        {
            dir: 'dist',
            format: 'esm',
            sourcemap: true,
            entryFileNames: '[name].js',
            chunkFileNames: 'chunks/[hash].js'
        }
    ]

}];
