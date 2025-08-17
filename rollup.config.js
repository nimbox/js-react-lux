import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json' with { type: 'json' };


const entries = {

    'index': 'src/index.ts',
    'styles/elegant': 'src/styles/elegant.js',

    'icons': 'src/icons/components/index.ts',
    'figures': 'src/figures/index.ts',

    'modules/calendar': 'src/modules/calendar/index.ts',
    'modules/chat': 'src/modules/chat/index.ts',
    'modules/kanban': 'src/modules/kanban/index.ts'

};

const extensions = ['.js', '.ts', '.tsx', '.jsx', '.json'];
const externalIds = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)];
const external = (id) => externalIds.some(dep => id === dep || id.startsWith(dep + '/'));

export default [{

    input: entries,
    external,

    plugins: [
        nodeResolve({ extensions }),
        commonjs(),
        typescript({ tsconfig: 'tsconfig.build.json' }),
        copy({ targets: [{ src: 'src/locales/*', dest: 'dist/locales' }] }),
        filesize()
    ],

    output: [
        {
            dir: 'dist/cjs',
            format: 'cjs',
            sourcemap: true,
            entryFileNames: '[name].js',
            chunkFileNames: 'chunks/[hash].js',
            exports: 'auto'
        },
        {
            dir: 'dist/esm',
            format: 'esm',
            sourcemap: true,
            entryFileNames: '[name].js',
            chunkFileNames: 'chunks/[hash].js'
        }
    ]

}];
